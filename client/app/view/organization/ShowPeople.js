Ext.define('App.view.organization.ShowPeople', {
    extend: 'Ext.Panel',
    xtype: 'organizationshowpeople',

    cls: 'organization-people',
    iconCls: 'x-fa fa-users',
    title: 'Employees',

    header: {
        items: [{
            xtype: 'button',
            handler: 'onPeopleHeadcountTap',
            iconCls: 'x-fa fa-users',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.headcount}',
                tooltip: 'Show employees of the <b>{record.name}</b> organization.'
            }
        }]
    },

    items: [{
        xtype: 'dataview',
        bind: '{people}',
        ui: 'thumbnails',
        minHeight: 80,
        inline: true,
        emptyText: 'This organization is empty',
        itemTpl: '<div class="thumbnail" style="background-image:url({picture})"></div>',
        listeners: {
            childtap: 'onPeopleChildTap'
        }
    }]
});
