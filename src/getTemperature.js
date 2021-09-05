const axios = require('axios')
const { forecast } = require('./forecast')

const getTemperature = address => {
    return new Promise(resolve => {
        //getting latitude and longitude
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${`YOUR ACCESS KEY`}&limit=1`).
            then(async response => {
                if (response.data.features.length) {
                    const latitude = response.data.features[0].center[1]
                    const longitude = response.data.features[0].center[0]
                    const placeName = response.data.features[0].place_name
                    resolve(await forecast(latitude, longitude, placeName))
                } else {
                    console.log('Please specify a valid location');
                    resolve({
                        error: 'Please specify a valid location'
                    })
                }
            }).
            catch(error => {
                console.log('Unable to connect')
                resolve({
                    error: 'Unable to connect'
                })
            })
    })
}

module.exports = {
    getTemperature: getTemperature
}