import React, { useState } from "react";
import { ScrollView,View,Text, Dimensions } from "react-native";
import BottomTab from "../components/navigation/BottomTab";
import {ShippingAddressesScreenProps} from "../navigation/ScreensNavigationRouteProps";
import Header from "../components/navigation/Header";
import ShippingAddressCard from "../components/cards/ShippingAddressCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeShippingAddress, setDefaultAddress } from "../redux/user";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { EditAddress } from "../components/EditAddress";
import { TAddress } from "../redux/data_types";
import ShippingAddress from "../components/ShippingAddresses";


export const ShippingAddressesScreen = ({
    route,
    navigation,
}:ShippingAddressesScreenProps) => {
    const [show,setShow] = useState(false);
    const [address,SetAddress] = useState<TAddress>();
    const dispatch = useAppDispatch();
    const shippingAddresses = useAppSelector(
        (state) => state.user.current_user?.shipping_addresses
    );

    const onNewAddress = () =>{
        setShow(false)
        SetAddress(undefined);
    }
    return (
        <View className="w-full h-full bg-primary-light pt-5">
            {!show &&<Header title="Shipping Addresses" goBack={() => navigation.navigate("Profile_Main")}/>}
            <BottomTab route_name={route.name}/>
            <ScrollView className="flex-1">
                <View className="mb-16">
                    <ShippingAddress/>
                </View>
            </ScrollView>
        </View>
    );
};


