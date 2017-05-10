Ext.define('App.view.organization.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.organizationbrowse',

    stores: {
        organizations: {
            type: 'organizations',
            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
                }
            }
        },
        managers: {
            type: 'filters',
            service: 'organizations',
            field: 'manager_id',
            label: [
                'manager.firstname',
                'manager.lastname'
            ]
        }
    }
});
