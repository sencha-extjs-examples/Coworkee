// http://docs.sencha.com/extjs/latest/guides/core_concepts/data_package.html
Ext.define('App.model.Base', {
    extend: 'Ext.data.Model',
    identifier: 'uuid',

    requires: [
        'Ext.direct.RemotingProvider',
        'Ext.data.identifier.Uuid'
    ],

    fields: [
        // Calculated fields
        // https://docs.sencha.com/extjs/latest/modern/Ext.data.field.Field.html#cfg-calculate
        { name: 'url', calculate: function (data) {
            return Ext.String.format('{0:lowercase}/{1}',
                this.owner.entityName,
                data.id);
        }}
    ],

    schema: {
        // Setting the models namespace to produce proper association getter names.
        // http://docs.sencha.com/extjs/latest/modern/Ext.data.schema.Schema.html#ext-data-schema-schema_relative-naming
        namespace: 'App.model',

        proxy: {
            type: 'direct',
            api: {
                create: 'insert',
                read: 'list',
                update: 'update',
                destroy: 'remove'
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                messageProperty: 'message'
            }
        }
    },

    toUrl: function() {
        return this.get('url');
    },

    toEditUrl: function() {
        return this.toUrl() + '/edit';
    }
});
