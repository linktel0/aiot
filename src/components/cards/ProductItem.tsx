import React from "react";
import { View,Text} from "react-native";
import {Avatar} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as product from "../../redux/product";
import * as favorite from "../../redux/favorite";
import { useAppSelector } from "../../redux/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface ProductItemProps {
    id: number;
    itemWidth:number;
    itemHeight:number
}

const ProductItem = ({
    id, 
    itemWidth,
    itemHeight,
}:ProductItemProps) => {
    const navigation = useNavigation<any>();
    const item = useAppSelector((state) => product.selectById(state.product.products,id))
    const favoriteItem = useAppSelector((state) => favorite.selectById(state.favorite.favorites,id))
    const bagItem = useAppSelector((state) => favorite.selectById(state.bag.bagItems,id))

    return (
        item
        ?<View className="mr-8 mt"
            style={{width:itemWidth}}
        >
            <View className="bg-primary rounded-2xl mt-4 "> 
                    <View className="bg-primary-light ml-2 rounded-2xl -mt-4"
                        style={{width:itemWidth,elevation:10,shadowColor:'black',shadowRadius:20,
                            shadowOpacity:0.5,shadowOffset:{width:0,height:10}}}
                    >
                        <TouchableOpacity 
                            style={{width:itemWidth}}
                            activeOpacity={0.6}
                            onPress={() =>
                                navigation.navigate(
                                    "Shop_Product_Detail",
                                    { item }
                                )
                            }
                        >
                            <Animated.Image className="rounded-t-2xl overflow-hidden"
                                style={{width: itemWidth,height:itemHeight}}
                                resizeMode="cover"
                                source={{ uri: item.thumbnail! }}
                            />
                        </TouchableOpacity>
                        <Text className="py-2 px-4 text-xs font-bold h-20">
                            {item.name}
                        </Text>
                    </View>
                <View className="between-x m-1">
                    <Text className="text-primary-light"> 
                        ￥{`${item.price}`}
                    </Text>
                    <View className="flex-row">
                        {favoriteItem && <Avatar.Icon className="bg-primary"
                            size={32} icon="heart" color="white"/> } 
                        {bagItem  && <Avatar.Icon className="bg-primary"
                            size={32} icon="shopping-outline" color="white"/> }       
                    </View>
                </View>
            </View>
        </View>
        :<View></View>
    )

};

export default React.memo(ProductItem);
