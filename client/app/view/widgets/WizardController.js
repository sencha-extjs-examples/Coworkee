Ext.define('App.view.widgets.WizardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wizard',

    requires: [
        'Ext.History'
    ],

    getItemCount: function(tabs) {
        return tabs.getInnerItems().length;
    },

    getActiveIndex: function(tabs) {
        return tabs.getInnerItems().indexOf(tabs.getActiveItem());
    },

    advance: function(increment) {
        var me = this,
            tabs = me.lookup('tabs'),
            index = me.getActiveIndex(tabs),
            count = me.getItemCount(tabs),
            next = index + increment;

        tabs.setActiveItem(Math.max(0, Math.min(count-1, next)));
    },

    resync: function() {
        var me = this,
            vm = me.getViewModel(),
            tabs = me.lookup('tabs'),
            prev = me.lookup('prev'),
            next = me.lookup('next'),
            index = me.getActiveIndex(tabs),
            count = me.getItemCount(tabs),
            single = count < 2;

        tabs.getTabBar().setHidden(single);
        prev.setDisabled(index <= 0).setHidden(single);
        next.setDisabled(index == -1 || index >= count-1).setHidden(single);
    },

    finalize: function() {
        var view = this.getView();
        if (view.getFloated()) {
            view.close();
        } else {
            Ext.History.back();
        }
    },

    onSubmitTap: function() {
        var me = this,
            form = me.getView(),
            record = me.getViewModel().get('record');

        if (!form.validate()) {
            return;
        }

        if (!record.isDirty()) {
            me.finalize();
            return;
        }

        form.setMasked({ xtype: 'loadmask' });
        form.clearErrors();
        record.save({
            callback: function(result, operation) {
                form.setMasked(false);
                if (!App.util.Errors.process(operation, form)) {
                    me.finalize();
                }
            }
        });
    },

    onCancelTap: function() {
        this.finalize();
    },

    onPrevTap: function() {
        this.advance(-1);
    },

    onNextTap: function() {
        this.advance(1);
    },

    onScreenAdd: function() {
        this.resync();
    },

    onScreenRemove: function(tabs) {
        if (!tabs.destroying) {
            this.resync();
        }
    },

    onScreenActivate: function(tabs) {
        // This event is triggered when the view is being destroyed!
        if (!tabs.destroying) {
            this.resync();
        }
    }
});
