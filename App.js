
import React from 'react'
import { StatusBar,StyleSheet ,ImageBackground,Dimensions,ScrollView, View} from 'react-native'
import Weather from './components/Weather'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <ScrollView>
      <StatusBar />
      <ImageBackground style={styles.backgroundImg} source={require('./assets/background.jpg')}>
        <Weather />        
      </ImageBackground>
    </ScrollView>
    
  )
}
export default App

const styles = StyleSheet.create({

  backgroundImg: {
    width: windowWidth,
    height: windowHeight,
  },
});
