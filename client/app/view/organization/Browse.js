Ext.define('App.view.organization.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        manager: {
            property: 'manager_id'
        }
    },

    controller: 'organizationbrowse',
    viewModel: {
        type: 'organizationbrowse'
    },

    cls: 'organizationbrowse',
    bind: {
        store: '{organizations}'
    }
});
