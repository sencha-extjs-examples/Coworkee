/**
 * This global controller is responsible for executing actions for a specific Person record,
 * such as opening Skype or the email application, but also for logging these actions to the
 * server. View controllers can interact with this controller by firing the 'actionlog' or
 * 'actionexec' event, for example:
 *
 *      this.fireEvent('actionlog', 'profile', record)
 *      this.fireEvent('actionexec', 'skype', record)
 */
Ext.define('App.controller.Action', {
    extend: 'Ext.app.Controller',

    listen: {
        controller: {
            '*': {
                actionlog: 'log',
                actionexec: 'exec'
            }
        }
    },

    log: function(action, record) {
        Ext.create('App.model.Action', {
            type: action,
            recipient_id: record.getId()
        }).save();
    },

    exec: function(action, record) {
        if (!record) {
            return false;
        }

        switch (action) {
        case 'email':
            record.mailTo();
            break;
        case 'linkedin':
            record.linkedIn();
            break;
        case 'phone':
            record.phoneCall();
            break;
        case 'skype':
            record.skypeCall();
            break;
        default:
            Ext.error('Unknown action: ' + action);
            return false;
        }

        this.log(action, record);
        return true;
    }
});
