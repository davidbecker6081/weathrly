// API Keys
// 49c6b5a2b723a2be - endlesshypnosis
// ee2eb5b0fc2344a6 - nicksvet

export default class API {
  constructor(location) {
    this.location = location
    this.current = {}
    this.sevenHour = []
    this.tenDay = []
    this.currentURL = ''
    this.currentHighLowURL = ''
    this.tenDayURL = ''
    this.sevenHourURL = ''
  }

  updateURL() {
    this.location = `${this.location}.json`
    this.currentURL = `http://api.wunderground.com/api/ee2eb5b0fc2344a6/conditions/q/${this.location}`
    this.currentHighLowURL = `http://api.wunderground.com/api/ee2eb5b0fc2344a6/forecast/q/${this.location}`
    this.tenDayURL = `http://api.wunderground.com/api/ee2eb5b0fc2344a6/forecast10day/q/${this.location}`
    this.sevenHourURL = `http://api.wunderground.com/api/ee2eb5b0fc2344a6/hourly/q/${this.location}`
  }

  updateWeatherData() {
    this.updateURL()
    const fetchCurrentData = fetch(this.currentURL)
    .then(data => data.json())

    const fetchHighLowData = fetch(this.currentHighLowURL)
    .then(data => data.json())

    const fetchSevenHourData = fetch(this.sevenHourURL)
    .then(data => data.json())

    const fetchTenDayData = fetch(this.tenDayURL)
    .then(data => data.json())

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
    const { fcttext } = currentHighLowData.forecast.txt_forecast.forecastday[0]

    this.current.high = high.fahrenheit;
    this.current.low = low.fahrenheit;
    this.current.weather_summary = fcttext;
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
