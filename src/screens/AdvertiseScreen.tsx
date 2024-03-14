import React, { useEffect } from "react";
import {View,Text,Dimensions, TouchableOpacity} from "react-native";
import {Avatar} from 'react-native-paper'
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import {AdvertiseScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from 'react-redux'

import  Waiting  from "../components/Waiting";
import AdvertiseImage from "../components/reanimoted/AdvertiseImage";
import AdvertiseIndex from "../components/reanimoted/AdvertiseIndex";

import * as bag from "../redux/bag";
import * as favorite from "../redux/favorite";
import * as advertise from "../redux/advertise";
import * as display from "../redux/display";
import * as category from "../redux/category"
import * as subCategory from "../redux/subcategory"
import * as user from "../redux/user"


const { width} = Dimensions.get("screen");
export const AdvertiseScreen = ({
    navigation,
    route,
}:AdvertiseScreenProps) => {
    const dispatch = useDispatch<any>();
    const advertiseState = useAppSelector((state) => (state.advertise));
    const advertises = useAppSelector((state) => advertise.selectAll(state.advertise.advertises));
    
    const bagState = useAppSelector((state) => (state.bag));
    const favoriteState = useAppSelector((state) => (state.favorite));
    const displayState = useAppSelector((state) => (state.display));
    const categoryState = useAppSelector((state) => (state.category));
    const subCategoryState = useAppSelector((state) => (state.subCategory));
    const userState = useAppSelector((state) => (state.user));
    
    const translationX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translationX.value = event.contentOffset.x;
        },
        onBeginDrag: (e) => {},
        onEndDrag: (e) => {},
    });

    useEffect(() => {
        if (!advertiseState.loading){
            dispatch(advertise.fetch());
        }
        if (!categoryState.loading){
            dispatch(category.fetch());
        }        
        if (!displayState.loading){
            dispatch(display.fetch());
        }
        if (!subCategoryState.loading){
            dispatch(subCategory.fetch());
        }
        if (!favoriteState.loading){
            dispatch(favorite.fetch());
        }
        if (!bagState.loading){
            dispatch(bag.fetch());
        }
        if (!userState.loading){
            dispatch(user.fetch(2));
        }
    }, [dispatch]);

    const onHome = () =>{
        if (categoryState.error){
            console.log('category0');
            dispatch(category.fetch());
        }        
        if (displayState.error){
            console.log('display0');
            dispatch(display.fetch());
        }
        if (subCategoryState.error){
            console.log('subCategory0');
            dispatch(subCategory.fetch());
        }
        if (advertiseState.error){
            console.log('advertise0');
            dispatch(advertise.fetch());
        }
        if (favoriteState.error){
            console.log('favorite0');
            dispatch(favorite.fetch());
        }
        if (bagState.error){
            console.log('bag0');
            dispatch(bag.fetch());
        }
        if ((categoryState.error || displayState.error || subCategoryState.error 
            || advertiseState.error ||favoriteState.error || bagState.error)) 
            {
                navigation.navigate("Main", { screen: "Home" })
            }
    }
  
    
    return (
        advertises.length === 0
        ?<View className="w-full h-full center-x"><Waiting/></View>
        :<View className="h-full w-full center-y">
            <TouchableOpacity className="absolute bottom-5 right-5 z-10"
                disabled = {displayState.loading && categoryState.loading && subCategoryState.loading
                            && advertiseState.loading && favoriteState.loading && bagState.loading}
                onPress={() => onHome()}
            >
                <Avatar.Icon size={48} icon="check" className="bg-primary"/>
            </TouchableOpacity>
            <Animated.ScrollView 
                style={[{ flex: 1, backgroundColor: 'white' }]}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                horizontal
                decelerationRate="fast"
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
            >
                {advertises.map((advertise, index) => (
                    <AdvertiseImage key={index}
                        translationX ={translationX}
                        advertise = {advertise}
                        index = {index}
                    />
                ))}
            </Animated.ScrollView>
            <View className="absolute p-1 mb-5 center-x bottom-0 w-full">
                {advertises.map((advertise, index) => (
                    <AdvertiseIndex key={index}
                        index={index} translationX={translationX} 
                    />
                ))}
            </View>
        </View> 
    );
};

