Ext.define('App.view.phone.person.ListSwiperItem', {
    extend: 'Ext.dataview.listswiper.Stepper',
    // xtype: 'personlistswiperitem', -- set by profile

    tpl: [
        '<div class="x-text">',
            '<tpl if="text">',
                '<span class="label">{text}</span>',
            '</tpl>',
            '<tpl if="subject">',
                '<span class="subject">{[values[values.subject]]}</span>',
            '</tpl>',
        '</div>'
    ]
});
