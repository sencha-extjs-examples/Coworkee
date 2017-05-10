Ext.define('App.view.phone.main.Main', {
    extend: 'Ext.Container',
    // xtype: 'main', -- set by profile

    controller: 'phone-main',

    cls: 'phone-profile',
    layout: 'card',

    items: [{
        xtype: 'panel',
        layout: 'card',
        reference: 'views',
        defaults: {
            header: {
                ui: 'dark',
                defaults: {
                    ui: 'flat dark large',
                },
                items: {
                    menu: {
                        xtype: 'button',
                        iconCls: 'x-fa fa-bars',
                        weight: -10,
                        handler: function () {
                            Ext.fireEvent('togglemainmenu');
                        }
                    }
                }
            }
        },
        lbar: {
            xtype: 'mainmenu',
            reference: 'mainmenu',
            ui: 'dark slide',
            zIndex: 4,
            items: {
                trigger: false
            }
        }
    }, {
        xtype: 'container',
        reference: 'navigation',
        layout: 'card',
        defaults: {
            header: {
                ui: 'dark',
                defaults: {
                    ui: 'flat dark large',
                },
                items: {
                    back: {
                        xtype: 'button',
                        iconCls: 'x-fa fa-chevron-left',
                        weight: -10,
                        handler: function () {
                            Ext.fireEvent('navigationback');
                        }
                    }
                }
            }
        }
    }]
});
