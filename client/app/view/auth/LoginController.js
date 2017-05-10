Ext.define('App.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authlogin',

    init: function() {
        this.callParent(arguments);
        this.lookup('form').setValues({
            username: 'norma.flores',
            password: 'wvyrEDvxI'
        });
    },

    onLoginTap: function() {
        var me = this,
            form = me.lookup('form'),
            values = form.getValues();

        form.clearErrors();

        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        App.model.Session.login(values.username, values.password)
            .then(function(session) {
                me.fireEvent('login', session);
            })
            .catch(function(errors) {
                form.setErrors(App.util.Errors.toForm(errors));
            })
            .then(function(session) {
                Ext.Viewport.setMasked(false);
            });
    }
});
