import * as React from 'react';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import Global from './global';
import CountryDetails from './countryDetails'

export default function Country({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const countriesObj = data;

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
      .then((response) => response.json())
      .then((json) => {
        return setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function CountryCard({navigation, countryName, countryCase, countryDetailsObj }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CountryDetails', {
            countryDataObj: countryDetailsObj,
          });
        }}
        style={styles.countryCard}>
        <Text style={styles.countryNameText}>{countryName}</Text>
        <Text style={styles.countryResultText}>{countryCase}</Text>
      </TouchableOpacity>
    );
  }

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  let [fontsLoaded] = useFonts({
    Langar: require('./assets/fonts/Langar.ttf'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Countries Stats</Text>
      <View style={{ paddingTop: 8 }} />
      {isLoading == true ? (
        <ActivityIndicator color="red" />
      ) : (
        <FlatList
          data={countriesObj}
          renderItem={({ item }) => {
            return (
              <CountryCard
              navigation={navigation}
                countryDetailsObj={item}
                countryName={item.country}
                countryCase={formatResult(item.cases)}
              />
            );
          }}
          keyExtractor={(item) => item.country}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 8,
    paddingRight: 8,
  },
  headingText: {
    fontFamily: 'Langar',
    fontSize: 30,
    letterSpacing: 4,
    paddingTop: 10,
  },
  countryCard: {
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
    elevation: 2.0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
  },
  countryNameText: {
    fontSize: 22,
  },
  countryResultText: {
    fontSize: 18,
  },
});
