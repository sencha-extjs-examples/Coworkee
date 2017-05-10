/**
 * Since all list swiping gestures of the app should provide the same user experiences, let's
 * define some common config in this override (e.g. "stepper" behavior, direction lock, etc.)
 */
Ext.define('App.override.dataview.listswiper.ListSwiper', {
    override: 'Ext.dataview.listswiper.ListSwiper',

    config: {
        directionLock: false,

        widget: {
            xtype: 'listswiperstepper',
            undo: {
                iconCls: 'x-fa fa-undo'
            }
        }
    }
});
