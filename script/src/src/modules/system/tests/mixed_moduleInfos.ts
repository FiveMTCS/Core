/**
 * @author Maxence Leguede
 * @version 1.0.0
 * @since 1.0.0
 */

var demoModuleInfos: TcsModuleInfos | null = null;

loadTcsModuleInfos(() => {
	demoModuleInfos = {
		moduleType: TcsModuleTypes.SYSTEM,
		moduleName: 'tests',
		version: '1.0.0',
		git: 'FiveMTCS/DemoModule',
	};
});
