Ext.define('App.view.main.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'mainmenu',

    config: {
        selection: null
    },

    controller: 'mainmenu',

    cls: 'main-menu',
    layout: 'vbox',
    weighted: true,

    items: {
        trigger: {
            xtype: 'button',
            handler: 'onTriggerTap',
            iconCls: 'x-fa fa-bars',
            ui: 'large flat dark',
            docked: 'top'
        },
        navigator: {
            xtype: 'dataview',
            scrollable: 'y',
            store: 'Menu',
            weight: 0,
            flex: 1,
            ui: 'dark large',
            selectable: {
                deselectable: false
            },
            itemTpl: [
                '<span class="icon x-fa fa-{icon}"></span>',
                '<span class="text">{text}</span>'
            ],
            listeners: {
                childtap: 'onMenuChildTap'
            }
        },
        profile: {
            xtype: 'button',
            handler: 'onProfileTap',
            ui: 'large flat dark picture',
            iconCls: 'picture',
            textAlign: 'left',
            weight: 10,
            bind: {
                icon: '{user.picture}',
                text: '<div class="title">{user.firstname}</div>'+
                    '<div class="value">{user.username}</div>'
            }
        },
        logout: {
            xtype: 'button',
            handler: 'onLogoutTap',
            iconCls: 'x-fa fa-power-off',
            text: 'Log out',
            textAlign: 'left',
            ui: 'large flat dark',
            weight: 20
        }
    },

    updateSelection: function(value) {
        this.child('#navigator').setSelection(value);
    }
});
