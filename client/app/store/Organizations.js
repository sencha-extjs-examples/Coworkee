Ext.define('App.store.Organizations', {
    extend: 'Ext.data.Store',
    alias: 'store.organizations',

    model: 'App.model.Organization',
    remoteFilter: true,
    remoteSort: true,
    sorters: 'name'
});
