Ext.define('App.view.widgets.Sidebar', {
    extend: 'Ext.Container',
    xtype: 'sidebar',

    config: {
        expanded: false
    },

    classCls: 'sidebar',

    initialize: function() {
        var me = this;

        me.callParent();

        me.el.insertFirst({
            cls: me.getBaseCls() + '-mask',
            tag: 'div'
        }).on({
            tap: 'onMaskTap',
            scope: me
        });
    },

    updateExpanded: function(value) {
        this.toggleCls('expanded', value);
    },

    updateMode: function(curr, prev) {
        this.replaceCls(prev, curr);
    },

    toggleExpanded: function() {
        this.setExpanded(!this.getExpanded());
    },

    onMaskTap: function(ev) {
        this.setExpanded(false);
        ev.preventDefault();
    }
});
