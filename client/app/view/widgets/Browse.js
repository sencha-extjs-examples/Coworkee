Ext.define('App.view.widgets.Browse', {
    extend: 'Ext.Panel',
    xtype: 'browse',

    config: {
        route: null,
        store: null,
        fields: {
            search: {
                property: '#search',
                defaultValue: null
            }
        }
    },

    eventedConfig: {
        /**
         * Make the config trigger an event on change to allow the controller to monitor it.
         * https://www.sencha.com/blog/using-sencha-ext-config/
         */
        route: null,
        store: null
    },

    controller: 'browse',
    viewModel: {
        data: {
            filters: null
        }
    },

    layout: 'fit',

    reset: function() {
        this.fireEvent('reset');
        return this;
    }
});
