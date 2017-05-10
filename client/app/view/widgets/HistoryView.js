Ext.define('App.view.widgets.HistoryView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'historyview',

    config: {
        displayField: 'recipient.fullname'
    },

    cls: 'historyview',
    ui: 'history light',
    emptyText: 'No history',
    deferEmptyText: false,
    minHeight: 80,
    inline: true,


    updateDisplayField: function(value) {
        this.setItemTpl([
            '<div class="history-item-wrapper">',
                '<div class="history-visual">',
                    '<span class="action action-{type} {type:actionIconCls}"></span>',
                    '<div class="picture large" style="background-image: url({recipient.picture})"></div>',
                '</div>',
                '<div class="history-details">',
                    '<div class="display">{', value, '}</div>',
                    '<div class="date">{created:date(\'F j, Y\')}</div>',
                '</div>',
            '</div>'
        ]);
    },

    itemCls: 'history-item'
});
