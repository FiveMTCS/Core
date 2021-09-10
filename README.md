# TCS Core

![core](https://user-images.githubusercontent.com/61824574/116143458-77a0af00-a6db-11eb-816a-a155298f8dd1.jpg)

![version](https://img.shields.io/github/package-json/v/FiveMTCS/Core/master?style=flat-square) ![license](https://img.shields.io/github/license/FiveMTCS/Core?style=flat-square) ![issues](https://img.shields.io/github/issues/FiveMTCS/Core?style=flat-square) ![contributors](https://img.shields.io/github/contributors/FiveMTCS/Core) ![commit](https://img.shields.io/github/last-commit/FiveMTCS/Core)

## Presentation

TCS is an open source FiveM framework written in TypeScript.
- Download the latest version at the [releases page](https://github.com/FiveMTCS/Core/releases)
- Find out how to contribute by reading the [contributing guide](https://github.com/FiveMTCS/Core/blob/main/readmes/CONTRIBUTING.md)
- [Report issues here](https://github.com/FiveMTCS/Core/issues). Please, verify that you are using the **latest version first**
- For **any question about the core**, you can directly ask it into the [discussions](https://github.com/FiveMTCS/Core/discussions) section


____________________

## __Get started__

### 1. Install `tcs_map`
- Download the latest version of [tcs_map](https://github.com/FiveMTCS/Map/releases) (it's used to set spawn points)
- Unzip, then drag and drop it into your FiveM server resources folder

### 2. Install `tcs`
- Download the latest release of [tcs](https://github.com/FiveMTCS/Core/releases)
- Unzip, then drag and drop it into your FiveM server resources folder
- __DO NOT RENAME THIS RESOURCE__

### 3. Complete your `server.cfg`
Add `tcs_map` and `tcs` right after Fivem default resources, it should look like that:
```
## These resources will start by default.
ensure mapmanager
ensure chat
ensure spawnmanager
ensure sessionmanager
ensure basic-gamemode
ensure hardcap

# TCS
ensure tcs_map
ensure tcs
```
Et voilà, `tcs is installed, you can start using it.

____________________

## Modules shipped with `tcs`

You can learn more about the basic modules (such as the database management) [here](https://github.com/FiveMTCS/Core/blob/main/readmes/BASE_MODULES.md).

____________________

## How to develop a module
> __We are working to make you a seed module.__

You'll be able to start creating a module with a simple `npm i` very soon.
Meanwhile, you can look at the **[Demo project](https://github.com/FiveMTCS/DemoModule)**
