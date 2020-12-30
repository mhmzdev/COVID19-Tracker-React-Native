import * as React from 'react';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import CountryDetails from './countryDetails'

const Stack = createStackNavigator();

export default function Saved({ navigation }) {

    const [savedList, setSavedList] = useState([]);
    useEffect(() => { fetchAllItems() }, []);

    const fetchAllItems = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            for (let i = 0; i < keys.length; i++) {
                const countryItem = await AsyncStorage.getItem(keys[i]);
                const countryItemParse = JSON.parse(countryItem);
                savedList[i] = countryItemParse;
            }
        } catch (error) {
            console.log(error, "problemo")
        }
    }

    function formatResult(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

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

    function SavedCountrySubFtn() {
        if (savedList.length == 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                    <Text style={{ color: 'white' }}>No Country Saved</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.heading}>Saved Countries List</Text>
                    <View style={{ paddingTop: 20 }} />
                    <FlatList
                        data={savedList}
                        renderItem={({ item }) => {
                            return (
                                <CountryCard navigation={navigation} countryName={item.country} countryCase={formatResult(item.cases)} countryDetailsObj={item} />
                            );
                        }}
                        keyExtractor={(item) => item.country}
                    />
                </View>
            );
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Saved" component={SavedCountrySubFtn} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Country Details" component={CountryDetails} />
        </Stack.Navigator>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'black',
    },
    heading: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'Langar'

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
