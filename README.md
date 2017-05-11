# Ext JS Employee Directory
Ext JS Sample Application - Employee Directory (Coworkee)

## Getting started
### Prerequisite
- Install [Node.js](https://nodejs.org/) (^6.9.2)
- Install [Sencha Cmd](https://www.sencha.com/products/sencha-cmd) (^6.5.0)
- Download [Sencha Ext JS](https://www.sencha.com/products/extjs) (^6.5.0).  We
  recommend extracting Ext JS into a `"sencha-sdks"` folder in your home directory.

On Windows the "~" part of the path will be replaced by something like "C:\Users\Me\".

### Install the server
Install the server node.js dependencies:

    $ cd server
    $ npm install

### Build the client
Install the Ext JS framework for the application:

    $ cd client
    $ sencha app install ~/sencha-sdks

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
