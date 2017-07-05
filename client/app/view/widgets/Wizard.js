Ext.define('App.view.widgets.Wizard', {
    extend: 'Ext.form.Panel',

    controller: {
        type: 'wizard'
    },

    viewModel: {
        data: {
            record: null
        }
    },

    config: {
        screens: [],

        toolbar: {
            xtype: 'toolbar',
            weighted: true,
            ui: 'tools',

            defaults: {
                ui: 'flat'
            },

            items: {
                prev: {
                    reference: 'prev',
                    handler: 'onPrevTap',
                    iconCls: 'x-fa fa-chevron-circle-left',
                    weight: -20
                },

                next: {
                    reference: 'next',
                    handler: 'onNextTap',
                    iconCls: 'x-fa fa-chevron-circle-right',
                    weight: -10
                }
            }
        }
    },

    platformConfig: {
        phone: {
            // In the "phone" profile, the "submit" button is located in the panel header while
            // "cancel" is the navigation "back" action added by default in phone/main/Main.js
            header: {
                items: {
                    submit: {
                        xtype: 'button',
                        handler: 'onSubmitTap',
                        iconCls: 'x-fa fa-save',
                        weight: 10
                    }
                }
            },

            toolbar: {
                docked: 'bottom',
                layout: {
                    pack: 'end'
                }
            }
        },

        '!phone': {
            header: {
                userCls: 'page-constrained',
            },

            toolbar: {
                userCls: 'page-constrained',
                docked: 'top',
                items: {
                    spacer: {
                        xtype: 'spacer',
                        weight: 10
                    },

                    submit: {
                        reference: 'submit',
                        handler: 'onSubmitTap',
                        weight: 20,
                        ui: 'action',
                        bind: {
                            text: '{record.phantom? "Create" : "Save"}'
                        }
                    },

                    cancel: {
                        reference: 'cancel',
                        handler: 'onCancelTap',
                        text: 'Cancel',
                        weight: 30,
                        ui: 'flat'
                    }
                }
            }
        }
    },

    modelValidation: true,
    layout: 'fit',
    height: 512,
    width: 512,

    bind: {
        iconCls: 'x-fa fa-{record.phantom? "plus" : "pencil"}'
    },

    items: [{
        xtype: 'tabpanel',
        reference: 'tabs',

        layout: {
            /**
             * Hidden items don't have their bindings evaluated until they become visible,
             * so we need to turn deferRender off in case hidden tabs contain fields bound
             * to the record (and thus have the form correctly validated).
             */
            deferRender: false
        },

        defaults: {
            userCls: 'wizard-screen',
            scrollable: 'y',
            padding: 15,
            tab: {
                iconAlign: 'top'
            }
        },

        tabBar: {
            defaultTabUI: 'flat',
            ui: 'flat',
            layout: {
                pack: 'center'
            }
        },

        listeners: {
            add: 'onScreenAdd',
            remove: 'onScreenRemove',
            activeitemchange: 'onScreenActivate'
        }
    }],

    initialize: function() {
        var me = this;
        me.callParent();
        me.add(me.getToolbar());
        me.lookup('tabs').add(me.getScreens());
    },

    reset: function() {
        var me = this;
        me.callParent();
        me.fireEvent('reset');
        return me;
    },

    // [WORKAROUND] Ext.form.Panel override the setRecord and updateRecord methods in a way
    // that we can't use updateRecord to be notified when the record actually changes.
    setRecord: function(record) {
        this.getViewModel().set('record', record);
    }
});
