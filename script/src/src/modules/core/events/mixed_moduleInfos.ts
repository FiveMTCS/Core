/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

var coreEventsModulesInfos: TcsModuleInfos | null = null;

loadTcsModuleInfos(() => {
	coreEventsModulesInfos = {
		moduleType: TcsModuleTypes.CORE,
		moduleName: 'events',
		version: '1.1.0',
	};
});
