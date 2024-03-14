import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {IconButton} from 'react-native-paper'

interface BottomTabProps {
    route_name: string;
}

const BottomTab = ({ route_name}:BottomTabProps) => {
    const navigation = useNavigation<any>();
    return (
        <View className="w-full evenly-x absolute bottom-0 z-10 bg-primary-light">
            <IconButton size={24} icon="home" 
                onPress={() => navigation.navigate('Home')}
                iconColor={route_name.startsWith("Home")? 'red': 'gray'}            
            />
            <IconButton size={24} icon="cart-variant" 
                onPress={() => navigation.navigate('Shop_Main')}
                iconColor={route_name.startsWith("Shop_Main")? 'red': 'gray'}            
            />
                
            <IconButton size={24} icon="shopping" 
                onPress={() => navigation.navigate('Bag_Main')}
                iconColor={route_name.startsWith("Bag")? 'red': 'gray'}            
            />
            
            <IconButton size={24} icon="heart" 
                onPress={() => navigation.navigate('Favorite_Main')}
                iconColor={route_name.startsWith("Favorite")? 'red': 'gray'}            
            />
            
           <IconButton size={30} icon="account-details" 
                onPress={() => navigation.navigate('Profile_Main')}
                iconColor={route_name.startsWith("Profile")? 'red': 'gray'}            
            />
        </View>
    );
};

export default BottomTab;
