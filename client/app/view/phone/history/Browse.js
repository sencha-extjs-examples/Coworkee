Ext.define('App.view.phone.history.Browse', {
    extend: 'App.view.history.Browse',
    // xtype: 'historybrowse', -- set by profile

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.plugin.ListPaging'
    ],

    items: [{
        xtype: 'list',
        bind: '{history}',
        emptyText: 'No activity was found',
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
                iconCls: 'x-fa fa-trash',
                commit: 'onDeleteAction',
                undoable: true,
                text: 'Delete',
                ui: 'remove'
            }]
        }],

        itemTpl: [
            '<div class="history-visual">',
                '<span class="action action-{type} {type:actionIconCls}"></span>',
                '<div class="picture" style="background-image: url({recipient.picture})"></div>',
            '</div>',
            '<div class="item-details">',
                '<div class="item-title">{recipient.fullname}</div>',
                '<div class="item-caption">{subject}</div>',
            '</div>',
            '<div class="item-stats">',
                '<div class="date">{created:date("Y/m/d")}</div>',
                '<div class="time">{created:date("H:i")}</div>',
            '</div>'
        ]
    }]
});
