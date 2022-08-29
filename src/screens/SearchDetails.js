
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Image, View, Pressable } from 'react-native';
import NetTextLabel from '../components/NetTextLabel';

const SearchDetails = ({ navigation }) => {
    
   
    // --------------------------------------- Main Design  ---------------------------------------
    
    return (
            // Main container view
            <View style={styles.container} >
            
              <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
              <NetTextLabel
                style={{color:'yellow'}}
                label={'SearchDetails'}
               />
              </View>
 
            </View>
        );
    
}

// --------------------------------------- Css ---------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
});

export default SearchDetails;
