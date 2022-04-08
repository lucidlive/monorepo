# Onyx MonoRepo

This is a custom setup for managing and deploying multiple packages in a single repo.

## Installation
This setup uses [Lerna](https://lerna.js.org) to manage the different workspaces.

> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm

Run the following commands to setup:
```
yarn install
yarn lerna bootstrap
```

The last command will boostrap all apps to the root node_modules for sharing of dependencies.

Next, open the package.json in the root folder give it name similar to the following syntax:
```
{
  "name": "@onyx/root",
  ...
}
```

## Create a New App

All packages must exist under the "packages" folder. To create a new app, simply initialize it within this folder.
For example, to create a new React app:
```
cd packages
npx create-react-app my_new_app --template typescript
```

Once the app is created, edit the package.json and give it a name similar to the following format:
```
{
  "name": "@onyx/my_new_app",
  "private": true,
  "version": "0.1.0"
  ...
}
```

For this app to be able to access another repository, you must add the other repository as a dependency. For example,
let's say you had an app with the name "@onyx/core" (and located in the packages/core folder) which held all the core
business logic to be shared across your company, you could add the dependency like so:
```
{
  ...
  "dependencies": {
    "@onyx/core": "0.1.0",
    ...
  }
  ...
}
```

It's important that you're adding the version number that is declared in the dependency's package.json.

## Installing Craco

To make Create React App work properly, we will need to add Craco (Create React App Configuration Override).

> Get all the benefits of create-react-app and customization without using 'eject' by adding a single configuration (e.g. craco.config.js) file at the root of your application and customize your eslint, babel, postcss configurations and many more.

From the root folder, run the following command:
```
yarn add -W craco
```

For every CRA app, you will need to add a craco.config.js file in the project root folder with the following contents:

```
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "../core")); // Change "core" as needed

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      return webpackConfig;
    },
  },
};
```

Next, in your apps package.json, you will need to replace all "react-scripts" commands with "craco" like so:
```
"scripts": {
  "start": "node server.js",
  "dev": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "craco eject"
}
```

Notice that the start command is using a custom server.js file. This is needed because Heroku's CRA buildpack has configuration issues
that make it fairly incompatible with Craco. Your server.js file could look something as simple as:

```
const express = require('express');

const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
```

## Deploying to Heroku

When deploying an app to Heroku, add the following Buildpack:

> https://github.com/heroku/heroku-buildpack-nodejs#latest

...and the following environment variables:

```
APP_BASE=relative/path/to/app
JS_RUNTIME_TARGET_BUNDLE=/app/absolute/path/to/build/static/js/*.js
NODE_ENV=production
PACKAGE_NAME=name-of-your-app
YARN_PRODUCTION=false
```

APP_BASE is the relative path to your app.
JS_RUNTIME_TARGET_BUNDLE is the absolute path to your static builder folder.
PACKAGE_NAME is the declared name of the app.
YARN_PRODUCTION must be false otherwise Lerna will fail during build time.

Next, you must include a Procfile in the root on your repository with the following contents:
```
web: yarn start
```

Finally, in the root of your project, you can add your custom scripts:
```
"scripts": {
  "start": "lerna exec --scope @onyx/my_new_app -- yarn start",
  "build": "lerna exec --scope @onyx/my_new_app -- yarn build"
},
```

Note: Heroku automatically executes the build command when it's present.

## TODO

Add multi-proc file support and a multi-proc file buildpack.

## Example Commands

### `yarn dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn start`

Laucnhes the node server (for production deployements).

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
