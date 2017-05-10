Ext.define('App.store.Offices', {
    extend: 'Ext.data.Store',
    alias: 'store.offices',

    model: 'App.model.Office',
    remoteFilter: true,
    remoteSort: true,
    sorters: 'name'
});
