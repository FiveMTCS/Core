/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 0.1.0
 */

enum TcsModuleTypes {
	PEDS = 'peds',
	PLAYER = 'players',
	UI = 'ui',
	SYSTEM = 'system',
	EVENT = 'event',
	CORE = 'core',
}

exports('TcsModuleTypes', () => TcsModuleTypes);
