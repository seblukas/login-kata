export class LoginResponse {
    success = true;
    message = "";
}

export default class LoginService {
    async login(username, password) {
        throw new Error(`Should not be called`);
        // return new LoginResponse();
    }
}
