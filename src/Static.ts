import {PingService} from "./PingService";
import {ServiceStatus} from "./ServiceStatus";
import {Subject} from "./Subject";

export class Static {
    static ping: PingService;
    static serviceStatus: ServiceStatus;
    static subject: Subject;
}