Ext.define('App.store.Menu', {
    extend: 'Ext.data.Store',
    alias: 'store.menu',

    data: [{
        id: 'home',
        xtype: 'home',
        text: 'Home',
        icon: 'home'
    }, {
        id: 'people',
        xtype: 'personbrowse',
        text: 'Employees',
        icon: 'users'
    }, {
        id: 'organizations',
        xtype: 'organizationbrowse',
        text: 'Organizations',
        icon: 'sitemap'
    }, {
        id: 'offices',
        xtype: 'officebrowse',
        text: 'Offices',
        icon: 'globe'
    }, {
        id: 'history',
        xtype: 'historybrowse',
        text: 'Activity',
        icon: 'history'
    }]
});
