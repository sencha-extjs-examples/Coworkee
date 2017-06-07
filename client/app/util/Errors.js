Ext.define('App.util.Errors', {
    requires: ['Ext.Toast'],

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
        },

        process: function(error, form) {
            if (!error) {
                return false;
            }

            if (Ext.isFunction(error.hasException)) {
                // The given error is an Ext.data.operation.Operation
                if (!error.hasException()) {
                    return false;
                }

                error = error.getError() || 'An unknown error has occurred';
            }

            if (Ext.isObject(error)) {
                if (error.code === -32096) {    // READONLY_SESSION
                    // The session is read-only (demo version), let's display a temporary message
                    // and return false since this exception should not be considered as an error.
                    Ext.toast(error.message, 2000);
                    return false;
                }
                if (error.code === -32001 && form) {
                    form.setErrors(this.toForm(error));
                } else {
                    Ext.Msg.alert(error.name + ' Error', error.message);
                }
            } else if (Ext.isString(error)) {
                Ext.Msg.alert('Error', error);
            }

            return true;
        }
    }
});
