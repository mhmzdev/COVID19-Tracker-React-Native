import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Country from './components/country';
import CountryDetails from './components/countryDetails';
import Global from './components/global';
import Saved from './components/saved';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="World Stats" component={Global} />
        <Drawer.Screen name="Country" component={Country} />
      </Drawer.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="global" component={Global} />
    //     <Tab.Screen name="country" component={Country} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );

  // function App1() {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="global">
  //         // <Stack.Screen name="country" component={Country} />
  //         <Stack.Screen name="global" component={Global} />
  //         <Stack.Screen name="CountryDetails" component={CountryDetails} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //     // <NavigationContainer>
  //     //   <Tab.Navigator
  //     //     initialRouteName="World States"
  //     //     screenOptions={({ route }) => ({
  //     //       tabBarIcon: ({ focused, tintColor }) => {
  //     //         if (route.name === 'World States') {
  //     //           return <Icon name="globe" size={23} color="#3498DB" />;
  //     //         } else if (route.name === 'Country States') {
  //     //           return <Icon name="flag" size={23} color="#3498DB" />;
  //     //         }
  //     //       },
  //     //     })}>
  //     //     <Tab.Screen name="World States" component={Global} />
  //     //     <Tab.Screen name="Country States" component={Country}>

  //     //     </Tab.Screen>
  //     //   </Tab.Navigator>
  //     // </NavigationContainer>
  //   );
}
