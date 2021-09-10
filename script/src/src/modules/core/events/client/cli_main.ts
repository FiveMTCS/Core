/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	onTcsLoaded(() => {
		const eventsModule = new TcsModule(
			coreEventsModulesInfos,
			(module: TcsModule) => {
				module.fnc('deathThreadChecker')();
				module.fnc('vehicleThreadChecker')();
				module.fnc('weaponThreadChecker')();
			}
		);
		TCS.modules.addModuleToGame(eventsModule);
	});
})();
