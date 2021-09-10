(function () {
	// Waiting for TCS Core to start
	onTcsLoaded(() => {
		// Creating the module, giving its informations and the method to execute when the module will be started by the core
		const demoModule = new TcsModule(demoModuleInfos, (module: TcsModule) => {
			module.printDebug(
				'The version is automatically checked with github when the versionningCheck is set to true in the configuration file (assets/mixed_config.js)'
			);
		});

		// Adding the module to the game, it will be loaded only when its dependencies are started and when TCS will be ready to go.
		TCS.modules.addModuleToGame(demoModule);
	});
})();
