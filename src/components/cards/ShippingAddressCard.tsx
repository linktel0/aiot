import React from "react";
import { TouchableOpacity,View,Text } from "react-native";
import Checkbox from 'react-native-bouncy-checkbox'
import { TAddress } from "../../redux/data_types";
import { IconButton } from "react-native-paper";

interface ShippingAddressCardProps {
    address: TAddress
    inCheckout?: boolean
    onCheckBoxChange?(): void
    onEditPress(): void;
    onDeletePress?(): void
}

const ShippingAddressCard = ({
    address,
    inCheckout,
    onEditPress,
    onCheckBoxChange,
    onDeletePress,
}:ShippingAddressCardProps) => {
   
    return (
        <View className="bg-primary-light rounded-xl p-2 m-2"
            style={{elevation:5,shadowColor:'black',shadowRadius:20,
            shadowOpacity:0.5,shadowOffset:{width:0,height:10}}}        
        >
            <View className="between-x mb-2" >
                <Text className="font-bold text-base">{address.full_name}</Text>
                {inCheckout === undefined
                    ? <TouchableOpacity onPress={onEditPress} >
                        <Text className="text-primary">Change</Text>
                    </TouchableOpacity> 
                    : <IconButton icon="close" iconColor={"red"} size={16}
                        onPress={onDeletePress}
                    />}
            </View>
            <View>
                <Text className="text-sm  opacity-60" > {`${address.address}, ${address.city}, ${address.state} ${address.zip_code}, ${address.country}`}</Text>
            </View>
            {inCheckout != undefined && <View className="between-x" >
                <View className="center-x">
                   <Checkbox
                        disableBuiltInState
                        fillColor={'red'}
                        unfillColor={'white'}
                        onPress={onCheckBoxChange}
                        iconStyle={{borderColor: 'gray'}}
                        isChecked={inCheckout?false:address.is_default} 
                    />
                    <Text className="opacipy-60">{inCheckout?"Select":"Default Address"}</Text>
                </View>
                <TouchableOpacity onPress={onEditPress} >
                    <Text className="text-primary text-base">
                         Edit
                    </Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
};

export default ShippingAddressCard;
