Ext.define('App.view.person.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.personwizard',

    stores: {
        offices: {
            type: 'filters',
            service: 'offices',
            field: 'office.id',
            label: 'office.name'
        },
        organizations: {
            type: 'filters',
            service: 'organizations',
            field: 'organization.id',
            label: 'organization.name'
        }
    }
});
