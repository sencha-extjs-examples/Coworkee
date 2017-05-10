Ext.define('App.view.widgets.Show', {
    extend: 'Ext.Panel',

    controller: {
        type: 'wizard'
    },

    viewModel: {
        data: {
            record: null
        }
    },

    eventedConfig: {
        /**
         * Make the config trigger an event on change to allow the controller to monitor it.
         * https://www.sencha.com/blog/using-sencha-ext-config/
         */
        record: null
    },

    platformConfig: {
        phone: {
            header: {
                items: {
                    edit: {
                        xtype: 'button',
                        iconCls: 'x-fa fa-pencil',
                        handler: 'onEditTap',
                        weight: 10
                    }
                }
            }
        },

        '!phone': {
            header: {
                hidden: true
            }
        }
    },

    scrollable: {
        y: 'scroll'
    },

    weighted: true,

    defaults: {
        userCls: 'page-constrained'
    },

    items: {
        header: {
            xtype: 'showheader',
            weight: -10
        },

        content: {
            weighted: true,
            userCls: [
                'page-constrained',
                'blocks'
            ],

            defaults: {
                userCls: 'blocks-column',
                weighted: true,

                defaults: {
                    ui: 'block'
                }
            },

            items: {
                left: {
                    weighted: true
                },

                right: {
                    weighted: true,

                    items: {
                        history: {
                            xtype: 'historypanel',
                            bind: '{history}',
                            ui: 'block',
                            listeners: {
                                'childtap': 'onHistoryChildTap'
                            }
                        }
                    }
                }
            }
        }
    }
});
