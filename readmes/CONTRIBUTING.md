# First, read the CODE OF CONDUCT

[Code of Conduct](https://github.com/FiveMTCS/Core/blob/main/readmes/CODE-OF-CONDUCT.md).

# Contribution

Here are the contribution guidelines. Please, read it before contributing.

## Documentation

- Pull requests for docs update, if needed
- Code-level documentation expectations
  - 100% documentation coverage for pull requests
  - Update readme if needed
  - Update doc if needed

## Environment setup

TCS is using [Prettier](https://prettier.io/) to format the code. You must use our format style in your push requests.

## Compiling

You must compile your TS file with these actions before sending a pull request. The build will appear in the build folder.

```
npm run precompile
```

## Render the documentation

TCS uses [compodoc](https://compodoc.app/) to render the documentation automatically. If you need to update the documentation due to code changes, please follow these steps :

```
npm install -g @compodoc/compodoc

npm run doc
```

### Dependencies

The current project depends on :

- @citizenfx/client
- @citizenfx/server
- @types/node
- prettier
- tslint
- typescript
- fs-extra
- merge-files

Execute the following command to install them :

```
npm i
```
