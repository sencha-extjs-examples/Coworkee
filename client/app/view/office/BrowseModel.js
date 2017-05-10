Ext.define('App.view.office.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.officebrowse',

    stores: {
        offices: {
            type: 'offices',
            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
                }
            }
        },
        countries: {
            type: 'filters',
            service: 'offices',
            field: 'country',
            label: 'country'
        }
    }
});
