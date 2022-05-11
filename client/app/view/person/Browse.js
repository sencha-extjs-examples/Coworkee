Ext.define('App.view.person.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        office: {
            property: 'officeId'
        },
        organization: {
            property: 'organizationId'
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
