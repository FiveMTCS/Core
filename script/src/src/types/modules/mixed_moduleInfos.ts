/**
 * @author Maxence Leguede
 * @version 1.0.0
 * @since 1.0.0
 */

interface TcsModuleInfos {
	moduleType: TcsModuleTypes;
	moduleName: string;
	version: string;

	git?: string;
	dependencies?: string[];
}
