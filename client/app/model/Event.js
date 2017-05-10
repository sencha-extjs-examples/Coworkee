Ext.define('App.model.Event', {
    extend: 'App.model.Base',

    fields: [
        { name: 'date', type: 'date' },
        { name: 'type', type: 'string' },
        { name: 'person_id', reference: 'Person' },

        // Calculated fields
        // 'days_to_now' is used in store to locally sort and group events.
        { name: 'days_to_now', calculate: function (data) {
            return data.date? Ext.Date.diff(
                Ext.Date.clearTime(new Date()),
                Ext.Date.clearTime(data.date),
                'd') : null;
        }}
    ],

    proxy: {
        api: {
            prefix: 'Server.events'
        }
    }
});
