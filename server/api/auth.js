"use strict";

var session = require('../utils/session.js');
var errors = require('../utils/errors.js');

var Service = {
    /**
     * @param {String} params.username The user username or email.
     * @param {String} params.password The user (hashed) password.
     */
    login: function(params, callback, sid, req, res) {
        session.initiate(params.username, params.password, res).then(function(data) {
            callback(null, data);
        }).catch(function(err) {
            callback(err);
        });
    },

    logout: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            callback(null, true);
        }).catch(function(err) {
            callback(err);
        });
    },

    /**
     * Returns the currently authenticated user.
     */
    user: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            callback(null, session.user);
        }).catch(function(err) {
            callback(err);
        });
    }
};

module.exports = Service;
