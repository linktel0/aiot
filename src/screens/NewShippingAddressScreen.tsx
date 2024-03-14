import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView ,TextInput} from "react-native";
import BottomTab from "../components/navigation/BottomTab";
import Header from "../components/navigation/Header";
import {NewShippingAddressScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { useAppDispatch } from "../redux/hooks";
import { addShippingAddress, editShippingAddress } from "../redux/user";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

export const NewShippingAddressScreen = ({
    navigation,
    route,
}:NewShippingAddressScreenProps) => {
    const { shipping_address } = route.params
    const dispatch = useAppDispatch()

    const [fullName, setFullName] = useState(shipping_address ? shipping_address.full_name :"");
    const [address, setAddress] = useState(shipping_address ? shipping_address.address : "");
    const [city, setCity] = useState( shipping_address ? shipping_address.city :"");
    const [state, setState] = useState(shipping_address ? shipping_address.state : "");
    const [zipCode, setZipCode] = useState(shipping_address ? shipping_address.zip_code : "");
    const [country, setCountry] = useState(shipping_address ? shipping_address.country : "");
   
    const handleSubmit = () => {
        if(shipping_address) {
            dispatch(editShippingAddress({
                id: shipping_address.id,
                address,
                city,
                country,
                state,
                full_name: fullName,
                zip_code: +zipCode,
                is_default: shipping_address.is_default
            }))
            navigation.navigate('Profile_ShippingAddresses')
        }else {
            dispatch(addShippingAddress({
                id: Math.floor(Math.random() * 100) ,
                address,
                city,
                country,
                state,
                full_name: fullName,
                zip_code: +zipCode,
                is_default: false
            }))
            navigation.navigate('Profile_ShippingAddresses')
        }
    }
    return (
        <View className="w-full h-full bg-primary-light">
            <Header title="Shipping Addresses" goBack={()=>navigation.goBack()}/>
            <BottomTab route_name={route.name}/>
            <Text className="text-lg mx-4 mt-12">New Address</Text>
            <ScrollView className="flex-1">
               <TextInput className="mx-4 border-primary border rounded-xl p-[10] mb-6"
                    placeholder="Full Name"
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                />

                <TextInput className="mx-4 border-primary border rounded-xl p-[10] mb-6"
                    placeholder="Address"
                    onChangeText={text => setAddress(text)}
                    value={address}
                />
                 
                <TextInput className="mx-4 border-primary border rounded-xl p-[10] mb-6"
                    placeholder="City"
                    onChangeText={text => setCity(text)}
                    value={city}
                />

                <TextInput className="mx-4 border-primary border rounded-xl p-[10] mb-6"
                    placeholder="State"
                    onChangeText={text => setState(text)}
                    value={state}
                />

                <TextInput className="mx-4 border-primary border rounded-xl p-[10] mb-8"
                    placeholder="Zip Code"
                    keyboardType= 'numeric'
                    onChangeText={text => setZipCode(text)}
                    value={zipCode.toString()}
                />

                <TextInput className="mx-4 border-primary border rounded-xl p-[10] mb-6"
                    placeholder="Country"
                    onChangeText={text => setCountry(text)}
                    value={country}
                />
                
                <View >
                    <Button className="bg-primary mx-4 my-8 rounded-full p-1"
                        textColor="white"
                        onPress={handleSubmit}
                        >
                        SAVE
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};


