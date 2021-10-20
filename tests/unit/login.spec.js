import {createLocalVue, shallowMount} from '@vue/test-utils'
import Login from "../../src/components/Login";
import Vue from "vue";
import {LoginResponse} from "../../src/auth/login.service";
import VueRouter from 'vue-router';
import router from "../../src/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

function createLogin(loginMock) {
    return shallowMount(Login, {
        localVue,
        router,
        data() {
            return {
                login: loginMock
            }
        },
    });
}

async function login(wrapper, username = 'username', password = 'password') {
    const usernameInput = wrapper.find('input[name=username]');
    const passwordInput = wrapper.find('input[name=password]');
    usernameInput.setValue(username);
    passwordInput.setValue(password);

    const loginButton = wrapper.find('button[name=login]');
    loginButton.trigger('click');
    await Vue.nextTick();
    await Vue.nextTick();
}

const authErrorCssClass = '.auth-error';

function expectNoAuthError(wrapper) {
    const error = wrapper.findAll(authErrorCssClass);
    expect(error.length).toEqual(0);
}

function expectAuthError(wrapper) {
    const error = wrapper.find(authErrorCssClass);
    expect(error.text()).toEqual('Authentication failed');
}

describe('Login.vue', () => {
    it('should have title.', () => {
        const wrapper = createLogin(null);

        expect(wrapper.find('h1').text()).toMatch('Login to Area52');
    });
    it('should have username input field with length 20.', () => {
        const wrapper = createLogin(null);

        let usernameInput = wrapper.find('input[name=username]');
        expect(usernameInput.isVisible()).toBeTruthy();
        expect(usernameInput.attributes().maxlength).toEqual("20");
    });
    it('should have password input field with length 20.', () => {
        const wrapper = createLogin(null);

        let passwordInput = wrapper.find('input[name=password]');
        expect(passwordInput.isVisible()).toBeTruthy();
        expect(passwordInput.attributes().maxlength).toEqual("20");
        expect(passwordInput.attributes().type).toEqual("password");
    });
    it('should have login button.', () => {
        const wrapper = createLogin(null);

        const loginButton = wrapper.find('button[name=login]');
        expect(loginButton.isVisible()).toBeTruthy();
        expect(loginButton.text()).toEqual("Login");
    });
    it('should invoke backend when login button is clicked.', () => {
        const loginMock = jest.fn();
        const wrapper = createLogin(loginMock);

        login(wrapper);

        expect(loginMock).toBeCalledWith('username', 'password');
        expectNoAuthError(wrapper);
    });
    it('should show error message on unsuccessful login attempt.', async () => {
        const failedLoginResponse = async () => {
            const response = new LoginResponse();
            response.success = false;
            response.message = 'Login failed';
            return response;
        }
        const wrapper = createLogin(failedLoginResponse);

        await login(wrapper);

        expectAuthError(wrapper);
    });

    it('should open login screen.', () => {
        const wrapper = createLogin(null);

        expect(wrapper.vm.$router.currentRoute.name).toEqual('Login');
    });

    // sketch of possible test case
    xit('should close login screen after success login', () => {
        const successLoginResponse = async () => {
            const response = new LoginResponse();
            response.success = true;
            return response;
        }
        const closeComponent = jest.fn();
        const wrapper = createLogin(successLoginResponse, closeComponent);

        login(wrapper);

        expect(closeComponent).toHaveBeenCalled();
    });
})
//TODO: 1. Wrap fields in form element. 2. Change button type to submit.
//TODO: 2. On successful login, the login component should disappear.
