import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// You can import from local files
import Country from './components/country';
import CountryDetails from './components/countryDetails';
import Global from './components/global';
import Saved from './components/saved';
import { View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  function DrawerContent() {
    return (
      <View style={{
        height: 300,
        backgroundColor: 'red'
      }}></View>
    );
  }

  return (
    <NavigationContainer >
      <Drawer.Navigator  >
        <Drawer.Screen name="World Stats" component={Global} />
        <Drawer.Screen name="Country" component={Country} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
