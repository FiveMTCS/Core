/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

var coreLogsModulesInfos: TcsModuleInfos | null = null;

loadTcsModuleInfos(() => {
	coreLogsModulesInfos = {
		moduleType: TcsModuleTypes.CORE,
		moduleName: 'logs',
		version: '1.1.0',
	};
});
