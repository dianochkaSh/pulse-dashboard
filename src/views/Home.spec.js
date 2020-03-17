import React from 'react';
import Home from './Home';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('node-fetch');

import fetch, {Response} from 'node-fetch';

import {useAuth0} from '../react-auth0-spa';

beforeEach(() => {
    useAuth0.isA = jest.fn(() => mockPromise);
});
describe('show component Home', () => {
    // jest.mock('../react-auth0-spa', () => {
    //     return {
    //         isAuthenticated: true
    //     };
    // });

     //const authSpa = jest.mock('../react-auth0-spa');


    //authSpa.mockReturnValue({isAuthenticated: false});
    // const { isAuthenticated, loginWithRedirect } = {
    //     isAuthenticated: true,
    //     loginWithRedirect: jest.fn()
    //
    //
    // };
    // fetch.mockReturnValue( { isAuthenticated: true });



    it('show component if isAuthenticated= false', async() => {
        const { isAuthenticated } = authSpas;
        const wrapper = shallow(<Home />);
        expect(wrapper.find('h2').text().toEqual('Log in to get started'));
    })
});
