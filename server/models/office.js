"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Office", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            unique: {
                msg: 'An office with this name already exists.'
            },
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: function () {
                return JSON.parse(this.getDataValue('location'));
            },
            set: function (value) {
                return this.setDataValue('location', JSON.stringify(value));
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                 Model.hasMany(models.Person, { as: 'members' });

                 // http://stackoverflow.com/a/37817966
                 Model.addScope('nested', {
                    attributes: {
                        include: [[sequelize.literal('(SELECT COUNT(*) FROM People WHERE People.office_id = Office.id)'), 'headcount']]
                    }
                 });
            }
        }
    });

    return Model;
};
