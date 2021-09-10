/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 0.1.0
 */

class TcsLanguageManager {
	private lang: object;

	/**
	 * Initialize the language manager
	 */
	constructor() {
		this.lang =
			JSON.parse(
				LoadResourceFile(
					GetCurrentResourceName(),
					`assets/lang/${TCS_CONFIG.lang}.json`
				)
			) || {};
	}

	/**
	 * Get the translation of the specified key
	 * @param key Translation to find
	 * @returns Translation in the specified language in the configuration
	 */
	get(key: string): string {
		//@ts-ignore
		if (!this.lang[key]) {
			TCS.error(`${key} is not defined for config ${TCS_CONFIG.lang}.`);
		}

		//@ts-ignore
		return this.lang[key] || '';
	}

	/**
	 * Get the translation of the specified key and fill it with values
	 * @param key Translation to find
	 * @param replace Map of key and their values to find and replace in the translation
	 * @returns Translation in the specified language in the configuration, filled with specified values
	 */
	getAndReplace(key: string, replace: Object): string {
		//@ts-ignore
		if (!this.lang[key]) {
			TCS.error(`${key} is not defined for config ${TCS_CONFIG.lang}.`);
		}

		//@ts-ignore
		let result = this.lang[key] || '';

		for (let objKey in replace) {
			//@ts-ignore
			const replaceTo = replace[objKey];
			result = result.replace(`{${objKey}}`, replaceTo);
		}

		return result;
	}

	/**
	 * Get the translations of the specified module and add it to the dictionnary
	 * @param module Module informations to load the lang config from
	 * @param language Name of the current language to load
	 */
	loadModuleLang(module: TcsModule, language: string = 'en-EN') {
		const id = module.getId();

		const dict = JSON.parse(
			LoadResourceFile(
				GetCurrentResourceName(),
				`src/modules/${id}/lang/${language}.json`
			)
		);

		if (!dict) {
			if (language !== 'en-EN') {
				TCS.warning(
					`${language} language file doesn't exist for module ${id}. Trying to load language 'en-EN'...`
				);
				this.loadModuleLang(module);
			} else {
				TCS.warning(
					`${language} language file doesn't exist for module ${id}.`
				);
			}
			return;
		}

		this.addConfig(dict);
	}

	/**
	 * Add translations to the current dictionnary
	 * @param langToAppend List of keys and their translation in the current configured language
	 */
	addConfig(langToAppend: Object) {
		this.lang = { ...this.lang, ...langToAppend };
	}
}
