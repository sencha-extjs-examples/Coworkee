Ext.define('App.view.office.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.officeshow',

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            people = vm.getStore('people'),
            history = vm.getStore('history'),
            markers = vm.getStore('markers');

        if (record) {
            people.filter('office_id', record.get('id'));
            history.filter('recipient.office_id', record.get('id'));
            markers.loadRecords(record);
        } else {
            people.removeAll();
            history.removeAll();
            markers.removeAll();
        }

        this.callParent(arguments);
    },

    onPeopleHeadcountTap: function() {
        this.redirectTo('people/office/' + this.getRecord().getId())
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/office/' + this.getRecord().getId());
    }
});
