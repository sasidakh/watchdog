import {ServiceStatus} from "./ServiceStatus";
import {PingService, DefaultPingService} from "./PingService";
import {Static} from "./Static";
import {Subject} from "./Subject";

export interface Observer {
    ObserverId: string;
    updateState: () => Promise<boolean>;
}

export interface ObserveConfig {
    period: number;
    ping?: {new(): PingService};
}

export function Observe(oc: ObserveConfig) {
    if (!Static.ping) {
        if (oc.ping) Static.ping = new oc.ping();
        else Static.ping = new DefaultPingService();
    }
    if (!Static.serviceStatus) Static.serviceStatus = new ServiceStatus(oc.period);
    if (!Static.subject) Static.subject = new Subject();
    return function <T extends {new(...args: any[]): Observer}>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                Static.subject.attach(this);
            }
        }
    }
}