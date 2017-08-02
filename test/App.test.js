import React from 'react'
import App from '../lib/App'
import Search from '../lib/Search'
import Current from '../lib/Current'
import SevenHour from '../lib/SevenHour'
import TenDay from '../lib/TenDay'
import { shallow, mount } from 'enzyme'
import CityList from '../lib/CityList'
import Trie from '../lib/Trie'
import MockDataCurrent from '../lib/mock-data-current'
import MockDataForecast from '../lib/mock-data-forecast'
import MockDataSevenHour from '../lib/mock-data-hourly'
import MockDataTenDay from '../lib/mock-data-tenday'
import API from '../lib/API'

describe('App', () => {
  let wrapper
  let cityListTrie = new Trie()
  cityListTrie.populate(CityList)
  let apiObj = new API('San Francisco')
  apiObj.setCurrentData(MockDataCurrent);
  apiObj.setCurrentHighLowData(MockDataForecast)
  apiObj.setSevenHourData(MockDataSevenHour)
  apiObj.setTenDayData(MockDataTenDay)

  beforeEach(() => {
    wrapper = mount(<App />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should result in an error when the location is invalid', () => {
    wrapper.instance().showErrorPage = jest.fn()
    expect(wrapper.instance().isValidLocation).toEqual(true)
    wrapper.instance().isValidLocation = false
    wrapper.instance().setCurrentLocation('co/denver')
    expect(wrapper.instance().showErrorPage).toHaveBeenCalled()
  })

  it('should change the location when calling showErrorPage', () => {
    expect(wrapper.state().currentLocation).toEqual('')
    wrapper.instance().showErrorPage('denver')
    expect(wrapper.state().currentLocation).toEqual('denver')
    expect(wrapper.instance().isValidLocation).toEqual(false)
  })

  it('should reset current location', () => {
    wrapper.instance().isValidLocation = false
    wrapper.setState({currentLocation: 'co/denver'})
    wrapper.instance().setValidLocation()
    expect(wrapper.instance().isValidLocation).toEqual(true)
    expect(wrapper.state().currentLocation).toEqual('')
  })

  it('should run the componentWillMount', () => {
    wrapper.instance().retrieveFromLocal = jest.fn()
    wrapper.instance().componentWillMount()
    expect(wrapper.instance().retrieveFromLocal).toHaveBeenCalled()
  })

  it('should display the welcome page when necessary', () => {
    wrapper.setState({isOnWelcomePage: true})
    expect(wrapper.find('.App-Welcome').exists()).toEqual(true)
    expect(wrapper.find(Search).exists()).toEqual(true)
    expect(wrapper.find('.App').exists()).toEqual(false)
  })

  it('should not display the welcome page when necessary', () => {
    wrapper.setState({isOnWelcomePage: false})
    expect(wrapper.find('.App').exists()).toEqual(true)
    expect(wrapper.find(Search).exists()).toEqual(true)
    expect(wrapper.find('.App-Welcome').exists()).toEqual(false)
  })

  it('should not display the weather data no data exists', () => {
    wrapper.setState({apiData: undefined})
    expect(wrapper.find(Current).exists()).toEqual(false)
    expect(wrapper.find(SevenHour).exists()).toEqual(false)
    expect(wrapper.find(TenDay).exists()).toEqual(false)
  })

  it('should display the weather when data exists', () => {
    wrapper.setState({isOnWelcomePage: false})
    wrapper.setState({apiData: apiObj})
    expect(wrapper.find(Current).exists()).toEqual(true)
    expect(wrapper.find(SevenHour).exists()).toEqual(true)
    expect(wrapper.find(TenDay).exists()).toEqual(true)
  })
})
