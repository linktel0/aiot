import React from "react";
import {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { View,Dimensions } from "react-native";
import ProductItem from "./cards/ProductItem";

interface AnimatedScrollViewProps {
    ids: number[];
}

const { width} = Dimensions.get("screen");
const itemWidth = width*0.5
const AnimatedScrollView = ({
    ids, 
}:AnimatedScrollViewProps) => {
    const translationX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationX.value = event.contentOffset.x;
    });

    return (
        <View>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={itemWidth + 16 * 2}
                decelerationRate="fast"
            >
                {ids.map((id, index) => {
                    const inputRange = [
                        (itemWidth + 16 * 2) * (index - 2),
                        (itemWidth + 16 * 2) * index,
                        (itemWidth + 16 * 2 ) * (index + 2),
                    ];

                    const rotateZ = useDerivedValue(() => {
                        return withSpring(
                            interpolate(
                                translationX.value,
                                inputRange,
                                [-45, 0, 45],
                                Extrapolate.CLAMP
                            )
                        );
                    });

                    const animatedStyles = useAnimatedStyle(() => ({
                        zIndex: -index,
                        transform: [
                            {
                                scale: withSpring(
                                    interpolate(
                                        translationX.value,
                                        inputRange,
                                        [0.5, 1, 0.5],
                                        Extrapolate.CLAMP
                                    )
                                ),
                            },
                            {
                                rotate: rotateZ.value + "deg",
                            },
                            {
                                translateX: interpolate(
                                    translationX.value,
                                    inputRange,
                                    [0, 0, -100],
                                    Extrapolate.CLAMP
                                ),
                            },
                        ],
                    }));
                    return (
                        <Animated.View 
                            key={index}
                            style={animatedStyles}
                        >
                           <ProductItem 
                                id={id} 
                                itemWidth={width*0.5}
                                itemHeight={width*0.55}
                            />
                        </Animated.View>
                    );
                })}
                <View style={{width:itemWidth*0.68}}/>
            </Animated.ScrollView>
        </View>
    );
};

export default AnimatedScrollView;
