import React from 'react'
import TenDay from '../lib/TenDay'
import Daily from '../lib/Daily'
import API from '../lib/API'
import MockDataTenDay from '../lib/mock-data-tenday'
import { shallow, mount } from 'enzyme'

describe('TenDay', () => {
  let wrapper;
  let apiObj = new API('San Francisco')

  beforeEach(() => {
    wrapper = shallow(<TenDay apiData={apiObj} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have a tenHour array of 10 items', () => {
    expect(wrapper.instance().props.apiData.tenDay.length).toEqual(0)
    apiObj.setTenDayData(MockDataTenDay);
    expect(wrapper.instance().props.apiData.tenDay.length).toEqual(10)
  })

  it('should render 10 li elements', () => {
    expect(wrapper.render().find('li')).toHaveLength(10)
  })

  it('should have the correct header', () => {
    expect(wrapper.render().find('h2').text()).toEqual('10 Day')
  })

  it('should render the correct first Daily component', () => {
    expect(wrapper.render().find('h3').first().text()).toEqual('Tuesday')
  })

  it('should give the correct key to the correct Daily component', () => {
    expect(wrapper.find(Daily).at(0).key()).toEqual('3')
  })
})
