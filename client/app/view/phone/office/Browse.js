Ext.define('App.view.phone.office.Browse', {
    extend: 'App.view.office.Browse',
    // xtype: 'officebrowse', -- set by profile

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.plugin.ListPaging'
    ],

    header: {
        items: {
            create: {
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                handler: 'onCreate',
                weight: 10
            }
        }
    },

    items: [{
        xtype: 'list',
        bind: '{offices}',
        indexBar: true,
        striped: true,
        grouped: true,
        ui: 'listing',

        selectable: {
            disabled: true
        },

        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }, {
            type: 'listswiper',
            right: [{
                iconCls: 'x-fa fa-pencil',
                commit: 'onEditAction',
                text: 'Edit',
                ui: 'edit'
            }]
        }],

        itemTpl: [
            '<div class="item-details">',
                '<div class="item-title">{name}</div>',
                '<div class="item-caption">{city}, {country}</div>',
            '</div>',
            '<div class="item-stats">{headcount:plural("employee")}</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
