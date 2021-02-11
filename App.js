import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


import Check from './src/Check';
import Mes from './src/Mes';
import Day from './src/Day'

export default function App() {
  return (
    <NavigationContainer>
           <Stack.Navigator initialRouteName="Check" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Check" component={Check}/>
                <Stack.Screen name="Mes" component={Mes}/>
                <Stack.Screen name="Day" component={Day}/>
           </Stack.Navigator>
    </NavigationContainer>
  );
}     
