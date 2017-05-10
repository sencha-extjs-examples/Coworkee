Ext.define('App.view.tablet.office.BrowseController', {
    extend: 'App.view.office.BrowseController',
    alias: 'controller.tablet-officebrowse',

    onCreate: function() {
        // The creation form can be accessed either by clicking the "create" button (dialog)
        // or via the #office/create url (page) - default config matches the "page" view.
        // Note that this dialog will be destroyed on close.
        Ext.create({
            xtype: 'officecreate',
            record: Ext.create('App.model.Office'),
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }
        }).show();
    }
});
