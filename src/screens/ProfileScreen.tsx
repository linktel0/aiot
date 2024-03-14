import React from "react";
import { View,Text } from "react-native";
import BottomTab from "../components/navigation/BottomTab";
import {ProfileScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { useAppSelector } from "../redux/hooks";
import { Avatar, IconButton, List } from "react-native-paper";
import { cos } from "react-native-reanimated";

export const ProfileScreen = ({ navigation, route }:ProfileScreenProps) => {

    const userItem = useAppSelector((state)=>state.user.current_user)
    const shippingAddressCount = userItem?.shipping_addresses?.length
    const ordersCount = userItem?.orders.length
    
    return (
        <View className="w-full h-full">
            <View className="w-full between-x bg-primary h-36 rounded-b-[40] pl-4"> 
                <Text className="text-white text-2xl">
                    Profile
                </Text>    
                <IconButton
                    icon="home-export-outline"
                    iconColor={'white'}
                    size={40}
                    onPress={() => navigation.navigate('Auth', {screen: 'Login'})}
                />
            </View>

            <View className="w-full center-x z-10 -mt-10" >
                <Avatar.Image 
                    size={80} 
                    source={{
                        uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    }} />   
            </View>    
            <BottomTab route_name={route.name}/>
            
            <View className="m-6">                
                <View className="my-4 rounded-xl between-x bg-primary-light px-4 py-2"
                    style={{elevation:5,shadowColor:'black',shadowRadius:20,
                    shadowOpacity:0.5,shadowOffset:{width:0,height:10}}} 
                >
                    <View>
                        <Text className="font-bold">Name</Text>
                        <Text className="opacity-40">
                            Jack
                        </Text>
                    </View>
                    <View>
                        <Text className="font-bold">Email</Text>
                        <Text className="opacity-40">
                            jack@jack.com
                        </Text>
                    </View>
                </View>
                <View className="my-3 rounded-xl between-x bg-primary-light pl-3 py-2"
                    style={{elevation:5,shadowColor:'black',shadowRadius:20,
                    shadowOpacity:0.5,shadowOffset:{width:0,height:10}}} 
                >
                    <View className="flex-row">
                        <Avatar.Icon className="bg-primary-light"
                            color={'red'}
                            size={48} icon="shopping" />
                        <View className="flex-col pl-2">
                            <Text className="font-bold">My Orders</Text>
                            <Text>{ordersCount === 0 ? "Don't have any" : `Already have ${ordersCount}`}</Text>
                        </View>
                    </View>
                    <IconButton onPress={() => navigation.navigate('Profile_Orders')} 
                        icon="chevron-right" iconColor="red" size={32}/>
                </View>

                <View className="my-3 rounded-xl between-x bg-primary-light pl-3 py-2"
                    style={{elevation:5,shadowColor:'black',shadowRadius:20,
                    shadowOpacity:0.5,shadowOffset:{width:0,height:10}}} 
                >
                    <View className="flex-row">
                        <Avatar.Icon className="bg-primary-light"
                            color={'red'}
                            size={48} icon="home" />
                        <View className="flex-col pl-2">
                            <Text className="font-bold">Shipping Addresses</Text>
                            <Text>{shippingAddressCount === 0 ? "Don't have any" : `Already have ${shippingAddressCount}`}</Text>
                        </View>
                    </View>
                    <IconButton icon="chevron-right" iconColor="red" size={32}
                        onPress={() => navigation.navigate('Profile_ShippingAddresses')}
                    />
                </View>

                <View className="my-3 rounded-xl between-x bg-primary-light pl-3 py-2"
                    style={{elevation:5,shadowColor:'black',shadowRadius:20,
                    shadowOpacity:0.5,shadowOffset:{width:0,height:10}}} 
                >
                    <View className="flex-row">
                        <Avatar.Icon className="bg-primary-light"
                            color={'red'}
                            size={48} icon="chat-processing-outline" />
                        <View className="flex-col pl-2">
                            <Text className="font-bold">Service</Text>
                            <Text>Connact to service center</Text>
                        </View>
                    </View>
                    <IconButton icon="chevron-right" iconColor="red" size={32}
                        onPress={() => console.log('hello')}
                    />
                </View>

                <View className="my-3 rounded-xl between-x bg-primary-light pl-3 py-2"
                    style={{elevation:5,shadowColor:'black',shadowRadius:20,
                    shadowOpacity:0.5,shadowOffset:{width:0,height:10}}} 
                >
                    <View className="flex-row">
                        <Avatar.Icon className="bg-primary-light"
                            color={'red'}
                            size={48} icon="cog" />
                        <View className="flex-col pl-2">
                            <Text className="font-bold">Settings</Text>
                            <Text>Password, notifications ...</Text>
                        </View>
                    </View>
                    <IconButton icon="chevron-right" iconColor="red" size={32}
                        onPress={() => navigation.navigate('Profile_Settings')}
                    />
                </View>
            </View>
        </View>
    );
};

