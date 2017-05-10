Ext.define('App.view.person.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.personbrowse',

    stores: {
        people: {
            type: 'people',
            grouper: {
                groupFn: function(record) {
                    return record.get('lastname')[0];
                }
            }
        },
        offices: {
            type: 'filters',
            service: 'people',
            field: 'office_id',
            label: 'office.name'
        },
        organizations: {
            type: 'filters',
            service: 'people',
            field: 'organization_id',
            label: 'organization.name'
        }
    }
});
