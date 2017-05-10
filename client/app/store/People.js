Ext.define('App.store.People', {
    extend: 'Ext.data.Store',
    alias: 'store.people',

    model: 'App.model.Person',
    remoteFilter: true,
    remoteSort: true,
    sorters: 'lastname'
});
