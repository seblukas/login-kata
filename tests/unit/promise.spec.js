import {Promise} from 'bluebird';
Promise.config({
    cancellation: true
});
describe('promise', function () {

    let promise;

    beforeEach(function () {
        promise = new Promise((resolve) => setTimeout(() => {
            resolve();
        }, 1));
    });

    it('should be cancelable.', async (done) => {
        promise.then(() => {
            expect(promise.isCancellable).toBeTruthy();
            expect(promise.isCancellable()).toBeFalsy();
            done();
        });
        expect(promise.isCancellable()).toBeTruthy();
    });

    it('should not be cancelable when cancelled.', (done) => {
        promise.then(() => {
            done.fail('Should not resolve promise')
        });
        promise.cancel();
        expect(promise.isCancelled()).toBeTruthy();
        done();
    });
});
