
interface Event<T> {
  key: string,
  data: T
}

export type NouvelleCommande = { commandeId: number };
export type CommandePrete = { tableId: number, commandeId: number };

type Listener<T> = (data: T) => void;

export class EventManager {
  static instance: EventManager;

  private constructor() {
  }

  static getInstance() {
    if (!EventManager.instance)
      EventManager.instance = new EventManager();

    return EventManager.instance;
  }

  listeners: { [key: string]: Array<Listener<any>> } = {};

  subscribe = <T>(key: string, listener: Listener<T>) => {
    if (this.listeners[key])
      this.listeners[key].push(listener);
    else
      this.listeners[key] = [listener];
  };

  broadcast = <T>(event: Event<T>) => {
    this.listeners[event.key] &&
    this.listeners[event.key].forEach((listener: Listener<any>) =>
      listener(event.data)
    );
  };

}

export default EventManager.getInstance();