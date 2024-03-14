import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ComponentsScreen from '../screens/ComponentsScreen'
import { AuthStackParamList } from './ParmListTypes'
import * as screen from '../screens'

const Stack = createStackNavigator<AuthStackParamList>()

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LoginMobile' component={screen.LoginMobileScreen} />
            <Stack.Screen name='LoginWechat' component={screen.LoginWechatScreen} />
            <Stack.Screen name='LoginAli' component={screen.LoginAliScreen} />
            {/* 
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />*/}
        </Stack.Navigator>
    )
}

export default AuthStack