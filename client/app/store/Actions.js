Ext.define('App.store.Actions', {
    extend: 'Ext.data.Store',
    alias: 'store.actions',

    model: 'App.model.Action',
    remoteFilter: true,
    remoteSort: true,

    sorters: {
        property: 'created',
        direction: 'DESC'
    }
});
