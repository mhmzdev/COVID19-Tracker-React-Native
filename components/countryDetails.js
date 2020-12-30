import * as React from 'react';
import { useFonts } from 'expo-font';
import {
  Text,
  View,
  StyleSheet,

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Saved from './saved';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CountryDetails({ route }) {
  const countryData = route.params.countryDataObj;
  const [alreadySaved, setAlreadySaved] = useState(false);

  useEffect(() => { checkSaved() }, [])

  const checkSaved = async () => {
    var isSaved = await AsyncStorage.getItem(countryData.country)
    if (isSaved != undefined) {
      setAlreadySaved(true)
    }
  }

  function ResultCard({ resultType, stats }) {
    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultType}>{resultType}</Text>
        <Text style={styles.stats}>{stats}</Text>
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    Langar: require('./assets/fonts/Langar.ttf'),
  });

  let [googleFonts] = useFonts({
    GoogleFonts: require('./assets/fonts/GoogleSans.ttf'),
  });

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(value.country, jsonValue);
    } catch (e) {
      console.log(e)
    }
  }

  const removeData = async (value) => {
    try {
      await AsyncStorage.removeItem(value.country);
    } catch (e) {
      console.log(e)
    }
  }

  const addToSave = (value) => {
    if (!alreadySaved) {
      storeData(value);
      setAlreadySaved(!alreadySaved);
    }
    else {
      removeData(value);
      setAlreadySaved(!alreadySaved);
    }
  }

  if (!fontsLoaded) {
    return <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text>Loading</Text></View>
  }
  return (
    <View style={styles.container}>
      <View style={styles.countryNameView}>
        <Text style={styles.countryName}>{countryData.country}</Text>
        <TouchableOpacity onPress={() => addToSave(countryData)}>
          {!alreadySaved ? <Ionicons name="star-outline" size={32} color="white" /> : <Ionicons name="star" size={32} color="white" />}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Cases'}
          stats={formatResult(countryData.cases)}
        />
        <ResultCard
          resultType={'Today Cases'}
          stats={formatResult(countryData.todayCases)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Deaths'}
          stats={formatResult(countryData.deaths)}
        />
        <ResultCard
          resultType={'Today Deaths'}
          stats={formatResult(countryData.todayDeaths)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Recovered'}
          stats={formatResult(countryData.recovered)}
        />
        <ResultCard
          resultType={'Active Cases'}
          stats={formatResult(countryData.active)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Critical'}
          stats={formatResult(countryData.critical)}
        />
        <ResultCard
          resultType={'Total Tests'}
          stats={formatResult(countryData.totalTests)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'black'
  },
  countryName: {
    fontSize: 32,
    fontFamily: 'Langar',
    color: 'white',
    letterSpacing: 3
  },
  countryNameView: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  resultCard: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 160,
    borderColor: 'white',
    borderWidth: 1
  },
  resultType: {
    fontFamily: 'GoogleFonts',
    fontSize: 16,
    color: 'white',
    fontWeight: '100'
  },
  stats: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
});
