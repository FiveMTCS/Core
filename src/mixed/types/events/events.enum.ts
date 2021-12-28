/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

export enum TcsEventTarget {
    LOCAL = 'local',
    CLIENT = 'client',
    SERVER = 'server',
}

export interface TcsEvent {
    eventType: string;
    target: TcsEventTarget;
    data: unknown;
    sender?: string;
}

export interface TcsClientEvent extends TcsEvent {
    targetId: string;
}

globalThis.exports('TcsEventTarget', () => TcsEventTarget);
