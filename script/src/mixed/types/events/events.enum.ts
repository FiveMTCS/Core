/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

enum TcsEventTarget {
  LOCAL = 'local',
  CLIENT = 'client',
  SERVER = 'server'
}

interface TcsEvent {
  eventType: string
  target: TcsEventTarget
  data: Object
  sender?: string
}

interface TcsClientEvent extends TcsEvent {
  targetId: Number
}

exports('TcsEventTarget', () => TcsEventTarget)
