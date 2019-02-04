import {Observer} from "./Observer";

export enum StateType {
    ONLINE,
    OFFLINE
}

export class Subject {
    private state: StateType;

    observers: Map<string, Observer> = new Map<string, any>();

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
}