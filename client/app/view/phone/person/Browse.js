Ext.define('App.view.phone.person.Browse', {
    extend: 'App.view.person.Browse',
    // xtype: 'personbrowse', -- set by profile

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.plugin.ListPaging'
    ],

    controller: 'phone-personbrowse',

    layout: 'fit',

    header: {
        items: {
            create: {
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                handler: 'onCreate',
                weight: 10
            }
        }
    },

    items: [{
        xtype: 'list',
        reference: 'list',
        bind: '{people}',
        striped: true,
        grouped: true,
        ui: 'listing',
        selectable: {
            disabled: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }, {
            type: 'listswiper',
            left: [{
                iconCls: 'x-fa fa-skype',
                commit: 'onSkypeAction',
                text: 'Skype',
                ui: 'skype',
                data: {
                    subject: 'skype'
                }
            }, {
                iconCls: 'x-fa fa-envelope-o',
                commit: 'onEmailAction',
                text: 'Email',
                ui: 'email',
                data: {
                    subject: 'email'
                }
            }],
            right: [{
                iconCls: 'x-fa fa-pencil',
                commit: 'onEditAction',
                text: 'Edit',
                ui: 'edit'
            }],
            widget: {
                xtype: 'personlistswiperitem'
            }
        }],
        itemConfig: {
            xtype: 'listitem',
            items: [{
                xtype: 'button',
                handler: 'onPhoneTap',
                iconCls: 'x-fa fa-phone',
                userCls: 'x-item-no-tap',
                docked: 'right',
                ui: 'flat'
            }]
        },
        itemTpl: [
            '<div class="picture" style="background-image:url({picture})"></div>',
            '<div class="item-details">',
                '<div class="item-title">{fullname}</div> ',
                '<div class="item-caption">{title}</div>',
            '</div>'
        ],
        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
