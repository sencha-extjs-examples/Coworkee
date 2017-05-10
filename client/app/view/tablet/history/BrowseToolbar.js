Ext.define('App.view.tablet.history.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'historybrowsetoolbar', -- set by profile

    items: {
        employees: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'All Employees',
            queryMode: 'local',
            weight: 10,
            bind: {
                selection: '{filters.recipient}',
                store: '{recipients}'
            }
        },
        organizations: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'All Organizations',
            queryMode: 'local',
            weight: 11,
            bind: {
                selection: '{filters.organization}',
                store: '{organizations}'
            }
        },
        offices: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'All Offices',
            queryMode: 'local',
            weight: 12,
            bind: {
                selection: '{filters.office}',
                store: '{offices}'
            }
        },
        actions: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'All Actions',
            queryMode: 'local',
            weight: 13,
            bind: {
                selection: '{filters.type}',
                store: '{types}'
            }
        }
    }
});
