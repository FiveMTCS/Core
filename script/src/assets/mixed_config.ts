/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

var TCS_CONFIG = {
	lang: 'fr-FR', // Current lang the scripts should be on

	debugMode: true, // If set to true, debug informations are going to be printed in the console

	sqlDebug: true, // If set to true, every sql request will be printed in the console

	maxExecTimePerThread: 8, // Maximum amount of time (in ms) a thread should take to execute in a tick

	showErrorsAnyCase: true, // Should print errors in console even if debug mode isn't activated ?

	showWarningsAnyCase: true, // Should print warnings in console even if debug mode isn't activated ?

	versionningCheck: true, // Check if modules are at their latest version
};
