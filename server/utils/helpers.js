"use strict";

var config = require('../utils/config');

var Helpers = {

    apiUrl: (function() {
        var direct = config.direct;
        if (direct.relativeUrl) {
            return '';
        }

        var scheme = direct.protocol;
        var port = direct.port;
        return (scheme? scheme + '://' : '//') + direct.server + (port? ':' + port : '') + '/';
    }()),

    searchableAttributes: function(model) {
        var attributes = model.attributes || [];
        var keys = Object.keys(attributes);
        var result = [];
        var key;

        for (var i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            if (attributes[key].searchable) {
                result.push(key);
            }
        }

        return result;
    },

    // [TODO] advanced search:
    // regex: /(?:(\w+):(?:"([^"]+)"|([^"\s]*)))|(?:"([^"]+)"|([^\s]+))/g

    sequelizeConcat: function(attributes, sequelize) {
        return sequelize.literal(attributes.map(function(value) {
            return sequelize.escape(sequelize.col(value))
        }).join(' || " " || '));
    },

    sequelizify: function(params, model, defaults) {
        var query = defaults || {};
        var me = this;

        if (params.id) {
            query.where = query.where || {};
            query.where.id = params.id;
        }

        if (params.filter) {
            query.where = query.where || {};
            params.filter.forEach(function(filter) {
                var prop = filter.property;
                var value = filter.value;
                var cond = null;

                if (prop === '#search') {
                     // Special case for the "#search" property
                    prop = '$or';
                    cond = me.searchableAttributes(model).map(function(attr) {
                        return { [attr]: { $like: '%' + value + '%' } };
                    });

                } else {
                    switch (filter.operator) {
                    case '<': cond = { $lt: value }; break;
                    case '<=': cond = { $lte: value }; break;
                    case '>=': cond = { $gte: value }; break;
                    case '>': cond = { $gt: value }; break;
                    case '!=': cond = { $ne: value }; break;
                    case 'in': cond = { $in: value }; break;
                    case 'notin': cond = { $notIn: value }; break;
                    case 'like': cond = { $like: value }; break;
                    //case '/=' // NOT SUPPORTED!
                    //case '=':
                    default:
                        cond = value;
                        break;
                    }

                    if (!(prop in model.attributes)) {
                        // let's try in another table:
                        // https://github.com/sequelize/sequelize/issues/3095#issuecomment-149277205
                        prop = '$' + prop + '$';
                    }
                }

                query.where[prop] = cond;
            });
        }

        if (params.sort) {
            query.order = query.order || [];
            params.sort.forEach(function(sorter) {
                var prop = sorter.property;
                query.order.push([
                    prop in model.attributes? prop : model.sequelize.col(prop),
                    sorter.direction
                ]);
            });
        }

        if (params.group) {
            query.group = params.group.property;
        }

        if (params.start) {
            query.offset = params.start;
        }

        if (params.limit) {
            query.limit = params.limit;
        }

        return query;
    },

    fetchFilters: function(params, model, defaults) {
        var field = params.field;
        if (!field) {
            throw errors.generate('Missing field argument');
        }

        var sequelize = model.sequelize;
        var column = field in model.attributes? field : sequelize.col(field);
        var label = this.sequelizeConcat([].concat(params.label || field), sequelize);
        var query = this.sequelizify(params, model, Object.assign(defaults || {}, {
            attributes: [[label, 'label'], [column, 'value']],
            group: [column],
            distinct: true,
            plain: false,
            include: [{
                all: true,
                nested: true,
                attributes: []
            }]
        }));

        return model.aggregate(model.name + '.id', 'count', query);
    },

    idsFromParams: function(params) {
        var type = typeof(params);
        if (type === 'string') {
            return [ params ];
        }

        if (type === 'object') {
            if (params.id) {
                return [ params.id ];
            } else if (Array.isArray(params)) {
                return params.map(function(param) {
                    return param.id
                });
            }
        }

        return [];
    },

    extractFields: function(inputs, names) {
        var fields = {};
        names.forEach(function(name) {
            if (inputs.hasOwnProperty(name)) {
                var value = inputs[name];
                if (value !== undefined) {
                    fields[name] = value;
                }
            }
        });
        return fields;
    }
}

module.exports = Helpers;
