Ext.define('App.store.Events', {
    extend: 'Ext.data.Store',
    alias: 'store.events',

    model: 'App.model.Event',
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});
