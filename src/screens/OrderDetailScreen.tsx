import React from "react";
import { Dimensions, Image, View,Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import BottomTab from "../components/navigation/BottomTab";
import Header from "../components/navigation/Header";
import {OrderDetailScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { OrderStatus } from "../redux/data_types";
import { useAppSelector } from "../redux/hooks";

const { width, height } = Dimensions.get("screen");
const HEADER_HEIGHT = height * 0.12;

const OrderDetailScreen = ({
    navigation,
    route,
}:OrderDetailScreenProps) => {
    const defaultShippingAddress = useAppSelector(
        (state) => state.user.current_user?.shipping_addresses
    )?.find((s) => s.is_default);

    return (
        <View className="w-full h-full bg-primary-light">
            <Header title="Order Detail" goBack={() => navigation.navigate("Profile_Main")}/>
            <BottomTab route_name={route.name} />
            <ScrollView className="flex-1 mb-12 mt-20">
                <View className="m-4 bg-primary-light p-2 rounded-xl" >
                    <View className="between-x mb-4">
                        <View className="center-x">
                            <Text className="opacity-50">
                                {`Tracking N: `}
                            </Text>
                            <Text className="opacity-50">
                                {route.params.order.tracking_number}
                            </Text>
                        </View>
                        <Text className="opacity-70 font-bold">
                            {route.params.order.date}
                        </Text>
                    </View> 
                    <View className="between-x mb-4">
                        <Text className="opacity-50">
                            Status:
                        </Text>
                        <Text className={`opacity-70 font-bold
                            ${route.params.order.status === OrderStatus.SUCCESS
                                ? "text-success"
                                : route.params.order.status === OrderStatus.PENDING
                                ? "text-darkColor"
                                : "text-error"
                            }`}
                        >
                            {route.params.order.status}
                        </Text>
                    </View>
                </View>
                <View className="my-4">
                    <Text className="text-xl opacity-70 m-4">
                        Items
                    </Text>
                    {route.params.order.order_items.map((o) => (
                        <View key={o.product.id}
                            className="flex-row bg-primary-light overflow-hidden m-4 rounded-xl"
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Shop_Product_Detail", {
                                        item: o.product,
                                    })
                                }
                            >
                                {/*<SharedElement id={`image-${o.product.id}`}>*/}
                                    <Image
                                        style={{ width: 80, height: 80 }}
                                        resizeMode="cover"
                                        source={{uri: o.product.thumbnail! }}
                                    />

                            </TouchableOpacity>
                            <View className="px-2">
                                <View className="w-4/5">
                                    <Text className="font-bold">
                                        {o.product.display_name}
                                    </Text>
                                </View>
                                <View className="between-x">
                                    <View className="flex-row">
                                        <Text className="opacity-50">颜色: </Text>
                                        <Text style={{color:o.color.toLowerCase()}}
                                        >{o.color}</Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text className="opacity-50">尺寸: </Text>
                                        <Text>{o.size}</Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text className="opacity-50">数量: </Text>
                                        <Text>{o.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <View className="my-4">
                    <Text className="text-xl opacity-70 m-4">
                        Order Info
                    </Text>
                    <View className="p-2 m-4 rounded-xl bg-primary-light">
                        <View className="flex-row justify-between mb-4">
                            <View className="flex-1">
                                <Text className="opacity-50">Shipping Address: </Text>
                            </View>
                            <View className="flex-1">
                                <Text>{`${defaultShippingAddress?.address}, ${defaultShippingAddress?.city}, ${defaultShippingAddress?.state} ${defaultShippingAddress?.zip_code}, ${defaultShippingAddress?.country}`}</Text>
                            </View>
                        </View>
                        <View className="between-x mb-4">
                            <View className="flex-1">
                                <Text className="opacity-50">Total: </Text>
                            </View>
                            <View className="flex-1">
                                <Text>￥{route.params.order.total_amount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default OrderDetailScreen;
