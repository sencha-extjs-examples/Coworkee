Ext.define('App.profile.Phone', {
    extend: 'Ext.app.Profile',

    views: {
        historybrowse: 'App.view.phone.history.Browse',
        main: 'App.view.phone.main.Main',
        officebrowse: 'App.view.phone.office.Browse',
        organizationbrowse: 'App.view.phone.organization.Browse',
        personbrowse: 'App.view.phone.person.Browse',
        personbrowsefilters: 'App.view.phone.person.BrowseFilters',
        personlistswiperitem: 'App.view.phone.person.ListSwiperItem'
    },

    isActive: function () {
        return Ext.platformTags.phone;
    },

    launch: function () {
        // Add a class to the body el to identify the phone profile so we can
        // override CSS styles easily. The framework adds x-phone so we could
        // use it but this way the app controls a class that is always present
        // when this profile isActive, regardless of the actual device type.
        Ext.getBody().addCls('phone-profile');
    }
});
