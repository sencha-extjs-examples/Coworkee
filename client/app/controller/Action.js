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

    subject: function(action, record) {
        switch (action) {
        case 'phone':
            var extension = record.get('extension');
            return record.get('phone') + (extension? ':' + extension : '');
        case 'profile':
            return record.get('username');
        default:
            return record.get(action);
        }
    },

    log: function(action, record, subject) {
        Ext.create('App.model.Action', {
            type: action,
            recipient_id: record.getId(),
            subject: subject || this.subject(action, record)
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
