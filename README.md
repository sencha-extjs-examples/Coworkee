# Ext JS Employee Directory
Ext JS Sample Application - Employee Directory (Coworkee)

## Getting started
### Prerequisite
- Install [Node.js](https://nodejs.org/) (^6.9.2)
- Install [Sencha Ext-Gen](https://docs.sencha.com/extjs/7.5.1/guides/getting_started/getting_started_with_npm.html) (npm install -g @sencha/ext-gen)

### Install the server
Install the server node.js dependencies:

    $ cd server
    $ npm install

### Build the client
Install the Ext JS framework dependencies:

    $ cd client
    $ npm install

Upgrade App [ExtMoveToLatest](https://docs.sencha.com/extjs/7.5.1/guides/using_systems/using_npm/extmovetolatest.html) 

    $ npm install -g @sencha/ext-movetolatest
    $ ext-movetolatest
    $ npm install

Development build:

    $ npm start

Production build:

    $ npm run build

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
