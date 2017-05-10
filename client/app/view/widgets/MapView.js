Ext.define('App.view.widgets.MapView', {
    extend: 'Ext.ux.google.Map',
    xtype: 'mapview',

    cls: 'mapview',

    markerTemplate: {
        title: '{name}',
        animation: 'DROP',
        position: {
            lat: '{location.latitude}',
            lng: '{location.longitude}'
        }
    },

    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    mapOptions: {
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        scrollwheel: false,
        zoom: 8,

        styles: [{
            featureType: "all",
            elementType: "all",
            stylers: [
                { visibility: "simplified" }
            ]
        }, {
            featureType: "administrative",
            elementType: "all",
            stylers: [
                { visibility: "on"},
                { lightness: 33 }
            ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [
                { color: "#eaeaea" }
            ]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
                { color: "#c5dac6" }
            ]
        }, {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { hue: "#bbc0c4" },
                { saturation: -93 },
                { lightness: 20 }
            ]
        }, {
            featureType: "water",
            elementType: "all",
            stylers: [
                { visibility: "on" },
                { color: "#acbcc9" }
            ]
        }]
    },

    updateMarkers: function(current, previous) {
        var me = this,
            listeners = {
                refresh: 'onStoreRefresh',
                scope: me
            };

        me.callParent(arguments);

        if (previous) {
            previous.un(listeners);
        }

        if (current) {
            current.on(listeners);
            me.onStoreRefresh(current);
        }
    },

    onStoreRefresh: function(store) {
        var records = store.getRange();
        if (records.length === 1) {
            this.setMapCenter(records[0]);
        } else {
            this.fitMarkersInView(records);
        }
    }
});
