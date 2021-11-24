import {createLocalVue, shallowMount} from '@vue/test-utils'
import Login from '../../src/components/Login';
import Vue from 'vue';
import {LoginResponse} from '../../src/auth/login.service';
import VueRouter from 'vue-router';
import router from '../../src/router';
import {Promise} from 'bluebird';

Promise.config({
    cancellation: true
});
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

    beforeEach(function () {
        if (router.currentRoute.path !== '/') {
            router.push({path: '/'});
        }
    });
    it('should have title.', () => {
        const wrapper = createLogin(null);

        expect(wrapper.find('h1').text()).toMatch('Login to Area52');
    });
    it('should have username input field with length 20.', () => {
        const wrapper = createLogin(null);

        let usernameInput = wrapper.find('input[name=username]');
        expect(usernameInput.isVisible()).toBeTruthy();
        expect(usernameInput.attributes().maxlength).toEqual('20');
    });
    it('should have password input field with length 20.', () => {
        const wrapper = createLogin(null);

        let passwordInput = wrapper.find('input[name=password]');
        expect(passwordInput.isVisible()).toBeTruthy();
        expect(passwordInput.attributes().maxlength).toEqual('20');
        expect(passwordInput.attributes().type).toEqual('password');
    });
    it('should have login button.', () => {
        const wrapper = createLogin(null);

        const loginButton = wrapper.find('button[name=login]');
        expect(loginButton.isVisible()).toBeTruthy();
        expect(loginButton.text()).toEqual('Login');
    });
    it('should invoke backend when login button is clicked.', async () => {
        const loginMock = jest.fn(() => new Promise(resolve => resolve(new LoginResponse())));
        const wrapper = createLogin(loginMock);

        await login(wrapper);

        expect(loginMock).toBeCalledWith('username', 'password');
        expectNoAuthError(wrapper);
    });
    it('should show error message on unsuccessful login attempt.', async () => {
        const failedLoginResponse = function () {
            return new Promise(resolve => {
                const response = new LoginResponse();
                response.success = false;
                response.message = 'Login failed';
                resolve(response);
            });
        }
        const wrapper = createLogin(failedLoginResponse);

        await login(wrapper);

        expectAuthError(wrapper);
    });
    it('should open login screen.', () => {
        const wrapper = createLogin(null);
        router.push({path: 'login'});

        expect(wrapper.vm.$router.currentRoute.name).toEqual('Login');
        expect(wrapper.vm.$router.currentRoute.path).toEqual('/login');
    });
    it('should close login screen after success login', async () => {
        const successLoginResponse = function () {
            return new Promise(resolve => {
                const response = new LoginResponse();
                response.success = true;
                resolve(response);
            });
        }
        const wrapper = createLogin(successLoginResponse);

        await login(wrapper);

        expect(wrapper.vm.$router.currentRoute.path).toEqual('/dashboard');
    });
    it('should show cancel button when performing login.', async () => {
        const successLoginResponse = function () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const response = new LoginResponse();
                    resolve(response);
                }, 0);
            })
        }
        const wrapper = createLogin(successLoginResponse);

        await login(wrapper);

        expect(wrapper.find('#cancelBtn').isVisible()).toBeTruthy();
    });
    it('should hide cancel button after failing login.', async (done) => {
        const successLoginResponse = function () {
            return new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('Failed login attempt'));
                }, 0);
            })
        }
        const wrapper = createLogin(successLoginResponse);

        await login(wrapper);

        setTimeout(() => {
            expect(wrapper.find('#cancelBtn').element).toBeFalsy();
            done();
        }, 1);
    });
    it('should cancel login when clicking on cancel button.', async (done) => {
        const successLoginResponse = function () {
            return new Promise(resolve => {
                setTimeout(() => {
                    const response = new LoginResponse();
                    response.success = true;
                    resolve(response);
                }, 0);
            });
        }
        const wrapper = createLogin(successLoginResponse);
        const redirect = jest.fn();
        wrapper.vm.redirectToDashboard = redirect;

        await login(wrapper);
        await wrapper.find('#cancelBtn').trigger('click');

        setTimeout(() => {
            expect(wrapper.vm.$data.authError).toBeFalsy();
            expect(redirect).not.toHaveBeenCalled();
            expect(wrapper.vm.$router.currentRoute.path).toEqual('/');
            done();
        }, 1);
    });
})
//TODO: 1. Wrap fields in form element. 2. Change button type to submit.
//TODO: 2. On successful login, the login component should disappear.
