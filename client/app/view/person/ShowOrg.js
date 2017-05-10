Ext.define('App.view.person.ShowOrg', {
    extend: 'Ext.Panel',
    xtype: 'personshoworg',

    cls: 'person-org',
    iconCls: 'x-fa fa-sitemap',

    bind: {
        title:
            '<a href="#{record.organization.url}">'+
                '{record.organization.name}'+
            '</a>'+
            '<div class="caption">'+
                'Managed by '+
                '<a href="#{record.organization.manager.url}">'+
                    '{record.organization.manager.fullname}'+
                '</a>'+
            '</div>'
    },

    header: {
        items: [{
            xtype: 'button',
            handler: 'onOrganizationHeadcountTap',
            iconCls: 'x-fa fa-users',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.organization.headcount}',
                tooltip: 'Show employees of the <b>{record.organization.name}</b> organization.'
            }
        }]
    },

    items: [{
        xtype: 'dataview',
        ui: 'thumbnails',
        minHeight: 80,
        inline: true,
        itemTpl: '<div class="thumbnail" style="background-image:url({picture})"></div>',
        bind: {
            emptyText: '{record.fullname} is the only employee in this organization',
            store: '{coworkers}'
        },
        listeners: {
            childtap: 'onPeopleChildTap'
        }
    }]
});
