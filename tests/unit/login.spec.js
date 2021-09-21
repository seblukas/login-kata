import { shallowMount } from '@vue/test-utils'
import Login from "../../src/components/Login";

describe('Login.vue', () => {
    it('should have title.', () => {
        const wrapper = shallowMount(Login, {});

        expect(wrapper.find('h1').text()).toMatch('Login to Area52');
    })
})
