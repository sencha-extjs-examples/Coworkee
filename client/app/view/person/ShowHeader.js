Ext.define('App.view.person.ShowHeader', {
    extend: 'App.view.widgets.ShowHeader',
    xtype: 'personshowheader',

    mixins: [
        'Ext.mixin.Responsive'
    ],

    requires: [
        'Ext.Image'
    ],

    responsiveConfig: {
        'width < 600': {
            layout: {
                vertical: true,
                align: 'center',
                pack: 'center'
            }
        },

        'width > 599': {
            layout: {
                vertical: false,
                align: 'end',
                pack: 'start'
            }
        }
    },

    cls: [
        'show-header',
        'person-header'
    ],

    items: {
        image: {
            xtype: 'image',
            weight: -10,
            userCls: [
                'header-picture',
                'picture'
            ],
            bind: {
                src: '{record.picture}'
            }
        },

        title: {
            tpl: [
                '<div class="name">{firstname} <b>{lastname}</b></div>',
                '<div class="desc">{title}</div>'
            ]
        }
    }
});
