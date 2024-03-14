import React from "react";

import { BoxProps, useTheme } from "@shopify/restyle";
import { Theme } from "../utils/theme";
import { Product } from "../redux/data_types";
import {
    PanGestureHandlerGestureEvent,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { Image,View,Dimensions,Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Animated, {
    useAnimatedGestureHandler,
    withSpring,
} from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useAnimatedStyle } from "react-native-reanimated";
import { Card ,Avatar} from "react-native-paper";
import * as product from "../redux/product";
import { useAppSelector } from "../redux/hooks";

interface TowColumnScrollViewProps {
    id: number;
}

//const AnimatedBox = Animated.createAnimatedComponent(Box);

const TowColumnScrollView = ({
    id
}:TowColumnScrollViewProps) => {
    const navigation = useNavigation<any>();
    const { width} = Dimensions.get("screen");
    const PRODUCT_WIDTH = width / 2 - 16 * 2;
    const item = useAppSelector((state) => product.selectById(state.product.products,id))

    return (
        item
        ?<View style={{width:width*0.5}}>
            <View className="bg-primary rounded-2xl mb-4"
                style={{width:PRODUCT_WIDTH}}
            >
                <View className="ml-2">
                    <Card
                        onPress={() =>
                            navigation.navigate("Shop_Product_Detail", {item: item,})}
                    >        
                        <Card.Cover style = {{height:100}}
                            source={{ uri: item.thumbnail! }} />
                        <Text className="p-2 text-xs font-bold h-14">
                            {item.name}
                        </Text>
                    </Card>
                    <View className="between-x m-1">
                        <Text className="text-primary-light">
                            ￥{`${item.price}`}
                        </Text>
                        <View className="flex-row">
                            {/*products_in_favorite.includes(p.id) &&<Avatar.Icon className="bg-primary"
                                size={32} icon="heart" color="white"/> } 
                            {products_in_favorite.includes(p.id) && <Avatar.Icon className="bg-primary"
                        size={32} icon="shopping-outline" color="white"/> */}       
                        </View>
                    </View>
                </View>
            </View>
        </View>
        :<View/>
    );
};

export default React.memo(TowColumnScrollView);
