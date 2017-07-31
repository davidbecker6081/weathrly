import React from 'react'
import { shallow, mount } from 'enzyme'
import SevenHour from '../lib/SevenHour'
import Hourly from '../lib/Hourly'
import API from '../lib/API'
import MockDataHourly from '../lib/mock-data-hourly'



describe('SevenHour', () => {
  let wrapper;
  let apiObj = new API('San Francisco')

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
    apiObj.setSevenHourData(MockDataHourly);
    expect(wrapper.instance().props.apiData.sevenHour.length).toEqual(7)
  })

  it('should render 7 li elements', () => {
    expect(wrapper.render().find('li')).toHaveLength(8)
  })

  it('should have the correct header', () => {
    expect(wrapper.render().find('h3').text()).toEqual('7 Hour')
  })

  it('should render the correct first hourly component', () => {
    console.log(wrapper.debug());
    expect(wrapper.render().children('.sevenhour-card-container').children('.sevenhour-time').text()).toEqual('11:00 AM')
  })



})
