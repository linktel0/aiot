import React, { useEffect } from "react";
import {View,Dimensions, TouchableOpacity} from "react-native";
import {Avatar} from 'react-native-paper'
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import {OnBoardingScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from 'react-redux'
import { fetchAdvertises } from "../redux/advertise";
import { Waiting } from "../components/Waiting";
import AdvertiseImage from "../components/reanimoted/AdvertiseImage";
import AdvertiseIndex from "../components/reanimoted/AdvertiseIndex";


const { width} = Dimensions.get("screen");
export const OnBoardingScreen = ({
    navigation,
    route,
}:OnBoardingScreenProps) => {
    const dispatch = useDispatch();
    const advertises = useAppSelector((state) => state.advertises.advertises);
    const translationX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translationX.value = event.contentOffset.x;
        },
        onBeginDrag: (e) => {},
        onEndDrag: (e) => {},
    });

    useEffect(() => {
       dispatch(fetchAdvertises());
    }, [dispatch]);

    return (
        advertises.length === 0
        ?<View className="w-full h-full center-x"><Waiting/></View>
        :<View className="h-full w-full center-y">
            <TouchableOpacity className="absolute bottom-5 right-5 z-10"
                onPress={() =>
                    //navigation.navigate("Auth", { screen: "Login" })
                    navigation.navigate("Main", { screen: "Home" })
                }
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

