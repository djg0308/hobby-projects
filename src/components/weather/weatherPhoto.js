import sky from '../images/0_tjHdsfrW2F-V283v.jpeg'
import sun from '../images/d5ffc8_6f01c7a8173a461dba1a0067763840e0_mv2_d_6006_4245_s_4_2.jpg'
import rain from '../images/rain.jpg'
import chch from '../images/chch.jpg'
import night from '../images/night.jpg'
import snow from '../images/snow.jpg' 

export const WeatherPhotoChange = (convertWeatherIconObjToString) => {
    if (convertWeatherIconObjToString === 'cloudy' || convertWeatherIconObjToString === 'partlycloudy_day') {
        return sky
    } else if (convertWeatherIconObjToString === 'fair_day' || convertWeatherIconObjToString === 'clearsky_day') {
        return sun
    } else if (convertWeatherIconObjToString === 'heavyrain' || convertWeatherIconObjToString === 'lightrain' || convertWeatherIconObjToString === 'rain' || convertWeatherIconObjToString === 'rainshowers_day' || convertWeatherIconObjToString === 'lightrainshowers_day') {
        return rain 
    } else if (convertWeatherIconObjToString.includes('snow') === true && convertWeatherIconObjToString.includes('night') !== true) {
        return snow
    }
    else if (convertWeatherIconObjToString.includes('night') === true) {
        return night
    }
    else {
        return chch
    }
}