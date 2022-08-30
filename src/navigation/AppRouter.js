import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import SearchDetails from '../screens/SearchDetails';
import Splash from '../screens/Splash';
import Details from '../screens/Details';
import { Text } from 'react-native';
import { Colors } from '../utils/Colors';

const Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: null,
                    gestureEnabled: false,
                }}
                initialRouteName={Search}
            >
                <Stack.Screen  name='Home'  component={Home}
                options={{
                    headerTitle: 'T B Bad ',
                    headerShown: true,
                    headerStyle : {
                        backgroundColor: Colors.COLOR_BLACK,
                        borderBottomColor : Colors.COLOR_BLACK,
                    },
                    headerTintColor : Colors.COLOR_WHITE,
                    headerShadowVisible : false,
                    //searchbar
                    // headerSearchBarOptions : {
                    //     barTintColor : 'red',
                    //     inputType  : 'text',
                    //     placeholder : 'seach bb'
                    // }
                }} 
                />

                <Stack.Screen name='Search' component={Search}
                options={{
                    // headerShown: true,
                    // headerTransparent : true,
                    headerStyle : {
                        backgroundColor: Colors.COLOR_BLACK,
                        borderBottomColor : Colors.COLOR_BLACK,
                    },
                    headerTintColor : Colors.COLOR_WHITE,
                }}
                />

                <Stack.Screen name='Details' component={Details}
                options={{
                    headerShown: true,
                    headerTransparent : true,
                    headerTintColor : Colors.COLOR_WHITE,
                }} 
                />
                <Stack.Screen name='SearchDetails' component={SearchDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
