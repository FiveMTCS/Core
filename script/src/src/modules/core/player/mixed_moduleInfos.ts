/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

var corePlayerModulesInfos: TcsModuleInfos | null = null;

loadTcsModuleInfos(() => {
	corePlayerModulesInfos = {
		moduleType: TcsModuleTypes.CORE,
		moduleName: 'player',
		version: '1.0.0',
	};
});
