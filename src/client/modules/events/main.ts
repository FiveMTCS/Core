/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import deathThreadChecker from './components/death';
import vehicleThreadChecker from './components/vehicle';
import weaponThreadChecker from './components/weapon';

export const init = () => {
    deathThreadChecker();
    vehicleThreadChecker();
    weaponThreadChecker();
};
