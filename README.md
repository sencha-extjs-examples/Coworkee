# Ext JS Employee Directory
Ext JS Sample Application - Employee Directory (Coworkee)

## Getting started
### Prerequisite
- Install [Node.js](https://nodejs.org/) (^6.9.2)
- Install [Sencha Cmd](https://www.sencha.com/products/sencha-cmd) (^6.5.1)
- Download [Sencha Ext JS](https://www.sencha.com/products/extjs) (^6.5.1).  We recommend
 extracting Ext JS into a `"sencha-sdks"` folder in your home directory.

On Windows the "~" part of the path will be replaced by something like "C:\Users\Me\".

### Install the server
Install the server node.js dependencies:

    $ cd server
    $ npm install

### Build the client
Install the Ext JS framework for the application:

    $ cd client
    $ sencha app install ~/sencha-sdks
    or
    $ sencha app upgrade ~/sencha-sdks/ext-<version of the sdk>

Note: If you use `sencha app install ~/sencha-sdks` here, the version of the SDK inside ~/sencha-sdks will
have to mach the version specified in `workspace.json`.

Development build:

    $ sencha app build --development

Production build:

    $ sencha app build --production

### Run the app

    $ cd server
    $ npm start

Note: by default, `npm start` will use the **development** build. To run the production
build, use the following command instead:

    $ npm start -- --client-environment=production

Open your browser on http://localhost:3000

#### Network access

By default, the server is setup to expose the Ext.Direct API through `localhost`. This
address can be changed via the [`direct.server`](server/config.json#L16) option (e.g.
`192.168.1.2`), in which case the client must be launched using the same address (e.g.
`https://192.168.1.2:3000`). If the client needs to be accessed with a different address,
you first need to enable CORS using [`cors.enabled: true`](server/config.json#L3).

#### Cordova / PhoneGap
If the app is ran inside
[Cordova (or PhoneGap)](https://docs.sencha.com/cmd/guides/cordova_phonegap.html), it's
required to change the following configs:

- change the Ext.Direct API endpoint in the client app ([`app.json#js`](client/app.json#L254)) by the absolute URL
- change the server IP/hostname ([`direct.server` option](server/config.json#L16)) by an accessible endpoint
- enable CORS ([`cors.enabled: true`](server/config.json#L3))
