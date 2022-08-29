
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Image, View, Pressable } from 'react-native';
import NetTextLabel from '../components/NetTextLabel';

const Search = ({ navigation }) => {
    
   
    // --------------------------------------- Main Design  ---------------------------------------
    
    return (
            // Main container view
            <View style={styles.container} >
            
            <TouchableOpacity onPress={()=>{navigation.navigate('SearchDetails')}} style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
              <NetTextLabel
                style={{color:'black'}}
                label={'Search'}
               />
              </TouchableOpacity>
 
            </View>
        );
    
}

// --------------------------------------- Css ---------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
});

export default Search;
