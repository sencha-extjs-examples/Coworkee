Ext.define('App.profile.Tablet', {
    extend: 'Ext.app.Profile',

    views: {
        historybrowse: 'App.view.tablet.history.Browse',
        historybrowsetoolbar: 'App.view.tablet.history.BrowseToolbar',
        main: 'App.view.tablet.main.Main',
        officebrowse: 'App.view.tablet.office.Browse',
        officebrowsetoolbar: 'App.view.tablet.office.BrowseToolbar',
        organizationbrowse: 'App.view.tablet.organization.Browse',
        organizationbrowsetoolbar: 'App.view.tablet.organization.BrowseToolbar',
        personbrowse: 'App.view.tablet.person.Browse',
        personbrowsetoolbar: 'App.view.tablet.person.BrowseToolbar'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    },

    launch: function () {
        // Add a class to the body el to identify the phone profile so we can
        // override CSS styles easily. The framework adds x-phone so we could
        // use it but this way the app controls a class that is always present
        // when this profile isActive, regardless of the actual device type.
        Ext.getBody().addCls('tablet-profile');
    }
});
