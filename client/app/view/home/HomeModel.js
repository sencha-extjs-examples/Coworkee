Ext.define('App.view.home.HomeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.home',

    data: {
        greeting: null,
        range: 'upcoming',
        time: null
    },

    stores: {
        history: {
            type: 'actions',
            autoLoad: true,
            pageSize: 8
        },
        events: {
            type: 'events',
            autoLoad: true,
            pageSize: 8
        }
    }
});
