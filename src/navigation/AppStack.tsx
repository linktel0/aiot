/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './ParmListTypes';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import * as screens from '../screens'

const Stack = createStackNavigator<AppStackParamList>();
const AppStack = () => {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='AuthenticationScreen' component={screens.AuthenticationScreen} />
        <Stack.Screen name='Advertise' component={screens.AdvertiseScreen} />
        {/*<Stack.Screen name='Auth' component={AuthStack} />
        
        */}
        <Stack.Screen name='Main' component={MainStack} /> 
    </Stack.Navigator>
  );
};

export default AppStack;
