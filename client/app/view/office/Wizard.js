Ext.define('App.view.office.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'officewizard',
        'officecreate',
        'officeedit'
    ],

    bind: {
        title: '{record.phantom? "Add" : "Edit"} Office'
    },

    screens: [{
        title: 'General',
        iconCls: 'x-fa fa-info',
        items: [{
            xtype: 'textfield',
            reference: 'name',
            label: 'Name',
            required: true,
            bind: '{record.name}'
        }, {
            xtype: 'textfield',
            reference: 'address',
            label: 'Address',
            required: true,
            bind: '{record.address}'
        }, {
            xtype: 'textfield',
            reference: 'city',
            label: 'City',
            required: true,
            bind: '{record.city}'
        }, {
            xtype: 'textfield',
            reference: 'postcode',
            label: 'ZIP/Postal',
            bind: '{record.postcode}'
        }, {
            xtype: 'textfield',
            reference: 'country',
            label: 'Country',
            required: true,
            bind: '{record.country}'
        }, {
            xtype: 'textfield',
            reference: 'region',
            label: 'Region',
            bind: '{record.region}'
        }]
    }]
});
