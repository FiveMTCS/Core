/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

var coreInventoryModulesInfos: TcsModuleInfos | null = null;

loadTcsModuleInfos(() => {
	coreInventoryModulesInfos = {
		moduleType: TcsModuleTypes.CORE,
		moduleName: 'inventory',
		version: '1.1.0',
	};
});
