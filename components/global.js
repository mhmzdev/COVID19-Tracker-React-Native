import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

export default function Global() {

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  const localObj = data;

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/all')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  let [fontsLoaded] = useFonts({
    Langar: require('./assets/fonts/Langar.ttf'),
  });

  let [googleFonts] = useFonts({
    GoogleFonts: require('./assets/fonts/GoogleSans.ttf'),
  });

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  if (!fontsLoaded || !googleFonts) {
    return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text>Loading</Text></View>
  }
  return (
    <View style={styles.container}>
      <View style={{ padding: 25 }} />
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row'

        }}>
        <Image
          style={styles.mainImage}
          source={require('./assets/images/virus.png')}></Image>
        <View style={{paddingTop: 40}}>
          <Text style={styles.appNameText}>COVID-19</Text>
          <Text style={styles.virusText}>Virus Tracking App</Text>
        </View>
      </View>

      <View style={styles.globalTextView}>
        <Text style={styles.globalText}>Global Stats</Text>
      </View>

      {isLoading == true ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color="red" />
          <View style={{ paddingTop: 8 }} />
          <Text style={{ color: 'white' }}>Loading Global Stats...</Text>
        </View>
      ) : (
          <View style={{ paddingTop: 20 }}>
            <View style={styles.customCards}>
              <View>
                <Text style={styles.customCardsText}>Total Cases</Text>
                <Text style={styles.customCardResultText}>
                  {formatResult(localObj.cases)}
                </Text>
              </View>
              <Image
                style={styles.cardsImage}
                source={require('./assets/images/cases.png')}
              />
            </View>
            <View
              style={[
                styles.customCards,
                {
                  backgroundColor: '#E74C3C',
                },
              ]}>
              <View>
                <Text style={styles.customCardsText}>Total Deaths</Text>
                <Text style={styles.customCardResultText}>
                  {formatResult(localObj.deaths)}
                </Text>
              </View>
              <Image
                style={styles.cardsImage}
                source={require('./assets/images/deaths.png')}
              />
            </View>
            <View
              style={[
                styles.customCards,
                {
                  backgroundColor: '#1E8449',
                },
              ]}>
              <View>
                <Text style={styles.customCardsText}>Total Recovered</Text>
                <Text style={styles.customCardResultText}>
                  {formatResult(localObj.recovered)}
                </Text>
              </View>
              <Image
                style={styles.cardsImage}
                source={require('./assets/images/recovered.png')}
              />
            </View>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'black'
  },
  globalTextView: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 25,
    flexDirection: 'row',
  },
  appNameText: {
    fontFamily: 'Langar',
    color: 'white',
    fontSize: 28,
  },
  virusText: {
    color: 'white',
    fontFamily: 'GoogleFonts',
    fontSize: 12,
    letterSpacing: 3,
  },
  mainImage: {
    height: 120,
    width: 120,
    marginTop: 40,
  },
  globalText: {
    fontFamily: 'Langar',
    fontSize: 30,
    letterSpacing: 3,
    color: 'white',
  },
  customCards: {
    height: 85,
    marginTop: 15,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    elevation: 4.0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customCardsText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'GoogleFonts',
    fontWeight: '100',
    letterSpacing: 2,
  },
  customCardResultText: {
    fontSize: 22,
    fontFamily: 'GoogleFonts',
    color: 'white',
    paddingTop: 5,
  },
  cardsImage: {
    height: 60,
    width: 60,
    opacity: 0.7,
  },
});
