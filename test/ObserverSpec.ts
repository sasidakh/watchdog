import {expect} from "chai";
import {SampleObserver} from "./fixture/SampleObserver";
import {Static} from "../src/Static";
describe("@Observer", () => {
    it("should update state of observer when state of subject changes", () => {
        let observer = new SampleObserver();
        let initial = observer.state;

        Static.serviceStatus.goOnline();
        let result = observer.state;
        Static.serviceStatus.goOffline();

        expect(initial).to.be.equal(0);
        expect(result).to.be.equal(999);

        Static.serviceStatus.cancelInterval();
    });

    it("should set default value of sample observer as 0", () => {
        let observer = new SampleObserver();
        expect(observer.state).to.be.equal(0);
        Static.serviceStatus.cancelInterval();
    });
});