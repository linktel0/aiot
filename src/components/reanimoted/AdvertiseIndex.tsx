import React from 'react';
import {Dimensions} from 'react-native';
import Animated, {
    Extrapolate,
    useAnimatedStyle,
    withSpring,
    useDerivedValue,
    interpolate,
    interpolateColor,
    SharedValue,
} from "react-native-reanimated";


const { width} = Dimensions.get("screen");

interface Props {
    translationX: SharedValue<number>;
    index: number;
}

const AdvertiseIndex = ({index,translationX}:Props) => { 
    const widthstyle = useDerivedValue(() => {
        return interpolate(
            translationX.value,
            [width * (index - 1), width * index, width * (index + 1)],
            [10, 30, 10],
            Extrapolate.CLAMP
        );
    });

    const colorStyle = useDerivedValue(() => {
        return interpolateColor(
            translationX.value,
            [width * (index - 1), width * index, width * (index + 1)],
            [
                "#DB3022",
                '#bf1c0a',
                '#f75546',
            ]
        );
    });

    const dotStyles = useAnimatedStyle(() => ({
        height: 10,
        borderRadius: 5,
        backgroundColor: withSpring(colorStyle.value),
        marginHorizontal: 5,
        width: withSpring(widthstyle.value),
    }));

    return (
        <Animated.View style={dotStyles}/>
    );
}

export default AdvertiseIndex;