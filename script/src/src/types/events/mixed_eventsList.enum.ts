/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 0.1.0
 */

enum TcsEventsList {
	PLAYER_READY = 'player_ready',
	PLAYER_LOADED = 'player_loaded',
	PLAYER_DEAD = 'player_dead',
	PLAYER_RESURRECTED = 'player_resurrected',
	PLAYER_ENTER_VEHICLE = 'player_enter_in_vehicle',
	PLAYER_LEAVE_VEHICLE = 'player_leave_vehicle',
	PLAYER_GET_WEAPON = 'player_get_weapon',
	PLAYER_LOOSE_WEAPON = 'player_loose_weapon',
	LOGS_SEND = 'logs_send',
	LISTENER_CALLBACK_CLIENT = 'listener_callback_client',
	LISTENER_CALLBACK_SERVER = 'listener_callback_server',

	CHARACTER_CREATE = 'character_create',
	CHARACTER_GET = 'character_get',
	CHARACTER_GET_SKIN = 'character_get_skin',
	CHARACTER_GET_INFOS = 'character_get_infos',
	CHARACTER_GET_ID = 'character_get_id',
}

exports('TcsEventsList', () => TcsEventsList);
