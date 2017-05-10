Ext.define('App.view.phone.person.BrowseController', {
    extend: 'App.view.person.BrowseController',
    alias: 'controller.phone-personbrowse',

    onPhoneTap: function(button, event) {
        var list = this.lookup('list'),
            record = list.mapToRecord(event);

        this.doAction('phone', record);
    },

    onSkypeAction: function(list, data) {
        this.doAction('skype', data.record);
    },

    onEmailAction: function(list, data) {
        this.doAction('email', data.record);
    },

    doAction: function(type, record) {
        this.fireEvent('actionexec', type, record);
    }
});
