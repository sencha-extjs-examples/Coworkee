Ext.define('App.view.phone.person.BrowseFilters', {
    extend: 'Ext.Container',
    // xtype: 'personbrowsefilters', -- set by profile

    layout: 'vbox',

    items: [{
        xtype: 'searchfield',
        placeholder: 'Search'
    }]
});


