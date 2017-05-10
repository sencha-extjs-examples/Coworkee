Ext.define('App.view.organization.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.organizationshow',

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            people = vm.getStore('people'),
            history = vm.getStore('history');

        if (record) {
            people.filter('organization_id', record.get('id'));
            history.filter('recipient.organization_id', record.get('id'));
        } else {
            people.removeAll();
            history.removeAll();
        }

        this.callParent(arguments);
    },

    onPeopleHeadcountTap: function() {
        this.redirectTo('people/organization/' + this.getRecord().getId())
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/organization/' + this.getRecord().getId());
    }
});
