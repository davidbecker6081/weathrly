// import React from 'react'
import MockDataCurrent from './mock-data-current'
import MockDataForecast from './mock-data-forecast'
import MockDataHourly from './mock-data-hourly'
import MockDataTenDay from './mock-data-tenday'

// 49c6b5a2b723a2be
// current
// http://api.wunderground.com/api/49c6b5a2b723a2be/conditions/q/CA/San_Francisco.json
// currentHighLow
// http://api.wunderground.com/api/49c6b5a2b723a2be/forecast/q/CA/San_Francisco.json
// 10 day
// http://api.wunderground.com/api/49c6b5a2b723a2be/forecast10day/q/CA/San_Francisco.json
// 7 hour
// http://api.wunderground.com/api/49c6b5a2b723a2be/hourly/q/CA/San_Francisco.json

export default class API {
  constructor(location) {
    this.location = location
    this.current = {}
    this.sevenHour = []
    this.tenDay = []
    this.currentURL = 'http://api.wunderground.com/api/49c6b5a2b723a2be/conditions/q/CA/San_Francisco.json'
    this.currentHighLowURL = 'http://api.wunderground.com/api/49c6b5a2b723a2be/forecast/q/CA/San_Francisco.json'
    this.tenDayURL = 'http://api.wunderground.com/api/49c6b5a2b723a2be/forecast10day/q/CA/San_Francisco.json'
    this.sevenHourURL = 'http://api.wunderground.com/api/49c6b5a2b723a2be/hourly/q/CA/San_Francisco.json'
  }

  updateURL() {

  }

  updateWeatherData() {
    const fetchCurrentData = fetch(this.currentURL)
    .then(data => data.json())

    const fetchHighLowData = fetch(this.currentHighLowURL)
    .then(data => data.json())

    const fetchSevenHourData = fetch(this.sevenHourURL)
    .then(data => data.json())

    const fetchTenDayData = fetch(this.tenDayURL)
    .then(data => data.json())

    // new Promise((resolve, reject) => {
    //   setTimeout(function() {
    //     resolve()
    // }, 5000)
    // )
    // .then(() => {})

    return new Promise((resolve, reject) => {
      Promise.all([fetchCurrentData, fetchHighLowData, fetchSevenHourData, fetchTenDayData])
      .then((allTheThings) => {

          this.setCurrentData(allTheThings[0])
          this.setCurrentHighLowData(allTheThings[1])
          this.setSevenHourData(allTheThings[2])
          this.setTenDayData(allTheThings[3])
            resolve()
      })
      .catch((e) => {reject(e)})
    })

  }


  setCurrentData(currentData) {
    const { display_location: location,
            observation_time: time,
            weather,
            temp_f: temp,
            icon_url,
            icon } = currentData.current_observation

    this.current.city = location.full
    this.current.zip = location.zip
    this.current.time = time
    this.current.condition = weather
    this.current.temp = temp
    this.current.icon_url = icon_url
    this.current.icon_name = icon



  }

  setCurrentHighLowData(currentHighLowData) {
    const { high, low } = currentHighLowData.forecast.simpleforecast.forecastday[0]

    this.current.high = high.fahrenheit;
    this.current.low = low.fahrenheit;
  }

  setSevenHourData(sevenHourData) {
    for (let i = 0; i < 7; i++) {
      let { FCTTIME: time,
            temp,
            icon_url,
            icon,
            condition } = sevenHourData.hourly_forecast[i]

        this.sevenHour.push({
          time: time.civil,
          temp: temp.english,
          icon_url: icon_url,
          icon_name: icon,
          condition: condition
        })
    }
  }

  setTenDayData(tenDayData) {
    for (let i = 0; i < 10; i++) {

      let { date,
            high,
            low,
            icon_url,
            icon,
            conditions } = tenDayData.forecast.simpleforecast.forecastday[i]

      this.tenDay.push({
        day: date.weekday,
        date: date.day,
        month: date.monthname,
        year: date.year,
        high: high.fahrenheit,
        low: low.fahrenheit,
        icon_url: icon_url,
        icon_name: icon,
        condition: conditions
      })
    }
  }

}
