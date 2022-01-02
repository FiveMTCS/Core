import * as Config from '@config/index';
import ConsoleColors from '../../types/consoleColors';

/**
 * Display the specified message if the server is in debug mode
 *
 * @param {string} message Message to print in the console
 */
export const debug = (message: string) => {
    if (Config.Tcs.debugMode) {
        console.log(
            `${ConsoleColors.BLUE}[debug] ${message}`,
            ConsoleColors.RESET,
        );
    }
};

/**
 * Display the specified error in the console
 *
 * @param {string} message Error to print in the console
 */
export const error = (message: string) => {
    if (Config.Tcs.showErrorsAnyCase || Config.Tcs.debugMode) {
        console.log(
            `${ConsoleColors.RED}[ERROR] ${message}`,
            ConsoleColors.RESET,
        );
    }
};

/**
 * Display the specified warning in the console
 *
 * @param {string} message Warning to print in the console
 */
export const warning = (message: string) => {
    if (Config.Tcs.showWarningsAnyCase || Config.Tcs.debugMode) {
        console.log(
            `${ConsoleColors.YELLOW}[WARNING] ${message}`,
            ConsoleColors.RESET,
        );
    }
};

/**
 * Display the specified confirmation in the console
 *
 * @param {string} message Confirmation to print in the console
 */
export const confirm = (message: string) => {
    if (Config.Tcs.debugMode) {
        console.log(`${ConsoleColors.GREEN} ${message}`, ConsoleColors.RESET);
    }
};
