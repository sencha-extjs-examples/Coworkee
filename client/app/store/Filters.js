Ext.define('App.store.Filters', {
    extend: 'Ext.data.Store',
    alias: 'store.filters',

    config: {
        service: null,
        field: null,
        label: null
    },

    model: 'App.model.Filter',
    remoteFilter: false,
    remoteSort: false,
    pageSize: null,
    autoLoad: true,

    sorters: {
        property: 'label',
        direction: 'ASC'
    },

    proxy: {
        type: 'direct',
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    },

    updateService: function(service) {
        var proxy = this.getProxy(),
            api = proxy.getApi() || {};
        api.read = 'Server.' + service + '.filters';
        proxy.setApi(api);
    },

    updateField: function(field) {
        var proxy = this.getProxy(),
            params = proxy.getExtraParams();

        if (Ext.isEmpty(field)) {
            delete params.field;
        } else {
            params.field = field;
        }
    },

    updateLabel: function(label) {
        var proxy = this.getProxy(),
            params = proxy.getExtraParams();

        if (Ext.isEmpty(label)) {
            delete params.label;
        } else {
            params.label = label;
        }
    }
});
