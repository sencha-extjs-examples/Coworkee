Ext.define('App.view.history.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        office: {
            property: 'recipient.office_id'
        },
        organization: {
            property: 'recipient.organization_id'
        },
        recipient: {
            property: 'recipient_id'
        },
        type: {
            property: 'type'
        }
    },

    controller: 'historybrowse',
    viewModel: {
        type: 'historybrowse'
    },

    cls: 'historybrowse',
    bind: {
        store: '{history}'
    }
});
