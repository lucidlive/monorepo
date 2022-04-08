# Lucidlive MonoRepo

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

## Structure & Dependencies

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
let's say you had an app with the name "@onyx/core" which held all the core business logic to be shared across your company,
you could add the dependency like so:
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
It's important that the version numbers match.

> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
