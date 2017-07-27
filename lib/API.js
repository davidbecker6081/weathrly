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

    // const {city, zip, time, condition, temp, icon_url, icon_name, high, low} = this.current

    const { display_location: location,
            observation_time: time,
            weather,
            temp_f: temp,
            icon_url,
            icon} = MockDataCurrent[this.location]
    const {high, low} = MockDataForecast.forecast.simpleforecast.forecastday[0]
    // console.log(city);
    this.current.city = location.full
    this.current.zip = location.zip
    this.current.time = time
    this.current.condition = weather
    this.current.temp = temp
    this.current.icon_url = icon_url
    this.current.icon_name = icon

    this.current.high = high.fahrenheit;
    this.current.low = low.fahrenheit;


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
