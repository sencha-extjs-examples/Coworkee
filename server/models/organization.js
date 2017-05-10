"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Organization", {
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
                msg: 'An organization with this name already exists.'
            },
            validate: {
                notEmpty: true
            }
        }
    },{
        classMethods: {
            associate: function(models) {
                Model.hasMany(models.Person, { as: 'members' });
                Model.belongsTo(models.Person, { as: 'manager', constraints: false });

                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    attributes: {
                        include: [[sequelize.literal('(SELECT COUNT(*) FROM People WHERE People.organization_id = Organization.id)'), 'headcount']]
                    },
                    include: [{
                        model: models.Person,
                        as: 'manager',
                        include: [{
                            model: models.Office,
                            as: 'office'
                        }]
                    }]
                });
            }
        }
    });

    return Model;
};
