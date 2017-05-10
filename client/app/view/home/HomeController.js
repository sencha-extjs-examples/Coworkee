Ext.define('App.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',

    control: {
        '#': {
            routechange: 'onRouteChange',
            reset: 'refresh'
        }
    },

    init: function() {
        this.callParent(arguments);
        this.update();
    },

    initViewModel: function(vm) {
        vm.bind('{range}', this.onRangeChange, this);
    },

    update: function() {
        var me = this,
            vm = me.getViewModel(),
            now = new Date(),
            hours = now.getHours();

        vm.set({
            time: now,
            greeting:
                Ext.Date.isWeekend(now)? "Enjoy your weekend" :
                hours < 13? "Good morning" :
                hours < 17? "Good afternoon" :
                "Good evening"
        });

        Ext.defer(function() {
            // The view might have been destroyed (e.g. user deauthentication)
            if (!me.destroyed) {
                me.update();
            }
        }, (60 - now.getSeconds()) * 1000);
    },

    refresh: function() {
        var vm = this.getViewModel();
        vm.getStore('history').load();
        vm.getStore('events').load();
    },

    onRangeChange: function(range) {
        var D = Ext.Date,
            store = this.getViewModel().getStore('events'),
            today = D.clearTime(new Date()),
            direction = 'DESC',
            filters = [];

        switch (range) {
        case 'upcoming':
            direction = 'ASC';
            filters.push({
                property: 'startDate',
                value: D.add(today, D.DAY, 1)
            });
            break;
        case 'past':
            filters.push({
                property: 'endDate',
                value: D.add(today, D.DAY, -7)
            });
            break;
        case 'recent':
        default:
            filters.push({
                property: 'startDate',
                value: D.add(today, D.DAY, -7)
            }, {
                property: 'endDate',
                value: D.add(today, D.DAY, 1)
            });
            break;
        }

        store.clearFilter(true);
        store.filter(filters, false, false);
        store.sort('date', direction);
    },

    onRouteChange: function(view, route) {
        var matches = (route || '').match(/(recent|upcoming|past)/g);
        if (matches) {
            this.getViewModel().set('range', matches[0]);
        }
    },

    onEventChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getPerson());
        }
    },

    onHistoryChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getRecipient());
        }
    },

    onHistoryAllTap: function() {
        this.redirectTo('history');
    }
});
