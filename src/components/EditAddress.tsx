import React, { useState } from "react";
import { View, Text, TextInput} from "react-native";
import { Button } from "react-native-paper";
import { TAddress } from "../redux/data_types";
import { addShippingAddress, editShippingAddress } from "../redux/user";
import { useAppDispatch } from "../redux/hooks";

interface EditAddressProps  {
    newAddress?:TAddress
    onClose():void
}

export const EditAddress = ({
    newAddress,
    onClose
}:EditAddressProps) => {
    const dispatch = useAppDispatch()
    const [fullName, setFullName] = useState(newAddress ? newAddress.full_name :"");
    const [address, setAddress] = useState(newAddress ? newAddress.address : "");
    const [city, setCity] = useState( newAddress ? newAddress.city :"");
    const [state, setState] = useState(newAddress ? newAddress.state : "");
    const [zipCode, setZipCode] = useState(newAddress ? newAddress.zip_code : "");
    const [country, setCountry] = useState(newAddress ? newAddress.country : "");
   
    const handleSubmit = () => {
        if(fullName.length===0) return
        if(newAddress) {
            dispatch(editShippingAddress({
                id: newAddress.id,
                address,
                city,
                country,
                state,
                full_name: fullName,
                zip_code: +zipCode,
                is_default: newAddress.is_default
            }))
        }else {
            dispatch(addShippingAddress({
                id: 1,
                address,
                city,
                country,
                state,
                full_name: fullName,
                zip_code: +zipCode,
                is_default: false
            }))
        }
    }
    return (
        <View className="w-full h-full bg-primary-light">
            <Text className="text-lg mx-4">New Address</Text>
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
                    onPress={()=>{
                        handleSubmit()
                        onClose()
                    }}
                    >
                    SAVE
                </Button>
            </View>
            
        </View>
    );
};


