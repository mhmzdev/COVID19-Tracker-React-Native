import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// You can import from local files
import Country from './components/country';
import Global from './components/global';
import Saved from './components/saved';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

export default function App() {


  return (
    <NavigationContainer >
      <Drawer.Navigator >
        <Drawer.Screen name="World Stats" component={Global} />
        <Drawer.Screen name="Country" component={Country} />
        <Drawer.Screen name="Saved" component={Saved} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
