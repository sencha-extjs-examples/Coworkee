Ext.define('App.view.organization.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.organizationwizard',

    stores: {
        managers: {
            type: 'filters',
            service: 'people',
            field: 'person.id',
            label: [
                'firstname',
                'lastname'
            ]
        }
    }
});
