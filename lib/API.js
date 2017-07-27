// import React from 'react'
import MockDataCurrent from './mock-data-current'
import MockDataForecast from './mock-data-forecast'
import MockDataHourly from './mock-data-hourly'
import MockDataTenDay from './mock-data-tenday'

export default class API {
  constructor(location) {
    this.location = location
    this.current = {}
    this.sevenHour = []
    this.tenDay = []
  }

  updateWeatherData() {
    this.callAPIcurrent()
    this.callAPISevenHour()
    this.callAPITenDay()
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
    for (let i = 0; i < 7; i++) {
        this.sevenHour.push({
          time: MockDataHourly.hourly_forecast[i].FCTTIME.civil,
          temp: MockDataHourly.hourly_forecast[i].temp.english,
          icon_url: MockDataHourly.hourly_forecast[i].icon_url,
          icon_name: MockDataHourly.hourly_forecast[i].icon,
          condition: MockDataHourly.hourly_forecast[i].condition
        })
    }
  }

  callAPITenDay() {
    for (let i = 0; i < 10; i++) {
      this.tenDay.push({
        day: MockDataTenDay.forecast.simpleforecast.forecastday[i].date.weekday,
        date: MockDataTenDay.forecast.simpleforecast.forecastday[i].date.day,
        month: MockDataTenDay.forecast.simpleforecast.forecastday[i].date.monthname,
        year: MockDataTenDay.forecast.simpleforecast.forecastday[i].date.year,
        high: MockDataTenDay.forecast.simpleforecast.forecastday[i].high.fahrenheit,
        low: MockDataTenDay.forecast.simpleforecast.forecastday[i].low.fahrenheit,
        icon_url: MockDataTenDay.forecast.simpleforecast.forecastday[i].icon_url,
        icon_name: MockDataTenDay.forecast.simpleforecast.forecastday[i].icon,
        condition: MockDataTenDay.forecast.simpleforecast.forecastday[i].conditions
      })
    }
  }

}
