Ext.define('App.view.person.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.personbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
        vm.getStore('offices').reload();
        vm.getStore('organizations').reload();
    },

    onCreate: function() {
        this.redirectTo('person/create');
    }
});
