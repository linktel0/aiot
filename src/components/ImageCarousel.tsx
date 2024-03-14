import React from "react";
import { Dimensions } from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import {
    PanGestureHandlerGestureEvent,
    PanGestureHandler,
} from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";
import { Image,View} from "react-native";

interface ImageCarouselProps {
    thumbnail: string;
    images: string[];
    imageHeight?: number;
    imageWidth?: number;
    productId: number;
}

const { width, height } = Dimensions.get("screen");

const ImageCarousel = ({
    thumbnail,
    images,
    imageHeight,
    imageWidth,
    productId,
}:ImageCarouselProps) => {
    const translateX = useSharedValue(0);
    const BOX_WIDTH = (images.length + 1) * width;

    const snapPoints = new Array(images.length + 1)
        .fill(null)
        .map((item, i) => -width * i);

    const styles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(translateX.value, {
                    overshootClamping: true,
                    restSpeedThreshold: 0.01,
                }),
            },
        ],
    }));

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startX: number }
    >({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
        },
        onEnd: (e) => {
            translateX.value = snapPoint(
                translateX.value,
                e.velocityX,
                snapPoints
            );
        },
    });
    return (
        <View>

        <PanGestureHandler 
            onGestureEvent={gestureHandler}>
            {/* 
                sharedTransitionTag={`container-${productId}`}
                sharedTransitionTag={`image-${productId}`} 
            */}
            <Animated.View className="flex-row w-[BOX_WIDTH]"
                style={styles}
            >
                    <Animated.Image
                        resizeMode={"cover"}
                        style={{
                            width: imageWidth ? imageWidth : width,
                            height: imageHeight ? imageHeight : height * 0.4,
                        }}
                        source={{ uri: thumbnail }}
                    />

                {images.map((m, index) => (
                    <Image
                        key={index}
                        resizeMode={"cover"}
                        style={{
                            width: imageWidth ? imageWidth : width,
                            height: imageHeight ? imageHeight : height * 0.4,
                        }}
                        source={{ uri: m }}
                    />
                ))}
            </Animated.View>
        </PanGestureHandler>
        </View>
    );
};

export default ImageCarousel;
