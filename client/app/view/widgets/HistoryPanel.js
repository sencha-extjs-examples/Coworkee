Ext.define('App.view.widgets.HistoryPanel', {
    extend: 'Ext.Panel',
    xtype: 'historypanel',

    config: {
        store: null
    },

    cls: 'historypanel',
    defaultBindProperty: 'store',
    referenceHolder: true,
    title: 'Recent Activity',

    header: {
        items: {
            showall: {
                xtype: 'button',
                reference: 'showallbutton',
                tooltip: 'Show all activity',
                handler: 'onHistoryAllTap',
                iconCls: 'x-fa fa-history',
                ui: 'block'
            }
        }
    },

    items: [{
        xtype: 'historyview',
        reference: 'historyview',
        displayField: 'subject',
        emptyText: 'No activity was found',
        selectable: {
            disabled: true
        }
    }],

    initialize: function() {
        var me = this;
        me.callParent(arguments);
        me.relayEvents(me.lookup('historyview'), ['childtap']);
    },

    applyStore: function(value) {
        return value? Ext.getStore(value) : null;
    },

    updateStore: function(curr, prev) {
        var listeners = {
                datachanged: 'updateButtonState',
                scope: this
            };

        if (prev && prev.isStore) {
            prev.un(listeners);
        }
        if (curr && curr.isStore) {
            curr.on(listeners);
        }

        this.lookup('historyview').setStore(curr);
        this.updateButtonState(curr);
    },

    updateButtonState: function(store) {
        this.lookup('showallbutton').setDisabled(!store || !store.getCount());
    }
});
