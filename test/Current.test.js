import React from 'react'
import { shallow, mount } from 'enzyme'
import Current from '../lib/WeatherData/Current'
import API from '../lib/API'
import MockDataCurrent from '../__mock__/mock-data-current'
import MockDataForecast from '../__mock__/mock-data-forecast'

describe('Current', () => {
  let wrapper;
  let apiObj = new API('San Francisco')
  apiObj.setCurrentData(MockDataCurrent)
  apiObj.setCurrentHighLowData(MockDataForecast)

  beforeEach(() => {
    wrapper = shallow(<Current apiData={apiObj} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have the correct header', () => {
    expect(wrapper.render().find('h2').text()).toEqual('San Francisco, CA')
  })

  it('should have the correct current temp', () => {
    expect(wrapper.render().find('.current-temp').text()).toEqual('66.3 FPartly Cloudy')
  })

  it('should have the correct low temp', () => {
    expect(wrapper.render().find('.low-temp').text()).toEqual('50 F')
  })

  it('should have the correct high temp', () => {
    expect(wrapper.render().find('.high-temp').text()).toEqual('68 F')
  })

  it('should have the correct weather summary', () => {
    expect(wrapper.render().find('.weather-summary').text()).toEqual('Partly cloudy in the morning, then clear. High of 68F. Breezy. Winds from the West at 10 to 25 mph.')
  })

  it('should have the rendered the image', () => {
    const image = wrapper.find('.current-img');
    expect(image.exists()).toEqual(true)
    expect(image.props().alt).toEqual('partlycloudy')
  })
})
