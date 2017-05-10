Ext.define('App.view.organization.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.organizationshow',

    stores: {
        people: {
            type: 'people',
            pageSize: 12
        },

        history: {
            type: 'actions',
            pageSize: 12
        }
    }
});
