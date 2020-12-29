import * as React from 'react';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Global from './global'
import CountryDetails from './countryDetails'

const Stack = createStackNavigator();

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

  function CountryCard({ navigation, countryName, countryCase, countryDetailsObj }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Country Details', {
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

  function CountrySubFtn() {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Countries Stats</Text>
        <View style={{ paddingTop: 8 }} />

        {isLoading == true ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color="red" />
            <View style={{ paddingTop: 8 }} />
            <Text style={{ color: 'white' }}>Loading Country Stats...</Text>
          </View>
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

  return (
    <Stack.Navigator>
      <Stack.Screen name="Country" component={CountrySubFtn} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Country Details" component={CountryDetails} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'black'
  },
  headingText: {
    fontFamily: 'Langar',
    fontSize: 30,
    letterSpacing: 4,
    paddingTop: 10,
    color: 'white'
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
    borderColor: 'white',
    borderWidth: 1
  },
  countryNameText: {
    fontSize: 22,
    color: 'white'
  },
  countryResultText: {
    fontSize: 18,
    color: 'white'
  },
});
