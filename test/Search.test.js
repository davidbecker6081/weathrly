import React from 'react'
import Search from '../lib/Search'
import AutoComplete from '../lib/AutoComplete'
import { shallow, mount } from 'enzyme'
import CityList from '../lib/CityList'
import Trie from '../lib/Trie'
import Suggestion from '../lib/Suggestion'

describe('Search', () => {
  let wrapper
  let mockFn
  let cityListTrie = new Trie()
  cityListTrie.populate(CityList)

  beforeEach(() => {
    localStorage.clear()
    mockFn = jest.fn()
    wrapper = mount(<Search
                        setCurrentLocation={mockFn}
                        setValidLocation={mockFn}
                        showErrorPage={mockFn}
                        cityListTrie={cityListTrie}
                        isValidLocation={true}
                        currentLocation={'CO/Denver'}
                      />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should set the state by calling handleInputChange', () => {
    expect(wrapper.state().currentInput).toEqual('')
    wrapper.instance().handleInputChange({target: {value: 'CA/San_Diego'}})
    expect(wrapper.state().currentInput).toEqual('CA/San_Diego')
  })

  it('should call the search function when selecting city from auto complete', () => {
    wrapper.instance().search = jest.fn()
    expect(wrapper.state().currentInput).toEqual('')
    wrapper.instance().handleInputChange({target: {textContent: 'San Diego, CA'}})
    expect(wrapper.state().currentInput).toEqual('San Diego, CA')
    expect(wrapper.instance().search).toHaveBeenCalled()
  })

  it('should make the appropriate function calls with a zipcode', () => {
    wrapper.setState({currentInput: '80223'})
    wrapper.instance().search()
    expect(wrapper.instance().props.setValidLocation).toHaveBeenCalled()
    expect(wrapper.instance().props.setCurrentLocation).toHaveBeenCalled()
    expect(wrapper.state().currentInput).toEqual('')
  })

  it('should make the appropriate function calls with a city and state combo', () => {
    wrapper.instance().massageInput = jest.fn()
    wrapper.setState({currentInput: 'Denver, CO'})
    wrapper.instance().search()
    expect(wrapper.instance().props.setValidLocation).toHaveBeenCalled()
    expect(wrapper.instance().massageInput).toHaveBeenCalled()
    expect(wrapper.instance().props.setCurrentLocation).toHaveBeenCalled()
    expect(wrapper.state().currentInput).toEqual('')
  })

  it('should massage the input with a valid city and state combo', () => {
    let formattedQuery = wrapper.instance().massageInput('Denver CO')
    expect(formattedQuery).toEqual('co/denver')

    formattedQuery = wrapper.instance().massageInput('Denver, CO')
    expect(formattedQuery).toEqual('co/denver')
  })

  it('should massage the input with an Invalid city and state combo', () => {
    let formattedQuery = wrapper.instance().massageInput('DenverCO')
    expect(wrapper.instance().props.showErrorPage).toHaveBeenCalled()
    expect(formattedQuery).toEqual('denverco')

    formattedQuery = wrapper.instance().massageInput(',Denver, CO')
    expect(wrapper.instance().props.showErrorPage).toHaveBeenCalled()
    expect(formattedQuery).toEqual(',denver, co')
  })

  it('should render AutoComplete with an error when the city and state is invalid', () => {
    wrapper.setState({currentInput: ''})
    wrapper.setProps({ isValidLocation: false });
    wrapper.setProps({ currentLocation: 'denverco' });
    expect(wrapper.find(AutoComplete).render().find('.auto-not-found').text()).toEqual('Invalid search. Please enter a city and state or zipcode')
  })

  it('should render AutoComplete successfully with a valid state and city', () => {
    wrapper.setState({currentInput: 'Den'})
    expect(wrapper.find(AutoComplete).render().find('.auto-found').text()).toEqual('Location Matches Found:')
  })

  it('should reset the input to empty string on click simulation', () => {
    const searchBtn = wrapper.find('.search-btn')
    const searchInput = wrapper.find('.input-search')

    expect(searchBtn.exists()).toEqual(true)

    wrapper.setState({currentInput: 'Den'})
    expect(searchInput.props().value).toEqual('Den')

    searchBtn.simulate('click')
    expect(wrapper.state().currentInput).toEqual('')
    wrapper.update()
    expect(searchInput.props().value).toEqual('')
  })

  it('should return a suggestion list with the correct count', () => {
    wrapper.setState({currentInput: 'Den'})
    expect(wrapper.find('AutoComplete').find('Suggestion').length).toEqual(2)
  })

})
