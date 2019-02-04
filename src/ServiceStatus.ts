import {Subject} from "./Subject";
import {Observer} from "./Observer";
import {PingService} from "./PingService";

export class ServiceStatus {
    private interval: any;
    private subject = new Subject();
    ping: PingService;

    get Subject(): Subject {
        return this.subject;
    }
    
    private async callback() {
        if (!this.ping) return;
        if (await this.ping.ping()) return this.subject.goOnline();
        else return this.subject.goOffline();
    }

    cancelInterval() {
        clearInterval(this.interval);
    }

    attach(observer: Observer) {
        this.subject.observers.set(observer.ObserverId, observer);
    }

    constructor(private period: number) {
        this.interval = setInterval(this.callback, this.period);
    }
}