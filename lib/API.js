import React from 'react'
import MockDataCurrent from './mock-data-current'
import MockDataForecast from './mock-data-forecast'

export default class API {
  constructor(location) {
    this.location = location
    this.current = {}
  }

  callAPIcurrent() {
    // make a call to actual API
    // get back object of current weather

    this.current.city = MockDataCurrent[this.location].display_location.full
    this.current.zip = MockDataCurrent[this.location].display_location.zip
    this.current.time = MockDataCurrent[this.location].observation_time
    this.current.condition = MockDataCurrent[this.location].weather
    this.current.temp = MockDataCurrent[this.location].temp_f
    this.current.icon_url = MockDataCurrent[this.location].icon_url
    this.current.icon_name = MockDataCurrent[this.location].icon

    this.current.high = MockDataForecast.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    this.current.low = MockDataForecast.forecast.simpleforecast.forecastday[0].low.fahrenheit;


    // MockDataCurrent[this.props.location].relative_humidity
    // MockDataCurrent[this.props.location].wind_string
  }

  callAPISevenHour() {

  }


}
