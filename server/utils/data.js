"use strict";

var models = require("../models");
var sequelize = models.sequelize;
var Promise = sequelize.Promise;

function pick(items, index) {
    var count = items.length;
    if (index === undefined) {
        index = Math.floor(Math.random() * count);
    }

    return items[index % count];
}

module.exports = {
    reset: function() {
        console.info('Populating database with example data...');
        return sequelize.transaction(function(t) {
            return sequelize.sync({ force: true, transaction: t }).then(function () {
                return Promise.all([
                    models.Action.destroy({ truncate: true, transaction: t }),
                    models.Office.destroy({ truncate: true, transaction: t }),
                    models.Organization.destroy({ truncate: true, transaction: t }),
                    models.Person.destroy({ truncate: true, transaction: t })
                ]);
            }).then(function() {
                return Promise.all([
                    models.Office.bulkCreate(require('../data/Offices.json'), { transaction: t }),
                    models.Organization.bulkCreate(require('../data/Organizations.json'), { transaction: t }),
                    Promise.map(require('../data/People.json'), function(data) {
                        return models.Person.create(data, { include: [{ model: models.Action, as: 'actions' }], transaction: t });
                    })
                ])
            });
        }).then(function() {
            return sequelize.transaction(function(t) {
                return Promise.all([
                    models.Action.findAll(),
                    models.Person.findAll(),
                    models.Office.findAll(),
                    models.Organization.findAll()
                ]).spread(function(actions, persons, offices, organizations) {
                    return Promise.all([
                        // associate Person (manager) -> Organization
                        Promise.map(organizations, function(organization) {
                            return organization.setManager(pick(persons), { transaction: t });
                        }),
                        // associate Person -> Organization
                        Promise.map(persons, function(person, index) {
                            return person.setOrganization(pick(organizations), { transaction: t });
                        }),
                        // associate Person -> Office
                        Promise.map(persons, function(person, index) {
                            return person.setOffice(pick(offices), { transaction: t });
                        }),
                        // associate Action -> Person (recipient)
                        Promise.map(actions, function(action) {
                            var recipient = pick(persons);
                            action.subject = models.Action.subject(action.type, recipient);
                            return Promise.all([
                                action.setRecipient(recipient, { transaction: t }),
                                action.save({ transaction: t })
                            ]);
                        })
                    ])
                });
            });
        }).then(function() {
            console.info('Populating database: DONE');
        })
    }
};
