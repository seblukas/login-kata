import {shallowMount} from '@vue/test-utils'
import Login from "../../src/components/Login";
import Vue from "vue";
import {LoginResponse} from "../../src/auth/login.service";

describe('Login.vue', () => {
    it('should have title.', () => {
        const wrapper = shallowMount(Login, {});

        expect(wrapper.find('h1').text()).toMatch('Login to Area52');
    });
    it('should have username input field with length 20.', () => {
        const wrapper = shallowMount(Login, {});

        let usernameInput = wrapper.find('input[name=username]');
        expect(usernameInput.isVisible()).toBeTruthy();
        expect(usernameInput.attributes().maxlength).toEqual("20");
    });
    it('should have password input field with length 20.', () => {
        const wrapper = shallowMount(Login, {});

        let passwordInput = wrapper.find('input[name=password]');
        expect(passwordInput.isVisible()).toBeTruthy();
        expect(passwordInput.attributes().maxlength).toEqual("20");
        expect(passwordInput.attributes().type).toEqual("password");
    });
    it('should have login button.', () => {
        const wrapper = shallowMount(Login, {});

        const loginButton = wrapper.find('button[name=login]');
        expect(loginButton.isVisible()).toBeTruthy();
        expect(loginButton.text()).toEqual("Login");
    });
    it('should invoke backend when login button is clicked.', () => {
        const loginMock = jest.fn();
        const wrapper = shallowMount(Login, {
            data() {
                return {
                    login: loginMock
                }
            }
        });
        const usernameInput = wrapper.find('input[name=username]');
        const passwordInput = wrapper.find('input[name=password]');
        usernameInput.setValue('username');
        passwordInput.setValue('password');

        const loginButton = wrapper.find('button[name=login]');
        loginButton.trigger('click');

        expect(loginMock).toBeCalledWith('username', 'password');
        const error = wrapper.findAll('.auth-error');
        expect(error.length).toEqual(0);
    });
    it('should show error message on unsuccessful login attempt.', async () => {
        const loginMock = async (username, password) => {
            const response =  new LoginResponse();
            response.success = false;
            response.message = 'Login failed';
            return response;
        }
        const wrapper = shallowMount(Login, {
            data() {
                return {
                    login: loginMock
                }
            }
        });
        const usernameInput = wrapper.find('input[name=username]');
        const passwordInput = wrapper.find('input[name=password]');
        usernameInput.setValue('username');
        passwordInput.setValue('password');

        const loginButton = wrapper.find('button[name=login]');
        loginButton.trigger('click');
        await Vue.nextTick();
        await Vue.nextTick();
        const error = wrapper.find('.auth-error');
        expect(error.text()).toEqual('Authentication failed');
    });
})
//TODO: 1. Wrap fields in form element. 2. Change button type to submit.
//TODO: 2. On successful login, the login component should disappear.
