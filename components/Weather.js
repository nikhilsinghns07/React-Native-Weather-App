import React, {useEffect,useState} from 'react'
import { View, Text ,StyleSheet, Image , TouchableOpacity} from 'react-native'
import {installWebGeolocationPolyfill}  from 'expo-location'
import * as Location from 'expo-location';
import {  AntDesign , Entypo, MaterialCommunityIcons , Feather  } from '@expo/vector-icons';
import WeatherScroll from './WeatherScroll';

const Weather = () => {
    const [dt, setDt] = useState(new Date().toLocaleString());
    let tempArray;
    let dailyData;
    let maxtemp;
    let mintemp
    let weathertemp;
    let today;
    let currTemp;

    useEffect(() => {
        let secTimer = setInterval( () => {
        setDt(new Date().toLocaleString())
    },1000)
    return () => clearInterval(secTimer);
    }, []);

    const [data, setData] = useState({})
    const [daily , setDaily]  = useState({})
    const [sunriseDaily , setSunriseDaily] = useState()
    const [sunsetDaily , setSunsetDaily] = useState()
    const [curr,setCurr] = useState()
    const [weather,setWeather] = useState()
    const [icon,setIcon]  = useState()
    const [feels_like,setFeels_like] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const [humidity,setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [maximum,setMaximum] = useState()
    const [minimum,setMinimum] = useState()
    const [main , setMain] = useState({})
    const [country,setCountry] = useState()
    installWebGeolocationPolyfill()
    const currentLocation = useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            fetchDataFromApi("40.7128", "-74.0060")
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          fetchDataFromApi(location.coords.latitude, location.coords.longitude)
          fetchDailyDatafromApi(location.coords.latitude , location.coords.longitude)
        })();
      }, [currentLocation])
    
      const fetchDataFromApi = (latitude, longitude) => {
        if(latitude && longitude) {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=4f75b23f0106d171ddb805d1553bf84a`).then(res => res.json()).then(data => {
              setData(data)
              currTemp = data.current.temp;
              setCurr(currTemp)
              tempArray = data.current.weather
              weathertemp = tempArray[0].description
              setWeather(weathertemp)
              setIcon(tempArray[0].icon)
              setFeels_like(data.current.feels_like)
              setWindSpeed(data.current.wind_speed)
              setPressure(data.current.pressure)
              setHumidity(data.current.humidity)
              dailyData = data.daily;
              today = dailyData[0]
              maxtemp = today.temp.max
              mintemp = today.temp.min;
              setMaximum(maxtemp)
              setMinimum(mintemp)
              
        }).catch(err => {
            console.log(err)
        })
        }
      }

      const fetchDailyDatafromApi = (latitude,longitude) => {
          if(latitude && longitude) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4f75b23f0106d171ddb805d1553bf84a`).then(res =>res.json()).then(daily => {
                setDaily(daily)
                const sunrise = new Date(daily.sys.sunrise * 1000).toLocaleTimeString()
                const sunset = new Date(daily.sys.sunset * 1000).toLocaleTimeString()
                setSunriseDaily(sunrise)
                setSunsetDaily(sunset)
                let Main;
                Main = daily.weather[0]
                setMain(Main)
                setCountry(daily.sys.country)

            }).catch(err => {
                console.log(err)
            })
          }
      } 
    return (
        <View>
            <View style={styles.menu}>
    
                <Text style={styles.place}> {daily.name},{country}  <TouchableOpacity  onPress={currentLocation}>
                    <Entypo name="location" size={24} color="white" />
                </TouchableOpacity></Text>
                <Text style={{color:'white',fontSize : 20,marginRight: 10,}}> {main.main}</Text>
            </View>

            <View style={styles.dateView}>
                <Text style={styles.date}>{dt}</Text>
            </View>

            <View style={styles.tempView}>
                <Text style={styles.temp}> {curr}  <MaterialCommunityIcons name="temperature-celsius" size={45} color="white" /> </Text> 
                <Text style={{color : 'white',fontSize:17}}> {weather} </Text> 
                <Image source={{uri: `http://openweathermap.org/img/wn/${icon}@2x.png`}} style={{height : 50,width:50}}/>
            </View>

            <View style={styles.detailsView}> 
                <Text style={styles.detailsText}>Maximum      {maximum} <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" /></Text>
                <Text style={styles.detailsText}>Minimum      {minimum} <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" /></Text>
                <Text style={styles.detailsText}>Feels Like     {feels_like} <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" /> </Text>
                <Text style={styles.detailsText}>Wind Speed  {windSpeed} km/h  <Feather name="wind" size={24} color="black" /></Text>
                <Text style={styles.detailsText}>Sunrise          {sunriseDaily} am <Feather name="sunrise" size={26} color="black" /> </Text> 
                <Text style={styles.detailsText}>Sunset           {sunsetDaily} pm <Feather name="sunset" size={26} color="black" /> </Text>
                <Text style={styles.detailsText}>Pressure        {pressure} hPa</Text>
                <Text style={styles.detailsText}>Humidity        {humidity}% </Text>
            </View>
            {/* new Date(forecastItem.dt * 1000).toDateString() */}
            <WeatherScroll weatherData={data.daily}/>

        </View>
    )
}

export default Weather


const styles = StyleSheet.create({
    menu :{
        flexDirection :'row',
        justifyContent :'space-between',
        borderBottomWidth : 5,
        borderBottomColor : 'white',
        paddingTop: 5,
        paddingBottom: 10,
        marginLeft : 7,
        marginRight : 7,
    },
    place : {
        fontSize:20,
        color: 'white',
    },
    date :{
        fontSize : 40,
        color : '#ffe4e1',
        paddingLeft :60,
        fontFamily : 'sans-serif-condensed',
        borderRadius : 15,
    },
    dateView : {
        marginTop : 20,
        paddingLeft : 30,
        paddingRight:35,
        paddingBottom : 40,
    },
    tempView : {
        flexDirection :'row',
        backgroundColor : '#00000033',
        padding: 5,
        borderRadius : 10,
        borderColor : 'white',
        borderWidth : 1,
        marginBottom : 30,
        marginHorizontal : 20,
    },
    temp : {
        color: 'white',
        fontSize : 30,
        padding: 3,
    },
    detailsView : {
        fontSize : 20,
        color : 'black',
        padding: 10,
        backgroundColor:'#e6e6fa',
        borderRadius : 15,
        marginLeft : 25,
        marginRight : 45,
        marginBottom : 30,
    },
    detailsText : {
        fontSize : 20,
        color : 'black',
        paddingLeft : 40,
        padding:   2,
    },
})