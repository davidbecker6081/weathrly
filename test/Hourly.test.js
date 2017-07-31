import React from 'react'
import { shallow, mount } from 'enzyme'
import Hourly from '../lib/Hourly'
import MockDataHourly from '../lib/mock-data-hourly'


describe('Hourly', () => {
  let wrapper
  let oneHour

  beforeEach(() => {
    oneHour = {
      time: MockDataHourly.hourly_forecast[0].FCTTIME.civil,
      temp: MockDataHourly.hourly_forecast[0].temp.english,
      icon_url: MockDataHourly.hourly_forecast[0].icon_url,
      icon_name: MockDataHourly.hourly_forecast[0].icon,
      condition: MockDataHourly.hourly_forecast[0].condition
    }
    wrapper = shallow(<Hourly key={1} hourlyData={oneHour} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have valid props', () => {
    expect(wrapper.instance().props.hourlyData).toEqual(oneHour)
  })

  it('should have valid rendered text', () => {
    expect(wrapper.find('.sevenhour-time').text()).toEqual('11:00 AM')
  })

  it('should render 3 divs per card', () => {
    expect(wrapper.find('div').length).toEqual(3)
  })

})
