Ext.define('App.view.person.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.personshow',

    doAction: function(type) {
        this.fireEvent('actionexec', type, this.getRecord(), true);
    },

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            history = vm.getStore('history'),
            coworkers = vm.getStore('coworkers');

        history.removeAll();
        coworkers.removeAll();

        if (record) {
            history.filter('recipient_id', record.get('id'));
            history.load();

            coworkers.filter([
                { property: 'organization_id', value: record.get('organization_id') },
                { property: 'id', value: record.get('id'), operator: '!=' }
            ]);

            coworkers.load();
        }

        this.callParent(arguments);
    },

    onCallTap: function() {
        this.doAction('phone');
    },

    onSkypeTap: function() {
        this.doAction('skype');
    },

    onEmailTap: function() {
        this.doAction('email');
    },

    onLinkedInTap: function() {
        this.doAction('linkedin');
    },

    onOfficeHeadcountTap: function() {
        var office = this.getRecord().getOffice();
        this.redirectTo('people/office/' + office.getId())
    },

    onOrganizationHeadcountTap: function() {
        var organization = this.getRecord().getOrganization();
        this.redirectTo('people/organization/' + organization.getId())
    }
});
