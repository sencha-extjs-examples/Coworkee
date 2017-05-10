Ext.define('App.view.home.HomeEvents', {
    extend: 'Ext.Panel',
    xtype: 'homeevents',

    cls: 'home-events',

    tbar: {
        layout: {
            pack: 'center'
        },

        items: [{
            xtype: 'segmentedbutton',
            defaultUI: 'segmented flat',
            bind: '{range}',
            items: [{
                text: 'Upcoming',
                value: 'upcoming'
            }, {
                text: 'Recent',
                value: 'recent'
            }, {
                text: 'Past',
                value: 'past'
            }]
        }]
    },

    items: [{
        xtype: 'dataview',
        bind: '{events}',
        minHeight: 80,
        inline: true,
        ui: 'light',

        selectable: {
            disabled: true
        },

        itemTpl: [
            '<div class="event-header type-{type}">',
                '<div class="date">{date:date("M j")}</div>',
                '<div class="title">',
                    '<tpl switch="type">',
                    '<tpl case="birthday">Birthday',
                    '<tpl case="anniversary">Anniversary',
                    '<tpl case="started">Arrival',
                    '<tpl case="ended">Departure',
                    '</tpl>',
                '</div>',
            '</div>',
            '<div class="event-content">',
                '<div class="picture large" style="background-image:url({person.picture})"></div>',
                '<div class="details">',
                    '<div class="person-name">{person.fullname}</div>',
                    '<div class="person-title">{person.title}</div>',
                    '<div class="person-years">',
                        '<tpl switch="type">',
                        '<tpl case="birthday">{person.birthday:dateDiff(values.date, "y")} old',
                        '<tpl case="anniversary">{person.started:dateDiff(values.date, "y")} ',
                        '<tpl default>&nbsp;',
                        '</tpl>',
                    '</div>',
                '</div>',
            '</div>'
        ],

        listeners: {
            childtap: 'onEventChildTap'
        }
    }]
});
