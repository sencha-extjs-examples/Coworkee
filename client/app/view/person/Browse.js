Ext.define('App.view.person.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        office: {
            property: 'office_id'
        },
        organization: {
            property: 'organization_id'
        }
    },

    controller: 'personbrowse',
    viewModel: {
        type: 'personbrowse'
    },

    cls: 'personbrowse',
    bind: {
        store: '{people}'
    }
});
