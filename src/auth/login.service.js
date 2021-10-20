export class LoginResponse {
    success = true;
    message = "";
}

export default async function login(username, password) {
    throw new Error(`Should not be called ${username} ${password}`);
    // return new LoginResponse();
}
