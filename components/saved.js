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


export default function Saved() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Saved Countries List</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'black'
    },
    heading: {
        color: 'white',
        fontSize: 28,

    }
});
