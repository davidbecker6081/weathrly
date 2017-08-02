import React from 'react'
import { shallow, mount } from 'enzyme'
import SevenHour from '../lib/WeatherData/SevenHour'
import Hourly from '../lib/WeatherData/Hourly'
import API from '../lib/API'
import MockDataHourly from '../__mock__/mock-data-hourly'

describe('SevenHour', () => {
  let wrapper;
  let apiObj = new API('San Francisco')
  apiObj.setSevenHourData(MockDataHourly);

  beforeEach(() => {
    wrapper = shallow(<SevenHour apiData={apiObj} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have a sevenHour array of 7 items', () => {
    expect(wrapper.instance().props.apiData.sevenHour.length).toEqual(7)
  })

  it('should render 8 li elements', () => {
    expect(wrapper.render().find('li')).toHaveLength(8)
  })

  it('should have the correct header', () => {
    expect(wrapper.render().find('h3').text()).toEqual('7 Hour')
  })

  it('should render the correct first hourly component', () => {
     expect(wrapper.find(Hourly).at(0).render().find('.sevenhour-time').text()).toEqual('11:00 AM')
  })

  it.skip('should pass the CONTAINS check', () => {
    // REASON FOR SKIP: We tried to use this 'contains' function but couldn't
    // figure out how to get it working correctly
    console.log(wrapper.find(Hourly).at(0).containsAnyMatchingElements([<div className="sevenhour-time">11:00 AM</div>]));
    expect(wrapper.find(Hourly).at(0).containsAnyMatchingElements([<div className="sevenhour-time">11:00 AM</div>])).toEqual(true)
  })

  it('should give the correct key to the correct hourly component', () => {
    expect(wrapper.find(Hourly).at(0).key()).toEqual('11:00 AM')
  })
})
