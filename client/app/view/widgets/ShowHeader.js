Ext.define('App.view.widgets.ShowHeader', {
    extend: 'Ext.Container',
    xtype: 'showheader',

    cls: 'show-header',
    weighted: true,

    layout: {
        type: 'hbox',
        align: 'end'
    },

    items: {
        title: {
            xtype: 'component',
            userCls: 'header-title',
            flex: 1,
            bind: {
                record: '{record}'
            }
        },

        edit: {
            xtype: 'button',
            iconCls: 'x-fa fa-pencil',
            handler: 'onEditTap',
            text: 'Edit',
            weight: 10,
            ui: 'flat',

            platformConfig: {
                phone: {
                    hidden: true
                }
            }
        }
    }
});
