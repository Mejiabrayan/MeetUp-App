import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberEventWrapper;
    beforeAll(() => {
        NumberEventWrapper = shallow(<NumberOfEvents />)
    })
    test('render input element', () => {
        expect(NumberEventWrapper.find('.input-number')).toHaveLength(1)
    })
})