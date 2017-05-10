Ext.define('App.view.office.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.officebrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
        vm.getStore('countries').reload();
    },

    onCreate: function() {
        this.redirectTo('office/create');
    }
});
