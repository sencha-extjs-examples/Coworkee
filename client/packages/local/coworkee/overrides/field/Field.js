Ext.define('App.override.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: 'This field is required',

        labelTextAlign: 'right',

        errorTip: {
            anchor: true,
            align: 'l-r?',
            ui: 'tooltip invalid'
        }
    },

    platformConfig: {
        phone: {
            errorTarget: 'under'
        }
    }
});
