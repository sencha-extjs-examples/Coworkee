Ext.define('App.util.Errors', {
    statics: {
        toForm: function(errors) {
            var values = {};

            if (Ext.isObject(errors)) {
                errors = errors.errors;
            };

            if (Ext.isArray(errors)) {
                errors.forEach(function(error) {
                    var name = error.id || error.field || error.path;
                    var value = error.msg || error.message;
                    if (name && value) {
                        values[name] = value;
                    }
                });
            } else {
                values = errors;
            }

            return values;
        }
    }
});
