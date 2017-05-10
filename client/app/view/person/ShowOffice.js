Ext.define('App.view.person.ShowOffice', {
    extend: 'Ext.Panel',
    xtype: 'personshowoffice',

    cls: 'person-office',
    iconCls: 'x-fa fa-globe',

    bind: {
        title:
            '<a href="#{record.office.url}">'+
                '{record.office.name}'+
            '</a>'+
            '<div class="caption">'+
                '{record.office.city}, '+
                '{record.office.country}'+
            '</div>'
    },

    header: {
        items: [{
            xtype: 'button',
            handler: 'onOfficeHeadcountTap',
            iconCls: 'x-fa fa-users',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.office.headcount}',
                tooltip: 'Show employees of the <b>{record.office.name}</b> office.'
            }
        }],
    },

    items: [{
        xtype: 'mapview',
        bind: {
            markers: '{record.office}'
        }
    }]
});
