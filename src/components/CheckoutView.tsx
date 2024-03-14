import React from "react";
import { Dimensions, View,Text } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    ScrollView,
    TouchableOpacity,
} from "react-native-gesture-handler";

import Constants from "expo-constants";
import { snapPoint } from "react-native-redash";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ShippingAddressCard from "./cards/ShippingAddressCard";
import { BagItem, emptyBag } from "../redux/bag";
import { addOrder } from "../redux/order/orderSlice";
import { OrderStatus } from "../redux/data_types";
import { useNavigation } from "@react-navigation/core";

interface CheckoutViewProps {
    translateY: Animated.SharedValue<number>;
    headerTranslateY: Animated.SharedValue<number>;
    headerHeight: number;
    total: number;
    bagItems: BagItem[];
}

const { width, height } = Dimensions.get('screen')

const CheckoutView = ({
    translateY,
    headerTranslateY,
    headerHeight,
    total,
    bagItems,
}:CheckoutViewProps) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>();
    const defaultshippingAddress = useAppSelector(
        (state) => state.user.current_user?.shipping_addresses
    )?.find((add) => add.is_default);

    const styles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value) }],
    }));

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startY: number }
    >({
        onStart: (_, ctx) => {
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateY.value = ctx.startY + event.translationY;
            headerTranslateY.value = interpolate(
                translateY.value,
                [0, headerHeight],
                [-headerHeight, 0],
                Extrapolate.CLAMP
            );
        },
        onEnd: (e) => {
            translateY.value = snapPoint(translateY.value, e.velocityY, [
                0,
                height,
            ]);
            headerTranslateY.value = interpolate(
                translateY.value,
                [headerHeight, 0],
                [0, -headerHeight],
                Extrapolate.CLAMP
            );
        },
    });

    return (
        <Animated.View className="bg-primary-light absolute z-10 w-full"
            style={[{height:height},styles]}
        >

            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View className="w-full flex-row justify-end pr-4"
                    style={{top:Constants.statusBarHeight + 10}}
                >
                    <View className="bg-secondary w-[30] h-[30] rounded-full"/>
                </Animated.View>
            </PanGestureHandler>

           <ScrollView showsVerticalScrollIndicator ={false}
                className="flex-1 mt-20 mb-16 mx-4">
                <View >
                    <Text className="txet-base opacity-80">
                        收货地址
                    </Text>
                    {defaultshippingAddress && (
                        <ShippingAddressCard
                            elevation={1}
                            marginHorizontal="m"
                            onCheckBoxChange={() => {}}
                            in_checkout
                            address={defaultshippingAddress}
                            onEditPress={() => {}}
                        />
                    )}
                </View>
                <View>
                    <Text className="txet-base my-2 opacity-80">
                        商 品
                    </Text>
                    <View className="my-4">
                        {bagItems.map((b) => (
                            <View key={b.product.id}
                                className="flex-row rounded-xl overflow-hidden pb-4"
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            "Shop_Product_Detail",
                                            { item: b.product }
                                        )
                                    }
                                >
                                    <Animated.Image
                                        style={{ width: 80, height: 80 }}
                                        resizeMode="cover"
                                        source={{uri: b.product.thumbnail!}}
                                    />
                                </TouchableOpacity>
                                <View className="w-4/5 px-2">
                                    <Text className="font-bold">
                                        {b.product.display_name}
                                    </Text>
                                    <View className="between-x">
                                        <View className="flex-row">
                                            <Text className="opacity-50">颜色: </Text>
                                            <Text style={{color:b.color.toLowerCase()}}
                                            >{b.color}</Text>
                                        </View>
                                        <View className="flex-row">
                                            <Text className="opacity-50">尺寸: </Text>
                                            <Text>{b.size}</Text>
                                        </View>
                                        <View className="flex-row">
                                            <Text className="opacity-50">数量: </Text>
                                            <Text>{b.quantity}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                {/*<View className="bg-primary-light">
                    <Text className="text-base opacity-80">                    
                        订单信息
                    </Text>
                    <View className="mx-4">
                        <View className="between-x mt-4">
                            <Text className="opacity-70">订 单</Text>
                            <Text className="opacity-70">￥{total}</Text>
                        </View>
                        <View className="between-x">
                            <Text className="opacity-70">运 费</Text>
                            <Text className="opacity-70">￥{7}</Text>
                        </View>
                        <View className="between-x">
                            <Text className="opacity-70">总 额</Text>
                            <Text className="opacity-70">￥{(7 + total).toFixed(2)} </Text>
                        </View>
                    </View>
                </View>
                <View className="py-4">
                    <TouchableOpacity className="bg-primary/70 rounded-full items-center p-2"
                        onPress={() => {
                            dispatch(emptyBag())
                            dispatch(addOrder({
                                id: Math.floor(Math.random() * 10),
                                date: setDate(new Date()),
                                status: OrderStatus.PENDING,
                                order_items: bagItems,
                                tracking_number: `IW${Math.floor(Math.random()*100000) }`,
                                total_amount: total,
                                user: 1 
                            }))
                            headerTranslateY.value= 0
                            translateY.value = height
                        }}
                    >
                        <Text className="text-primary-light text-lg">确  认</Text>
                    </TouchableOpacity>
                </View>*/}
            </ScrollView>
        </Animated.View>
    );
};

const setDate =(date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

export default CheckoutView;
