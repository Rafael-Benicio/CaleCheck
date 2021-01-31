import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


import Check from './src/Check';
import Mes from './src/Mes';


export default function App() {
  return (
    <NavigationContainer>
           <Stack.Navigator initialRouteName="Check" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Check" component={Check}/>
                <Stack.Screen name="Mes" component={Mes}/>
           </Stack.Navigator>
    </NavigationContainer>
  );
}     