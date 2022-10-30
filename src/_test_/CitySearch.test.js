import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe('<CitySearch /> component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData)
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => { }} />);
  });

  test('renders text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('renders list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('changes state when text input changes', () => {
    CitySearchWrapper.setState({ query: 'Munich' });
    const eventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin')
  });

  test('renders list of suggestions correctly', () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });

  test('suggestion list matches the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] }); // set component state to default values
    CitySearchWrapper.find(".city").simulate("change", { // find nodes with className "city" and simulate a change event
      target: { value: 'Berlin' }, // target the 'value' property and change it to "Berlin"
    });
    const query = CitySearchWrapper.state("query"); // Create a variable out of the component's local state value of "query" (which should currently be berlin after a change was simulated)
    const filteredLocations = locations.filter((location) => { // Create a variable that stores a list of filtered locations
      return location.toUpperCase().indexOf(query.toUpperCase()) > - 1; // The filtered list that is output only contains locations that match the query
    });
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations); // The test: the componentt's state should match the list of locations matching the query
  });

  test('selecting a suggestion should change query state', () => {
    CitySearchWrapper.setState({ query: "Berlin" });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
  });

  test("selecting CitySearch input reveals the suggestions list", () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
  });

  test("selecting a suggestion hides the suggestions list", () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSugesstions: undefined
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' })
  });
})