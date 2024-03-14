import { TransitionPresets } from "@react-navigation/stack";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComponentsScreen from "../screens/ComponentsScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductDetail from "../screens/ProductDetail";
import SearchScreen from "../screens/SearchScreen";
import SettingScreen from "../screens/SettingScreen";
import ShopScreen from "../screens/ShopScreen";
import UserReviewsScreen from "../screens/UserReviewsScreen";
import { MainStackParamList } from "./ParmListTypes";
import * as screens from "../screens"

const Stack = createNativeStackNavigator<MainStackParamList>();

export const iosTransitionSpec: TransitionSpec = {
    animation: "spring",
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 10,
        restSpeedThreshold: 10,
    },
};

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            {/*<Stack.Screen name="Components" component={ComponentsScreen} />*/}

            <Stack.Screen name="Bag_Main" component={screens.BagScreen} />
            <Stack.Screen name="Favorite_Main" component={screens.FavoriteScreen} />

            <Stack.Screen name="Profile_Main" component={screens.ProfileScreen} />
            <Stack.Screen
                name="Profile_ShippingAddresses"
                component={screens.ShippingAddressesScreen}
            />
            <Stack.Screen name="Profile_Orders" component={OrdersScreen} />
            <Stack.Screen
                name="Profile_Order_Detail"
                component={OrderDetailScreen}
            />
            <Stack.Screen
                name="Profile_Reviews"
                component={UserReviewsScreen}
            />
            <Stack.Screen name="Profile_Settings" component={SettingScreen} />
            <Stack.Screen
                name="Profile_New_Address"
                component={screens.NewShippingAddressScreen}
            />

            <Stack.Screen name="Shop_Main" component={ShopScreen} />
            <Stack.Screen name="Shop_Search" component={SearchScreen}/>
            <Stack.Screen name="Shop_Category" component={screens.CategoryScreen}/>
            <Stack.Screen name="Shop_Product_Detail" component={ProductDetail}/> 
        </Stack.Navigator>
    );
};
export default MainStack;
