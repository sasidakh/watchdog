import {Observe} from "../../src/Observer";
// import {DefaultPingService} from "../../src/PingService";
@Observe({
    period: 1000
})
export class SampleObserver {
    state: number = 0;
    get ObserverId(): string {
        return "sample";
    }
    updateState() {
        this.state = 999;
    }
    constructor() {
    }
}