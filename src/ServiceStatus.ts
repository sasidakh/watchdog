import {Observer} from "./Observer";
import {PingService} from "./PingService";


export enum StateType {
    ONLINE,
    OFFLINE
}

export class ServiceStatus {
    private interval: any;
    private state: StateType;
    observers: Map<string, Observer> = new Map<string, any>();
    ping: PingService;

    attach(observer: Observer) {
        this.observers.set(observer.ObserverId, observer);
    }

    set State(state: StateType) {
        this.state = state;
        this.notify();
    }

    get State(): StateType {
        return this.state;
    }

    goOnline() {
        if (this.State !== StateType.ONLINE) {
            this.State = StateType.ONLINE;
        }
        return this;
    }

    goOffline() {
        if (this.State !== StateType.OFFLINE) {
            this.State = StateType.OFFLINE;
        }
        return this;
    }
    notify() {
        this.observers.forEach(observer => observer.updateState());
    }

    private async callback() {
        if (!this.ping) return;
        if (await this.ping.ping()) return this.goOnline();
        else return this.goOffline();
    }

    cancelInterval() {
        clearInterval(this.interval);
    }

    constructor(private period: number = 1000) {
        this.interval = setInterval(this.callback, this.period);
    }
}