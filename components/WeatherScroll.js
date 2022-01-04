import React from 'react'
import { ScrollView} from 'react-native'
import FutureForecast from './FutureForecast'
const WeatherScroll = ({weatherData}) => {
    return (
        <ScrollView horizontal={true}>
            <FutureForecast data={weatherData}/>
        </ScrollView>
    )
}
export default WeatherScroll