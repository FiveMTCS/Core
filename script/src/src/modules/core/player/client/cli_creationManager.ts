(() => {
	const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
	let camera: number;

	let currentPage: number = 1;

	const dict = 'mp_clothing@female@shirt';
	const anim = 'try_shirt_positive_a';

	const hideAllPlayers = (hide: boolean) => {
		const players = GetActivePlayers() as number[];

		players.forEach((player) => {
			SetPlayerInvisibleLocally(player, hide);

			if (hide) SetEntityLocallyInvisible(GetPlayerPed(player));
		});
	};

	const placeIdle = async () => {
		SetEntityCoords(
			PlayerPedId(),
			-312.0,
			-2395.0,
			75.0,
			true,
			false,
			false,
			false
		);

		camera = createCamera();
		SetCamCoord(camera, -312.0, -2395.0, 75.0);
		PointCamAtCoord(camera, -357.0, -2364.0, 40.0);

		FreezeEntityPosition(PlayerPedId(), true);
		while (currentPage === 2) {
			hideAllPlayers(true);
			SetEntityVisible(PlayerPedId(), false, false);
		}
		hideAllPlayers(false);
	};

	const placeCreation = async () => {
		const coords = CHARACTER_CREATION_CONFIG.coordinates.creation;
		SetEntityCoords(
			PlayerPedId(),
			coords[0],
			coords[1],
			coords[2],
			true,
			false,
			false,
			false
		);

		SetEntityHeading(PlayerPedId(), CHARACTER_CREATION_CONFIG.defaultHeading);
		setCameraPosition(CHARACTER_CREATION_CONFIG.creationCamera.body);
		FreezeEntityPosition(PlayerPedId(), true);

		RequestAnimDict(dict);
		while (!HasAnimDictLoaded(dict)) {
			await Delay(1);
		}

		while (currentPage === 2) {
			await Delay(0);
			const ped = PlayerPedId();
			NetworkSetEntityInvisibleToNetwork(ped, true);
			SetEntityLocallyVisible(ped);
			TaskPlayAnim(ped, dict, anim, 9.0, -9.0, -1, 50, 0, false, false, false);
		}
		SetEntityVisible(PlayerPedId(), true, false);
	};

	const createCamera = () => {
		const cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true);

		const [x, y, z] = GetFinalRenderedCamCoord();
		SetCamCoord(cam, x, y, z);
		SetCamActive(cam, true);
		RenderScriptCams(true, false, 0, true, true);

		return cam;
	};

	const removeCamera = (cam: number) => {
		RenderScriptCams(false, false, 0, true, false);
		DestroyCam(cam, false);
	};

	const setCameraPosition = (configuration: {
		offset: number[];
		point: number[];
	}) => {
		const [offsetX, offsetY, offsetZ] = GetOffsetFromEntityInWorldCoords(
			PlayerPedId(),
			configuration.offset[0],
			configuration.offset[1],
			configuration.offset[2]
		);
		SetCamCoord(camera, offsetX, offsetY, offsetZ);

		const [pointOffsetX, pointOffsetY, pointOffsetZ] =
			GetOffsetFromEntityInWorldCoords(
				PlayerPedId(),
				configuration.point[0],
				configuration.point[1],
				configuration.point[2]
			);
		PointCamAtCoord(camera, pointOffsetX, pointOffsetY, pointOffsetZ);
	};

	const rotateCharacter = (side: number) => {
		const newHeading =
			GetEntityHeading(PlayerPedId()) - Math.pow(-1, side) * 5.0;
		SetEntityHeading(PlayerPedId(), newHeading);
	};

	onLoadModule('core/player', (module: TcsModule) => {
		RegisterNuiCallbackType('characters:getList');
		RegisterNuiCallbackType('characters:set');
		RegisterNuiCallbackType('characters:changeCamera');
		RegisterNuiCallbackType('characters:rotateCamera');
		RegisterNuiCallbackType('characters:finishCreation');
		RegisterNuiCallbackType('characters:selectedCharacter');
		RegisterNuiCallbackType('core:onPageChange');
		on(
			'__cfx_nui:characters:getList',
			(data: object, cb: (json: string) => void) => {
				cb(JSON.stringify(module.fnc('getCharacters')()));
			}
		);
		on(
			'__cfx_nui:characters:selectedCharacter',
			(character: IExportedCharacter, cb: (json: string) => void) => {
				const newCharacter = new TcsCharacterClient(character);
				module.fnc('applySkin')(newCharacter);
				currentPage = 0;
				removeCamera(camera);
				FreezeEntityPosition(PlayerPedId(), false);
				NetworkSetEntityInvisibleToNetwork(PlayerPedId(), false);

				SetNuiFocus(false, false);
				SendNuiMessage(
					JSON.stringify({
						action: 'HIDE_INTERFACE',
					})
				);
				SetEntityCoords(
					PlayerPedId(),
					character.coords[0],
					character.coords[1],
					character.coords[2],
					true,
					false,
					false,
					false
				);
			}
		);

		on(
			'__cfx_nui:core:onPageChange',
			({ page }: { page: number }, cb: (json: string) => void) => {
				currentPage = page;
				if (page === 1) {
					//CHARACTERS_SELECTION
					placeIdle();
				}

				if (page === 2) {
					//CHARACTERS_CREATION
					placeCreation();
				}
			}
		);

		on(
			'__cfx_nui:characters:set',
			(character: IExportedCharacter, cb: (json: string) => void) => {
				const newCharacter = new TcsCharacterClient(character);
				module.fnc('applySkin')(newCharacter);
			}
		);

		on(
			'__cfx_nui:characters:changeCamera',
			(cameraId: string, cb: (json: string) => void) => {
				setCameraPosition(
					CHARACTER_CREATION_CONFIG.creationCamera[
						cameraId as keyof typeof CHARACTER_CREATION_CONFIG.creationCamera
					]
				);
			}
		);

		on(
			'__cfx_nui:characters:rotateCamera',
			(multiplier: number, cb: (json: string) => void) => {
				rotateCharacter(multiplier);
			}
		);

		on(
			'__cfx_nui:characters:finishCreation',
			async (character: IExportedCharacter, cb: (json: string) => void) => {
				character.mugshot = await module.fnc('getPedMushot')(PlayerPedId());
				character.coords = CHARACTER_CREATION_CONFIG.shouldTeleport
					? CHARACTER_CREATION_CONFIG.teleportCoords
					: GetEntityCoords(PlayerPedId(), true);

				const event: TcsEvent = {
					target: TcsEventTarget.SERVER,
					eventType: TcsEventsList.CHARACTER_CREATE,
					data: {
						newCharacter: character,
					},
				};

				TCS.eventManager.sendEvent(event);

				currentPage = 0;
				removeCamera(camera);
				FreezeEntityPosition(PlayerPedId(), false);
				NetworkSetEntityInvisibleToNetwork(PlayerPedId(), false);

				SetNuiFocus(false, false);
				SendNuiMessage(
					JSON.stringify({
						action: 'HIDE_INTERFACE',
					})
				);

				if (CHARACTER_CREATION_CONFIG.shouldTeleport)
					SetEntityCoords(
						PlayerPedId(),
						CHARACTER_CREATION_CONFIG.teleportCoords[0],
						CHARACTER_CREATION_CONFIG.teleportCoords[1],
						CHARACTER_CREATION_CONFIG.teleportCoords[2],
						true,
						false,
						false,
						false
					);
			}
		);
	});
})();
