Ext.define('App.view.history.BrowserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.historybrowse',

    stores: {
        history: {
            type: 'actions',
            grouper: {
                groupFn: function(record) {
                    var date = Ext.Date.clearTime(new Date(record.get('created'))),
                        today = Ext.Date.clearTime(new Date());

                    if (Ext.Date.isEqual(date, today)) {
                        return 'Today';
                    } else if (Ext.Date.isEqual(date, Ext.Date.subtract(today, Ext.Date.DAY, 1))) {
                        return 'Yesterday'
                    } else {
                        return Ext.Date.format(date, 'D, F jS, Y');
                    }
                }
            }
        },
        recipients: {
            type: 'filters',
            service: 'actions',
            field: 'recipient_id',
            label: [
                'recipient.firstname',
                'recipient.lastname'
            ]
        },
        offices: {
            type: 'filters',
            service: 'actions',
            field: 'recipient.office_id',
            label: 'recipient.office.name'
        },
        organizations: {
            type: 'filters',
            service: 'actions',
            field: 'recipient.organization_id',
            label: 'recipient.organization.name'
        },
        types: {
            type: 'filters',
            service: 'actions',
            field: 'type'
        }
    }
});
