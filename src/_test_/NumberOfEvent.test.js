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

    test('render default number in the input is 32', () => {
        expect(NumberEventWrapper.find('.input-number').prop('value')).toBe(32)
    })
    test('render state when input changes', () => {
        NumberEventWrapper.setState({
            totalEvents: 32
        })
        const eventObject = { target: { value: 8 } }
        NumberEventWrapper.find('.input-number').simulate('change', eventObject);
        expect(NumberEventWrapper.state('totalEvents')).toBe(8)
    })
})