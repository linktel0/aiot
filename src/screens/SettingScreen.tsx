import React, { useState } from "react";
import { Dimensions, ScrollView, Switch ,View,Text,TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomTab from "../components/navigation/BottomTab";
import {Header} from "../components/navigation/Header";
import {SettingScreenProps} from "../navigation/ScreensNavigationRouteProps";

import Input from "../components/forms/form_elements/Input";


const { width, height } = Dimensions.get("screen");
const HEADER_HEIGHT = height * .12

const SettingScreen = ({ route, navigation }:SettingScreenProps) => {
    const [salesNoification, setSalesNotification] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    return (
        <View className="w-full h-full bg-primary-light px-4">
            <Header title="Settings" goBack={() => navigation.navigate("Profile_Main")}/>
            <BottomTab route_name={route.name}/>            
            <ScrollView className="flex-1 mb-12 mt-10">
                <View className="my-4">
                    <Text className="text-base font-bold">
                        Personal Informations
                    </Text>
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                </View>
                <View className="my-4">
                    <Text className="text-base font-bold">
                        Notification
                    </Text>
                    <View className="between-x">
                        <Text>Sales</Text>
                        <Switch
                            onValueChange={(value) =>
                                setSalesNotification(value)
                            }
                            value={salesNoification}
                            thumbColor={'black'}
                            trackColor={{
                                true: 'black',
                                false: 'gray',
                            }}
                        />
                    </View>
                    <View className="between-x">
                        <Text>Delivery Status Change</Text>
                        <Switch
                            onValueChange={(value) => setDeliveryStatus(value)}
                            value={deliveryStatus}
                            thumbColor={'black'}
                            trackColor={{ true: 'black', false: 'gray'}}
                        />
                    </View>
                </View>
                <View className="my-4">
                    <Text className="font-bold text-base">
                        Others
                    </Text>
                    <View className="between-x my-4">
                        <Text>Dark Mode</Text>
                        <Switch
                            onValueChange={(value) => setDarkMode(value)}
                            value={darkMode}
                            thumbColor={'black'}
                            trackColor={{ true: 'black', false: 'gray'}}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SettingScreen;
