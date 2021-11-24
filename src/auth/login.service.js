import {Promise} from "bluebird";
Promise.config({
    cancellation: true
});

export class LoginResponse {
    success = true;
    message = "";
}

export default async function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'demo' && password === 'demo') {
                resolve(new LoginResponse());
            } else {
                reject(new Error(`Should not be called ${username} ${password}`));
            }
        }, 2000);
    });
}
