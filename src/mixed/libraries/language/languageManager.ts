/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import { error, warning } from '../logs/fivemConsole';
import * as Config from 'config/index';

export class TcsLanguageManager {
    private language: string;
    private languageConfig: object;

    /**
     * Initialize the language manager
     */
    constructor() {
        this.language = Config.Tcs.lang || 'en-EN';
        this.languageConfig =
            JSON.parse(
                LoadResourceFile(
                    GetCurrentResourceName(),
                    `lang/${this.language}.json`,
                ),
            ) || {};
    }

    /**
     * Get the translation of the specified key
     *
     * @param {string} key Translation to find
     * @returns {string} Translation in the specified language in the configuration
     */
    get = (key: string): string => {
        if (!this.languageConfig[key]) {
            error(`${key} is not defined for config ${this.language}.`);
        }

        return this.languageConfig[key] || '';
    };

    /**
     * Get the translation of the specified key and fill it with values
     *
     * @param {string} key Translation to find
     * @param {Object} replace Map of key and their values to find and replace in the translation
     * @returns {string} Translation in the specified language in the configuration, filled with specified values
     */
    getAndReplace = (key: string, replace: Object): string => {
        if (!this.languageConfig[key]) {
            error(`${key} is not defined for config ${this.language}.`);
        }

        let result = this.languageConfig[key] || '';

        for (const objKey in replace) {
            if (Object.prototype.hasOwnProperty.call(replace, objKey)) {
                const replaceTo = replace[objKey];
                result = result.replace(`{${objKey}}`, replaceTo);
            }
        }

        return result;
    };

    /**
     * Get the translations of the specified module and add it to the dictionnary
     *
     * @param {string} resourceName Resource name to load the langs from
     * @param {string} language Name of the current language to load
     */
    loadModuleLang = (
        resourceName: string = GetCurrentResourceName(),
        language = this.language,
    ) => {
        const dict = JSON.parse(
            LoadResourceFile(resourceName, `lang/${language}.json`),
        );

        if (!dict) {
            if (language !== 'en-EN') {
                warning(
                    // eslint-disable-next-line max-len
                    `${language} language file doesn't exist for module ${resourceName}. Trying to load language 'en-EN'...`,
                );
                this.loadModuleLang(resourceName, 'en-EN');
            } else {
                warning(
                    `${language} language file doesn't exist in resource ${resourceName}.`,
                );
            }
            return;
        }

        this.addConfig(dict);
    };

    /**
     * Add translations to the current dictionnary
     *
     * @param {Object} langToAppend List of keys and their translation in the current configured language
     */
    addConfig = (langToAppend: Object) => {
        this.languageConfig = { ...this.languageConfig, ...langToAppend };
    };
}

const LanguageManager = new TcsLanguageManager();
export default LanguageManager;
