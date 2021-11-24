import {Promise} from "bluebird";

export class LoginResponse {
    success = true;
    message = "";
}

export default async function login(username, password) {
    return new Promise((resolve, reject, onCancel) => {

        if (username === 'demo' && password === 'demo') {
            resolve(new LoginResponse());
        } else {
            reject(`Should not be called ${username} ${password}`);
        }

        onCancel(() => {
            console.log('Request is canceled');
        });
    });
}
