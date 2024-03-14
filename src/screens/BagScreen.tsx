import React, { useEffect, useState } from "react";
import {  Dimensions, ScrollView,View,Text } from "react-native";
import BagCard from "../components/cards/BagCard";
import CheckOut from "../components/cards/CheckOut";
import BottomTab from "../components/navigation/BottomTab";
import Header from "../components/navigation/Header";
import {BagScreenProps} from "../navigation/ScreensNavigationRouteProps";

import Animated, {
    Extrapolate,
    Layout,
    SlideInLeft,
    SlideOutRight,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import {Avatar, Button, IconButton} from 'react-native-paper'
import { useAppSelector } from "../redux/hooks";
import * as bag from "../redux/bag"
//import * as user from "../redux/user"
import {TItem,TAddress} from "../redux/data_types"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";
import ShippingAddressCard from "../components/cards/ShippingAddressCard";
import ShippingAddress from "../components/ShippingAddresses";

const { width, height } = Dimensions.get("screen");
const HEADER_HEIGHT = height * 0.12;


export const BagScreen = ({ navigation, route }:BagScreenProps) => {
    const [prices, setPrices] = useState(new Map());
    const [total, setTotal] = useState(0);
    const [address,setAddress] = useState<TAddress>();
    const [show,setShow] = useState(false)

    const bagItems = useAppSelector((state) => bag.selectAll(state.bag.bagItems));
    const userItem = useAppSelector((state)=>state.user.current_user)
    const headerTranslateY = useSharedValue(0);
    const checkoutTranslateY = useSharedValue(height);
    
    useEffect(()=>{
        const defaultshippingAddress = userItem?.shipping_addresses.find((add) => add.is_default);
        if (defaultshippingAddress) setAddress(defaultshippingAddress)
    },[])
    
    const styles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(checkoutTranslateY.value) }],
    }));

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startY: number }
    >({
        onStart: (_, ctx) => {
            ctx.startY = checkoutTranslateY.value;
        },
        onActive: (event, ctx) => {
            checkoutTranslateY.value = ctx.startY + event.translationY;
            headerTranslateY.value = interpolate(
                checkoutTranslateY.value,
                [0, HEADER_HEIGHT],
                [-HEADER_HEIGHT, 0],
                Extrapolate.CLAMP
            );
        },
        onEnd: (e) => {
            checkoutTranslateY.value = snapPoint(checkoutTranslateY.value, e.velocityY, [
                0,
                height,
            ]);
            headerTranslateY.value = interpolate(
                checkoutTranslateY.value,
                [HEADER_HEIGHT, 0],
                [0, -HEADER_HEIGHT],
                Extrapolate.CLAMP
            );
        },
    });

    const updatePrice = (item:TItem) =>{
        let sum = 0
        setPrices(prices.set(item.id,item.value))
        prices.forEach(item => sum += item)
        setTotal(sum)
    }

    return (
        <View className="w-full h-full">
            <Header title='购物车' goBack={()=>navigation.goBack()}/>
            <BottomTab route_name={route.name}/>
            <Animated.View className="bg-primary-light absolute z-10 w-full mt-8"
                style={[{height:height},styles]}
            >
                
                <View className="between-x mx-4">
                    <View className="flex-row items-center">
                        <IconButton
                            icon="arrow-left-thin"
                            size={40}
                            onPress={() => {
                                headerTranslateY.value= 0
                                checkoutTranslateY.value = height
                                setShow(false)
                            }}
                        />  
                        <Text className="text-lg">Check out</Text>
                    </View>

                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Animated.View >
                            <Avatar.Image className="bg-primary-light"
                                size={36} source={require('../../assets/shopping-cart.png')} />
                        </Animated.View>
                    </PanGestureHandler>
                </View>

                <ScrollView className="flex-1 px-4"
                    showsVerticalScrollIndicator ={false}
                >                    
                    
                    {show && <ShippingAddress
                        onCheckBoxChange={(item)=>{setAddress(item);setShow(false)}}
                    />}                     
                    <View className="between-x">
                        <Text className="text-base opacity-60">
                            Shipping Address
                        </Text>
                        {!address && <IconButton
                            icon="plus"
                            size={32}
                            onPress={() => setShow(true)}
                        />}
                    </View> 

                    {address && (
                        <ShippingAddressCard
                            address={address}
                            onEditPress={() => setShow(true)}
                        />
                    )}
                    <Text className="text-base opacity-60 mb-4 mt-8">
                        Items
                    </Text>
                    {bagItems.map((item,index)=>{
                        return(
                        <Animated.View key={index}
                            entering={SlideInLeft.delay(index*150)}
                            exiting={SlideOutRight.delay(500)}
                            //onTouchEnd={()=>onDeletePress(item.id)}
                            //layout = {Layout.delay(500)}
                        >                     
                            <CheckOut
                                id = {item.id}
                                updatePrice = {updatePrice}
                            />  
                        </Animated.View>
                    )})}
                    <Text className="text-base opacity-60 mt-8">
                        Order Info
                    </Text>
                    <View className="m-2 bg-primary-light rounded-2xl p-4" 
                        style={{elevation:2,shadowColor:'black',shadowRadius:20,
                        shadowOpacity:0.5,shadowOffset:{width:0,height:10}}}>  
                        <View className="between-x py-1">
                            <Text className="opacity-70">
                                Order
                            </Text>
                            <Text className="opacity-70">￥{total.toFixed(2)}</Text>
                        </View>
                        <View className="between-x py-1">
                            <Text className="opacity-70">
                                Shipping fee
                            </Text>
                            <Text className="opacity-70">￥7.00</Text>
                        </View>
                        <View className="between-x py-1">
                            <Text  className="opacity-70">
                                Summary
                            </Text>
                            <Text className="opacity-70">￥{(7 + total).toFixed(2)}</Text>
                        </View>
                    </View>
                    <Button className="bg-primary mx-4 mt-8 mb-32 rounded-full p-1"
                        textColor="white"
                        onPress={() => {
                            /*dispatch(emptyBag())
                            dispatch(addOrder({
                                id: Math.floor(Math.random() * 10),
                                date: setDate(new Date()),
                                status: OrderStatus.PENDING,
                                order_items: bagItems,
                                tracking_number: `IW${Math.floor(Math.random()*100000) }`,
                                total_amount: total,
                                user: 1 
                            }))*/
                            headerTranslateY.value= 0
                            checkoutTranslateY.value = height
                        }}
                    >
                        SUBMIT ORDER
                    </Button>
                </ScrollView>
            </Animated.View>
            <ScrollView className="flex-1 mb-14"
                showsVerticalScrollIndicator ={false}
            >

                {bagItems.map((item,index)=>{
                    return(
                    <Animated.View key={index}
                        entering={SlideInLeft.delay(index*150)}
                        exiting={SlideOutRight.delay(500)}
                        //onTouchEnd={()=>onDeletePress(item.id)}
                        //layout = {Layout.delay(500)}
                    >                     
                        <BagCard
                            id = {item.id}
                            updatePrice = {updatePrice}
                        />  
                    </Animated.View>
                )})}

                {bagItems && bagItems.length > 0 && (
                    <>
                        <View className="between-x px-4 bg-gray-darker py-2">
                            <Text className="text-base font-bold">Total</Text>
                            <Text className="text-base font-bold">￥{total.toFixed(2)}</Text>
                        </View>
                        <Button className="bg-primary mx-4 mt-8 mb-12 rounded-full p-1"
                            textColor="white"
                            onPress={() => {
                                headerTranslateY.value = -HEADER_HEIGHT;
                                checkoutTranslateY.value = 0;
                            }}
                            >
                            CHECKOUT
                        </Button>
                    </>
                        )}
            </ScrollView>
        </View>
    );
};


