import {Observe} from "../../src/Observer";
@Observe()
export class SampleObserver {
    state: number = 0;
    get ObserverId(): string {
        return "sample";
    }
    async updateState() {
        this.state = 999;
        return true;
    }
    constructor() {
    }
}