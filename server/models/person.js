"use strict";

var errors = require('../utils/errors.js');

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Person", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            unique: {
                msg: 'This email is already taken.'
            },
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This username is already taken.'
            },
            validate: {
                len: 6
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        skype: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        started: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        ended: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },

        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Organization, { as: 'organization' });
                Model.belongsTo(models.Office, { as: 'office' });
                Model.hasMany(models.Action, { as: 'actions' });
                Model.addScope('nested', {
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: models.Office.scope('nested'), as: 'office' },
                        { model: models.Organization.scope('nested'), as: 'organization' }
                    ]
                });
            },

            lookup: function(identifier) {
                return this.findOne({
                    where: {
                        $or: [
                            { id: identifier },
                            { username: identifier },
                            { email: identifier }
                        ]
                    }
                }).then(function(row) {
                    if (!row) {
                        throw errors.generate('Unknown person with id/username/email: ' + identifier);
                    }

                    return row;
                });
            }
        }
    });

    return Model;
};
