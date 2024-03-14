import { useTheme } from "@shopify/restyle";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView,View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import OrderCard from "../components/cards/OrderCard";
import Chip from "../components/Chip";

import BottomTab from "../components/navigation/BottomTab";
import Header from "../components/navigation/Header";
import {OrdersScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { OrderStatus } from "../redux/data_types";
import { useAppSelector } from "../redux/hooks";
import  Waiting  from "../components/Waiting";

const { width, height } = Dimensions.get("screen");

const HEADER_HEIGHT = height * 0.12;

const OrdersScreen = ({ route, navigation }:OrdersScreenProps) => {
    const orders = useAppSelector((state) => state.orders.orderItems);

    const [display, setDisplay] = useState(false);

    const [selectedStatus, setSelectedStatus] =
        useState<"Processed" | "Delivered" | "Cancelled">("Processed");

    const translateX = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value) }],
    }));

    useEffect(() => {
        setDisplay(true);
    }, []);

    return (
        <View className="w-full h-full bg-primary-light">
            <Header title="Orders" goBack={() => navigation.navigate("Profile_Main")}/>
            <BottomTab route_name={route.name}/>
            <ScrollView className="flex-1 mb-12 mt-20">
                <View className="between-x">
                    <Chip
                        textProps={{
                            color:
                                selectedStatus === "Processed"
                                    ? "darkColor"
                                    : "white",
                        }}
                        margin="m"
                        bg={
                            selectedStatus === "Processed"
                                ? "white"
                                : "darkColor"
                        }
                        name="Processed"
                        borderWidth={selectedStatus === "Processed" ? 1 : 0}
                        onPress={() => {
                            setSelectedStatus("Processed");
                            translateX.value = 0;
                        }}
                    />
                    <Chip
                        textProps={{
                            color:
                                selectedStatus === "Delivered"
                                    ? "darkColor"
                                    : "white",
                        }}
                        margin="m"
                        bg={
                            selectedStatus === "Delivered"
                                ? "white"
                                : "darkColor"
                        }
                        borderWidth={selectedStatus === "Delivered" ? 1 : 0}
                        name="Delivered"
                        onPress={() => {
                            setSelectedStatus("Delivered");
                            translateX.value = -width;
                        }}
                    />
                    <Chip
                        textProps={{
                            color:
                                selectedStatus === "Cancelled"
                                    ? "darkColor"
                                    : "white",
                        }}
                        margin="m"
                        bg={
                            selectedStatus === "Cancelled"
                                ? "white"
                                : "darkColor"
                        }
                        borderWidth={selectedStatus === "Cancelled" ? 1 : 0}
                        name="cancelled"
                        onPress={() => {
                            setSelectedStatus("Cancelled");
                            translateX.value = 2 * -width;
                        }}
                    />
                </View>
                {display ? (
                    <Animated.View className="flex-1 flex-row"
                        style={animatedStyles}
                    >
                        <View className="w-full">
                            <ScrollView >
                                {orders
                                    .filter(
                                        (o) => o.status === OrderStatus.PENDING
                                    )
                                    .map((o) => (
                                        <OrderCard
                                            key={o.id}
                                            order={o}
                                            marginHorizontal="s"
                                            onDetailPress={() =>
                                                navigation.navigate(
                                                    "Profile_Order_Detail",
                                                    { order: o }
                                                )
                                            }
                                            elevation={1}
                                        />
                                    ))}
                            </ScrollView>
                        </View>
                        <View className="w-full">
                            <ScrollView >
                                {orders
                                    .filter(
                                        (o) => o.status === OrderStatus.SUCCESS
                                    )
                                    .map((o) => (
                                        <OrderCard
                                            key={o.id}
                                            order={o}
                                            marginHorizontal="s"
                                            onDetailPress={() =>
                                                navigation.navigate(
                                                    "Profile_Order_Detail",
                                                    { order: o }
                                                )
                                            }
                                            elevation={1}
                                        />
                                    ))}
                            </ScrollView>
                        </View>
                        <View className="w-full">
                            <ScrollView>
                                {orders
                                    .filter(
                                        (o) =>
                                            o.status === OrderStatus.CANCELLED
                                    )
                                    .map((o) => (
                                        <OrderCard
                                            key={o.id}
                                            order={o}
                                            marginHorizontal="s"
                                            onDetailPress={() =>
                                                navigation.navigate(
                                                    "Profile_Order_Detail",
                                                    { order: o }
                                                )
                                            }
                                            elevation={1}
                                        />
                                    ))}
                            </ScrollView>
                        </View>
                    </Animated.View>
                ) : (
                    <View className="center-x w-full h-full">
                        <Waiting/>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default OrdersScreen;
