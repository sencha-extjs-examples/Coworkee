Ext.define('App.view.tablet.main.Main', {
    extend: 'Ext.Panel',
    // xtype: 'main', -- set by profile

    controller: 'main',

    layout: 'card',

    defaults: {
        header: {
            defaults: {
                ui: 'flat large'
            }
        }
    },

    lbar: {
        xtype: 'mainmenu',
        reference: 'mainmenu',
        ui: 'dark micro',
        zIndex: 4
    }
});
