/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

const TCS_CONFIG = {
    // Current lang the scripts should be on
    lang: 'fr-FR',

    // If set to true, debug informations are going to be printed in the console
    debugMode: true,

    // If set to true, every sql request will be printed in the console
    sqlDebug: true,

    // Maximum amount of time (in ms) a thread should take to execute in a tick
    maxExecTimePerThread: 8,

    // Should print errors in console even if debug mode isn't activated ?
    showErrorsAnyCase: true,

    // Should print warnings in console even if debug mode isn't activated ?
    showWarningsAnyCase: true,

    // Check if modules are at their latest version
    versionningCheck: true,
};

export default TCS_CONFIG;
