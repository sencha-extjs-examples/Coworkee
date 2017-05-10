# Ext JS Employee Directory
Ext JS Sample Application - Employee Directory (Coworkee)

## Getting started
### Prerequisite
- Install [Node.js](https://nodejs.org/) (^6.9.2)
- Install [Sencha CMD](https://www.sencha.com/products/extjs/cmd-download/) (^6.5.0)
- Download [Sencha Ext JS](https://www.sencha.com/products/extjs) (^6.5.0)

### Installation
- Extract the Ext JS archive in the `client/ext` folder
- Install the server node.js dependencies:

```
> cd server
> npm install
```

### Build the client
```
> cd client
```

Development build:
```
> sencha app build --development
```

Production build:
```
> sencha app build --production
```

### Run the app
```
> cd server
> npm start
```
> Note: by default, `npm start` will use the **development** build. To run the production build, use the following command instead:

```
> npm start -- --client-environment=production
```

Open your browser on http://localhost:3000
