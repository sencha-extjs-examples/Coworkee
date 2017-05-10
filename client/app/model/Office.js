Ext.define('App.model.Office', {
    extend: 'App.model.Base',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'postcode', type: 'string' },
        { name: 'region', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'headcount', type: 'int', persist: false },
        { name: 'location', type: 'auto', defaultValue: {
            "latitude": 37.4256448,
            "longitude": -122.1703694
        }}
    ],

    proxy: {
        api: {
            prefix: 'Server.offices'
        }
    }
});
