import React from 'react';
import {Text,Dimensions} from 'react-native';
import Animated, {
    Extrapolate,
    useAnimatedStyle,
    useDerivedValue,
    interpolate,
    SharedValue,
} from "react-native-reanimated";

import { TAdvertise } from '../../redux/data_types';

const { width} = Dimensions.get("screen");

interface Props {
    translationX:SharedValue<number>;
    advertise: TAdvertise;
    index: number;
}

const AdvertiseImage = ({translationX,advertise,index}:Props) => { 
    const scale = useDerivedValue(() => {
        return interpolate(
            translationX.value,
            [
                width * (index - 1),
                width * index,
                width * (index + 1),
            ],
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
        );
    });

    const imageTranslateX = useDerivedValue(() => {
        return interpolate(
            translationX.value,
            [
                width * (index - 1),
                width * index,
                width * (index + 1),
            ],
            [-width, 0, width],
            Extrapolate.CLAMP
        );
    });
    const imageTranslateY = useDerivedValue(() => {
        return interpolate(
            translationX.value,
            [
                width * (index - 1),
                width * index,
                width * (index + 1),
            ],
            [10, 0, 10],
            Extrapolate.CLAMP
        );
    });

    const styles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value,
                },
                {
                    translateX: imageTranslateX.value,
                },
                {
                    translateY: imageTranslateY.value,
                },
            ],
        };
    });

    return (
        <Animated.View key={advertise.id}
            className="center-y h-full"
            style={{width:width}}
        >
            <Animated.Image
                style={[
                    { width: width * 0.6, height: width * 0.6 },
                    
                ]}
                source={{uri: advertise.image}}        
            />

            <Text className="text-primary text-3xl my-6">
                {advertise.title}
            </Text>
            <Text className="text-base px-12" >                              
                {advertise.description}
            </Text>
        </Animated.View>
    );
}

export default AdvertiseImage;