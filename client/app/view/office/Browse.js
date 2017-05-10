Ext.define('App.view.office.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        country: {
            property: 'country'
        }
    },

    controller: 'officebrowse',
    viewModel: {
        type: 'officebrowse'
    },

    cls: 'officebrowse',
    bind: {
        store: '{offices}'
    }
});
