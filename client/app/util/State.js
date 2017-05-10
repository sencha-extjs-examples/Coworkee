Ext.define('App.util.State', {

    singleton: true,

    requires: [
        'Ext.util.LocalStorage'
    ],

    store: new Ext.util.LocalStorage({
        id: 'app-state'
    }),

    get: function(key, defaultValue) {
        var value = this.store.getItem(key);
        return value === undefined? defaultValue : Ext.decode(value);
    },

    set: function(key, value) {
        if (value == null) {    // !== undefined && !== null
            this.store.removeItem(key);
        } else {
            this.store.setItem(key, Ext.encode(value));
        }
    },

    clear: function(key) {
        this.set(key, null);
    }
});
