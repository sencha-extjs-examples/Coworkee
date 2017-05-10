Ext.define('App.view.organization.WizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.organizationwizard',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        this.getViewModel().getStore('managers').reload();
    }
});
