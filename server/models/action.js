"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Action", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Person, { as: 'recipient', constraints: false });
                Model.belongsTo(models.Person);
                Model.addScope('nested', {
                    include: [{
                        model: models.Person,
                        as: 'recipient',
                        include: [{
                            model: models.Office,
                            as: 'office'
                        }, {
                            model: models.Organization,
                            as: 'organization'
                        }]
                    }]
                });
            }
        }
    });

    return Model;
};
