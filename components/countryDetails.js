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

export default function CountryDetails({ navigation, route }) {
  const {countryData} = route.params.countryDataObj;

  let [fontsLoaded] = useFonts({
    Langar: require('./assets/fonts/Langar.ttf'),
  });

  function ResultCard({ resultType, stats }) {
    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultType}>{resultType}</Text>
        <Text style={styles.stats}>{stats}</Text>
      </View>
    );
  }

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.countryName}>{countryData.country}</Text>
      <View style={{ paddingTop: 10 }} />
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
    paddingLeft: 8,
    paddingRight: 8,
  },
  countryName: {
    fontSize: 32,
    fontFamily: 'Google',
  },
  resultCard: {
    elevation: 3.0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 160,
  },
  resultType: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  stats: {
    fontSize: 18,
  },
});
