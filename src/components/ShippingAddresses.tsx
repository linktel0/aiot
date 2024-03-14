import React, { useEffect, useState } from "react";
import { ScrollView,View,Text, Dimensions } from "react-native";
import Header from "../components/navigation/Header";
import ShippingAddressCard from "../components/cards/ShippingAddressCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeShippingAddress, setDefaultAddress } from "../redux/user";
import Animated, { Easing, SlideInLeft, SlideOutRight, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { TAddress } from "../redux/data_types";
import { useNavigation } from "@react-navigation/native";
import { EditAddress } from "./EditAddress";

interface ShippingAddressProps {
    onCheckBoxChange?(address: TAddress): void
}

const { width, height } = Dimensions.get("screen");
const ShippingAddress = ({
    onCheckBoxChange,
}:ShippingAddressProps) => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const shippingAddresses = useAppSelector(
        (state) => state.user.current_user?.shipping_addresses
    );

    const [show, setShow] = useState(false);
    const [address,setAddress] = useState<TAddress>();

    useEffect(()=>{
        if (!shippingAddresses?.length) {
            setShow(true)
        }
    },[])

    return (
        <View className="w-full h-full bg-primary-light">
            {show &&
                <View>
                    <View className="flex-row items-center mb-2">
                        <IconButton
                            icon="arrow-left-thin"
                            size={40}
                            onPress={() => setShow(false)}
                        />  
                        <Text className="text-lg">New Address</Text>
                    </View>

                    <EditAddress 
                        newAddress = {address}
                        onClose={()=>{setShow(false)}}
                    />
                </View>
            }

            {!show && 
            <View>
                <View className="between-x ml-6 mr-2 mt-8">
                    <Text className="text-base font-bold opacity-60">Shipping adresses</Text>
                    <IconButton
                        icon="plus"
                        size={32}
                        onPress={() => setShow(true)} 
                    />
                </View>
                
                {shippingAddresses && shippingAddresses.map((item,index)=>{
                    return(
                        <Animated.View key={index}
                            entering={SlideInLeft.delay(index*150)}
                            exiting={SlideOutRight.delay(index*150)}
                        >                     
                            <ShippingAddressCard
                                address={item}
                                inCheckout={onCheckBoxChange?true:false}
                                onCheckBoxChange={() => {
                                    onCheckBoxChange
                                    ?onCheckBoxChange(item)
                                    :dispatch(
                                        setDefaultAddress(item.id)
                                    )
                                }}
                                onEditPress={() =>{
                                    setAddress(item);
                                    setShow(true)
                                }}
                                onDeletePress={() =>
                                    dispatch(
                                        removeShippingAddress(item.id)
                                    )
                                }
                            />
                        </Animated.View>
                    )})}
            </View> }
        </View>
    );
};

export default ShippingAddress

