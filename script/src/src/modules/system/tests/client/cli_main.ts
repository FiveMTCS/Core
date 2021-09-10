(function () {
	// Waiting for TCS Core to start
	onTcsLoaded(() => {
		// Creating the module, giving its informations and the method to execute when the module will be started by the core
		const demoModule = new TcsModule(demoModuleInfos, (module: TcsModule) => {
			const UI = TCS.ui;

			if (UI) {
				/*UI.showModal('Module started', 'Modal is working very well !');
				UI.showTitledNotification(
					'Welcome, notifications !',
					'TCS is now managing notifications in its UI !',
					'color-palette-outline'
				);
				UI.showNotification(
					'You can manage them as you want !',
					'color-wand-outline'
				);
				UI.showError(
					'Error demo',
					'In debug mode, errors will also be shown that way.'
				);
				UI.showWarning(
					'Warning demo',
					'In debug mode, warnings will also be shown that way.'
				);*/

				UI.openUi(module, 'test');
			}
		});

		// Adding the module to the game, it will be loaded only when its dependencies are started and when TCS will be ready to go.
		TCS.modules.addModuleToGame(demoModule);
	});
})();
