/**
 * http://www.jsonrpc.org/specification#error_object
 */

"use strict";

var extend = require('util')._extend;

var codes = {
    INVALID_REQUEST: -32600,
    UNAUTHORIZED: -32099,
    AUTH_TOKEN_EXPIRED: -32098,
    AUTH_TOKEN_INVALID: -32097,
    INVALID_PARAMS: -32001,
    NOT_IMPLEMENTED: -32000
};

function generate(message, error, code, data) {
    return {
        // Ext.Direct expects the error (object or string) to be store in data.message
        message: extend(extend({}, data), {
            message: message || 'Invalid Request',
            name: error || 'InvalidRequest',
            code: code == null? codes.INVALID_REQUEST : code
        })
    };
};

var types = {
    unauthorized: function(data) {
        return generate(
            'User is not authorized to perform this action',
            'Unauthorized',
            codes.UNAUTHORIZED,
            data
        );
    },

    authTokenExpired: function(data) {
        return generate(
            'Your session has expired, please login again',
            'AuthTokenExpired',
            codes.AUTH_TOKEN_EXPIRED,
            data
        );
    },

    authTokenInvalid: function(data) {
        return generate(
            'Your session is no longer valid, please login again',
            'AuthTokenInvalid',
            codes.AUTH_TOKEN_INVALID,
            data
        );
    },

    notImplemented: function(data) {
        return generate(
            'Not implemented',
            'NotImplemented',
            codes.NOT_IMPLEMENTED,
            data
        );
    },

    invalidParams: function(data) {
        if (!Array.isArray(data)) {
            data = [data];
        }

        return generate(
            'Invalid Parameters',
            'InvalidParameters',
            codes.INVALID_PARAMS,
            { errors: data }
        );
    }
};

module.exports = {
    codes: codes,

    types: types,

    generate: generate,

    parse: function(error) {
        switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            return types.invalidParams(error.errors.map(function(error) {
                return { message: error.message, path: error.path };
            }));
        default:
            return error;
        }
    },

    fromJwtError: function(data) {
        // https://github.com/auth0/node-jsonwebtoken#errors--codes
        if (data.name === 'TokenExpiredError') {
            return types.authTokenExpired(data);
        } else if (data.name === 'JsonWebTokenError') {
            return types.authTokenInvalid(data);
        } else {
            return types.unauthorized(data);
        }
    }
};
