import React from "react";
import {View,Text,Dimensions} from "react-native";
import { TProduct } from "../../redux/data_types";
import * as product  from '../../redux/product';
import { Card ,Avatar} from "react-native-paper";
import Animated, {
    Extrapolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    useDerivedValue,
    interpolate,
    interpolateColor,
} from "react-native-reanimated";
import { useAppSelector } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/core";

const { width} = Dimensions.get("screen");

interface HomeProductCardProps {
    id: number;
}

const HomeProductCard = ({
    id,
}:HomeProductCardProps) => {
    const navigation = useNavigation<any>();
    const item = useAppSelector((state) => product.selectById(state.product.products,id))

    return (
        item
        ?<View className="bg-primary rounded-2xl mr-8"
            style={{width:width*0.5}}       
        >
            <Animated.View>
                {/*</View>sharedTransitionTag={`container-${product.id}`}*/}
                {/* sharedTransitionTag={`image-${product.id}`} */}
                <Animated.Image
                    resizeMode="cover"
                    source={{uri: item.thumbnail!}}
                />
            </Animated.View>

            <View className="ml-2">
                <Card 
                    //onPress={navigation.navigate("Shop_Product_Detail",{item: item,})}
                >        
                    <Card.Cover source={{ uri: item.thumbnail! }} />
                    <Text className="p-2 text-xs font-bold h-20">
                        {item.name}
                    </Text>
                </Card>
                <View className="between-x m-1">
                    <Text className="text-primary-light">
                        ￥{item.price}
                    </Text>
                    <View className="flex-row">
                        {/*in_favorite &&<Avatar.Icon className="bg-primary"
                            size={32} icon="heart" color="white"/> } 
                        {in_bag && <Avatar.Icon className="bg-primary"
    size={32} icon="shopping-outline" color="white"/> */}       
                    </View>
                </View>
           </View> 
        </View>
        :<View></View>
    );
};

export default React.memo(HomeProductCard);
