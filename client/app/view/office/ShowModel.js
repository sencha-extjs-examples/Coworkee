Ext.define('App.view.office.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.officeshow',

    stores: {
        markers: {},

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
