Ext.define('App.view.office.ShowPeople', {
    extend: 'Ext.Panel',
    xtype: 'officeshowpeople',

    cls: 'office-people',
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
                tooltip: 'Show employees of the <b>{record.name}</b> office.'
            }
        }]
    },

    items: [{
        xtype: 'dataview',
        bind: '{people}',
        ui: 'thumbnails',
        minHeight: 80,
        inline: true,
        emptyText: 'This office is empty',
        itemTpl: '<div class="thumbnail" style="background-image:url({picture})"></div>',
        listeners: {
            childtap: 'onPeopleChildTap'
        }
    }]
});
