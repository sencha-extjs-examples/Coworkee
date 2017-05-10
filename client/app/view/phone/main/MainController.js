Ext.define('App.view.phone.main.MainController', {
    extend: 'App.view.main.MainController',
    alias: 'controller.phone-main',

    getContainerForViewId: function(id) {
        var regex = /^(person|office|organization)(create|edit|show)$/;
        return this.lookup(id.match(regex)? 'navigation' : 'views');
    }
});
