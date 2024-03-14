import React, { useEffect, useState } from "react";
import { Dimensions, View,Text, ScrollView } from "react-native";
import BottomTab from "../components/navigation/BottomTab";
import Header from "../components/navigation/Header";
import {FavoriteScreenProps} from "../navigation/ScreensNavigationRouteProps";
import FavoriteCard from "../components/cards/FavoriteCard";
import * as favorite from "../redux/favorite";
import Animated, { SlideInLeft,SlideOutRight,Layout, ZoomOut, PinwheelOut, FadeOut, FadeIn, SlideOutUp } from "react-native-reanimated";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from 'react-redux'
import { TFavorite } from "../redux/data_types";
import { useIsFocused } from "@react-navigation/native";

interface Item {
    id:number
}

export const FavoriteScreen = ({
    navigation,
    route,
}:FavoriteScreenProps) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [items,setItems] = useState<Item[]>(new Array(8).fill(0).map((_,index)=>({id:index})));
    const favorites = useAppSelector((state) => favorite.selectAll(state.favorite.favorites));

    useEffect(()=>{
        setItems(favorites)
    },[])

    //dispatch(favorite.put(favorites));
 
    const onDeletePress = (id:number) =>{
        //console.log(id)
        setItems((currentItems) => {return currentItems.filter(item=>item.id!==id)})
        //setItems(items.filter(item=>item.id!==id))
        dispatch(
            favorite.removeOne(id)
        )
    }
    return (
        <View className='w-full h-full'>           
            <Header title="Favorites" goBack={() => navigation.navigate("Profile_Main")}/>
            <BottomTab route_name={route.name} />
           
            <ScrollView className="flex-1 mb-14">           
                {items.map((item,index)=>{
                    return(
                    <Animated.View key={index}
                        entering={SlideInLeft.delay(index*150)}
                        exiting={SlideOutRight.delay(500)}
                        //onTouchEnd={()=>onDeletePress(item.id)}
                        //layout = {Layout.delay(500)}
                    >                     
                      {/* <View className="h-16 w-200 bg-gray m-2 center-y"><Text>{item.id}</Text></View> */}
                        <FavoriteCard
                            id = {item.id}
                            onDeletePress = {onDeletePress}
                        />  
                    </Animated.View>
                )})}
            </ScrollView>
        </View>
    );
};

