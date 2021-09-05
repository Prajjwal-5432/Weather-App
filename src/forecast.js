const axios = require('axios')

const forecast = (latitude, longitude, placeName) => {
    return new Promise(resolve => {
        //geting temperature
        axios.get(`http://api.weatherstack.com/current?access_key=${`YOUR ACCESS KEY`}&query=${latitude},${longitude}&units=m`).
            then(response => {
                if (response.data.error) {
                    console.log('Please specify a valid location');
                    resolve({
                        error: 'Please specify a valid location'
                    })
                } else {
                    const temperature = response.data.current.temperature
                    const feelsLike = response.data.current.feelslike
                    const weather = response.data.current.weather_descriptions[0]
                    resolve({
                        weather: weather,
                        placeName: placeName,
                        temperature: temperature,
                        feelsLike: feelsLike
                    })
                }
            }).
            catch(Error => {
                console.log('Unable to connect')
                resolve({
                    error: 'Unable to connect'
                })
            })
    })
}

module.exports = {
    forecast: forecast
}