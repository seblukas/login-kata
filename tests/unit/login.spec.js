import {shallowMount} from '@vue/test-utils'
import Login from "../../src/components/Login";

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

        let passwordInput = wrapper.find('button[name=login]');
        expect(passwordInput.isVisible()).toBeTruthy();
        expect(passwordInput.text()).toEqual("Login");
    });
})
//TODO: 1. Wrap fields in form element. 2. Change button type to submit.
