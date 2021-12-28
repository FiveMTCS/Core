/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

export interface TcsInput {
    inputName: string;
    inputKey: string | number;
}

export interface ActionInput {
    actionName: string;
    inputKeyboard: string;
    inputController: number;
}
