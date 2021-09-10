/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	onLoadModule('core/events', (module: TcsModule) => {
		module.createFunction('vehicleThreadChecker', () => {
			let isInVehicle = false;
			TCS.threads.createThread(module, 250, () => {
				let player = PlayerPedId();

				if (!isInVehicle) {
					if (IsPedInAnyVehicle(player, false)) {
						isInVehicle = true;

						const vehicleId = GetVehiclePedIsIn(player, false);
						const vehicleModel = GetEntityModel(vehicleId);

						const enterVehicleEvent: TcsEvent = {
							eventType: TcsEventsList.PLAYER_ENTER_VEHICLE,
							target: TcsEventTarget.LOCAL,
							data: {
								vehicleId: vehicleId,
								vehicleModel: vehicleModel,
							},
						};
						TCS.eventManager.sendEvent(enterVehicleEvent);
					}
				} else {
					if (isInVehicle) {
						if (!IsPedInAnyVehicle(player, false)) {
							isInVehicle = false;

							const vehicleId = GetVehiclePedIsIn(player, false);
							const vehicleModel = GetEntityModel(vehicleId);

							const leaveVehicleEvent: TcsEvent = {
								eventType: TcsEventsList.PLAYER_LEAVE_VEHICLE,
								target: TcsEventTarget.LOCAL,
								data: {
									vehicleId: vehicleId,
									vehicleModel: vehicleModel,
								},
							};
							TCS.eventManager.sendEvent(leaveVehicleEvent);
						}
					}
				}
			});
		});
	});
})();
