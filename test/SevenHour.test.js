import React from 'react'
import { shallow, mount } from 'enzyme'
import SevenHour from '../lib/SevenHour'
import Hourly from '../lib/Hourly'
import API from '../lib/API'
import MockDataHourly from '../lib/mock-data-hourly'


describe('SevenHour', () => {
  let wrapper
  let apiObj = new API('San Francisco, CA')

  // Test to make sure that given a starting hour, the sevenHour array
  // starts at the correct hour, and ends 7 hours later

  beforeEach(() => {
    wrapper = shallow(<SevenHour apiData={apiObj} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have a sevenHour array of 7 items', () => {
    expect(wrapper.instance().props.apiData.sevenHour.length).toEqual(0)
    apiObj.callAPISevenHour();
    expect(wrapper.instance().props.apiData.sevenHour.length).toEqual(7)
  })

  it('should render 7 li elements', () => {
    expect(wrapper.render().find('li')).toHaveLength(7)
  })

  it('should have the correct header', () => {
    expect(wrapper.render().find('h1').text()).toEqual('header')
  })


})
