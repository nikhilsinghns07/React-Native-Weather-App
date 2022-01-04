import React  from 'react'
import { View, Text, Image , StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FutureForecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))
                :
                <View/>
            }
        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+ forecastItem.weather[0].icon+"@2x.png"}
    return (
        <View style={styles.container}> 
            <Text style={styles.day}> { new Date(forecastItem.dt * 1000).toDateString() } </Text>
            <Image source={img} style={styles.image}/>
            <Text style={styles.temp}> Maximum   {forecastItem.temp.max} <MaterialCommunityIcons name="temperature-celsius" size={15} color="white" /></Text>
            <Text style={styles.temp}> Minimum {forecastItem.temp.min} <MaterialCommunityIcons name="temperature-celsius" size={15} color="white" /> </Text>
            <Text style={styles.temp}> Humidity {forecastItem.humidity}% </Text>
        </View>
    )
}
export default FutureForecast

const styles = StyleSheet.create({
    image : {
        width: 100,
        height: 100,
    },
    container : {
        flex:  1,
        justifyContent : 'center',
        backgroundColor : '#00000033',
        borderRadius : 10,
        borderColor : 'white',
        borderWidth : 1,
        paddingRight : 40,
        paddingBottom : 20,
        marginLeft: 20,
        
    },
    day : {
        color:  'white',
        marginLeft : 7,
        fontSize : 17,
    },
    temp : {
        color:  'white',
        marginLeft : 7,
        fontSize : 15,
    }
})