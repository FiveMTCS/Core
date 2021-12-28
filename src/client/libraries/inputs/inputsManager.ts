/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import { error } from 'mixed/libraries/logs/fivemConsole';
import {
    TcsControllerInputs,
    TcsKeyboardInputs,
} from 'mixed/types/game/inputsList.enum';
import { ActionInput } from './inputs';

class TcsInputManager {
    private actionInputs: Array<ActionInput>;
    private keyboardActions: Record<string, boolean>;
    private actionHandlers: Record<string, { (): void }[]>;

    /**
     * Initialize the inputs manager
     */
    constructor() {
        this.actionInputs = [];
        this.keyboardActions = {};
        this.actionHandlers = {};
    }

    /**
     * Create an action from an input
     *
     * @param {string} actionName name of the action
     * @param {string} description brief description of the action
     * @param {TcsKeyboardInputs} keyboardKey keyboard's input
     * @param {TcsControllerInputs} controllerKey controller's input
     */
    bindAction = (
        actionName: string,
        description: string,
        keyboardKey: TcsKeyboardInputs,
        controllerKey: TcsControllerInputs,
    ): void => {
        const alreadyCreated = this.actionInputs.find(
            (action) => action.actionName == actionName,
        );
        if (!alreadyCreated) {
            this.actionInputs.push({
                actionName: actionName,
                inputKeyboard: keyboardKey,
                inputController: controllerKey,
            });
            RegisterKeyMapping(
                `+${actionName}`,
                description,
                'keyboard',
                keyboardKey,
            );

            this.actionHandlers[actionName] = [];
            this.keyboardActions = {};
            RegisterCommand(
                `+${actionName}`,
                () => {
                    this.keyboardActions[actionName] = true;
                    this.actionHandlers[actionName].forEach((fnc) => fnc());
                },
                false,
            );

            RegisterCommand(
                `-${actionName}`,
                () => {
                    this.keyboardActions[actionName] = false;
                },
                false,
            );
        } else {
            error(`actionName: ${actionName} already exist !`);
        }
    };

    /**
     * Adds a function to call when the action is executed
     *
     * @param {string} actionName action's name
     * @param {Function} handler function to call when the action is call
     */
    onActionJustPressed = (actionName: string, handler: { (): void }) => {
        this.actionHandlers[actionName].push(handler);
    };

    /**
     * Returns whether a control is currently pressed
     *
     * @param {string} actionName action's name
     * @returns {boolean} Returns if the control is curently pressed
     */
    isPressed = (actionName: string) => {
        const actionData = this.actionInputs.find(
            (action) => action.actionName == actionName,
        );

        if (!actionData) return false;

        return (
            this.keyboardActions[actionName] ||
            IsControlPressed(0, actionData.inputController)
        );
    };
}

export default TcsInputManager;
