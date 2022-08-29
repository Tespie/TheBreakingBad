import React, { useEffect, useState } from 'react';
import { Animated, ImageBackground, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
var timeOut = 1500; // Set duration for animation

const Splash = ({ navigation }) => {

    useEffect(() => {

       
        setTimeout(async () => {
            getScreen();
        }, 3000);
    }, []);

    // --------------------------------------- Methods ---------------------------------------
    const getScreen = async () => {
       
                navigation.navigate('Home');
       
    };

    // --------------------------------------- Main Design  ---------------------------------------
    return (
        <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"red"
    },
});

export default Splash;