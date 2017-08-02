import React from 'react'
import { shallow, mount } from 'enzyme'
import Daily from '../lib/Daily'
import MockDataTenDay from '../lib/mock-data-tenday'

describe('Daily', () => {
  let wrapper
  let oneDay

  beforeEach(() => {
    const { date,
          high,
          low,
          icon_url,
          icon,
          conditions } = MockDataTenDay.forecast.simpleforecast.forecastday[0]

    oneDay = {
      day: date.weekday,
      date: date.day,
      month: date.monthname,
      year: date.year,
      high: high.fahrenheit,
      low: low.fahrenheit,
      icon_url: icon_url,
      icon_name: icon,
      condition: conditions
    }

    wrapper = shallow(<Daily key={oneDay.date} dayData={oneDay}/>)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have valid props', () => {
    expect(wrapper.instance().props.dayData).toEqual(oneDay)
  })

  it('should have valid rendered text', () => {
    expect(wrapper.find('.tenday-high-low').find('p').first().text()).toEqual('55 F')
  })

  it('should render the correct image', () => {
    const image = wrapper.find('img')
    expect(image.exists()).toEqual(true)
    expect(image.props().alt).toEqual('partlycloudy')
  })
})
