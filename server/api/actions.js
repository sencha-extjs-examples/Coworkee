"use strict";

const crypto = require('crypto');
var helpers = require('../utils/helpers.js');
var session = require('../utils/session.js');
var errors = require('../utils/errors.js');
var models = require('../models');
const { sequelize } = require('../models');

var Service = {
    list: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            return models.Action.scope('nested').findAndCountAll(
                helpers.sequelizify(params, models.Action, {
                    where: { person_id: session.user.get('id') }
                }));
        }).then(function(results) {
            callback(null, {
                total: results.count,
                data: results.rows
            });
        }).catch(function(err) {
            callback(err);
        });
    },

    insert: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            return models.Person.lookup(params.recipient_id).then(async function(person) {
                var subject = models.Action.subject(params.type, person);
                if (subject === null) {
                    throw errors.types.invalidParams({
                        path: 'type', message: 'Invalid action type'
                    });
                }
                const uid = crypto.randomUUID();
                const d = new Date();
                const year = d.getFullYear();
                const month = d.getMonth();
                const day = d.getDay();
                const hour = d.getHours();
                const minutes = d.getMinutes();
                const seconds = d.getSeconds();

                const mysqlDate = `${year}-${month < 9 ? `0${month}` : month}-${day < 9 ? `0${day}` : day} ${hour}:${minutes}:${seconds}.000 +00:00`;

                const query = `INSERT INTO actions (
                "id",
                "type",
                "subject",
                "created",
                "updated",
                "recipient_id",
                "person_id") VALUES (
                "${uid}",
                "${params.type}",
                "${subject}",
                "${mysqlDate}",
                "${mysqlDate}",
                "${params.recipient_id}",
                "${session.user.id}");`;

                try {
                    await sequelize.query(query);
                    return {
                        id: uid,
                        type: params.type,
                        subject: subject,
                        person_id: session.user.id,
                        recipient_id: params.recipient_id,
                        updated: mysqlDate,
                        created: mysqlDate
                    };
                } catch (error) {
                    throw new Error(error)
                }

            });
        }).then(function(row) {
            callback(null, {
                data: row
            });
        }).catch(function(err) {
            callback(err);
        });
    },

    update: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            // NOTE(SB): the direct proxy requires methods for all CRUD actions
            throw errors.types.notImplemented();
        }).catch(function(err) {
            callback(err);
        });
    },

    remove: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            var ids = helpers.idsFromParams(params);
            if (ids.length === 0) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Missing required parameter: id',
                });
            }

            return models.Action.destroy({
                where: {
                    id: { $in: ids }
                }
            });
        }).then(function() {
            callback(null);
        }).catch(function(err) {
            callback(err);
        });
    },

    filters: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            return helpers.fetchFilters(params, models.Action, {
                where: { person_id: session.user.get('id') }
            });
        }).then(function(results) {
            callback(null, {
                data: results
            });
        }).catch(function(err) {
            callback(err);
        });
    }
}

module.exports = Service;
