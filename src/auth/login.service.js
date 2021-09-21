export class LoginResponse {
    success = true;
    message = "";
}

export default async function login(username, password) {
    throw new Error(`Should not be called`);
    // return new LoginResponse();
}
