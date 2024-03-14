import React, { useState } from "react";
import { Dimensions, View,Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as product from "../../redux/product";
import {IconButton} from "react-native-paper";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

interface FavoriteCardProps {
    id: number;
    onDeletePress(id:number):void;
}

const { width, height } = Dimensions.get("screen");

const FavoriteCard = ({
    id,
    onDeletePress,
}:FavoriteCardProps) => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const item = useAppSelector((state) => product.selectById(state.product.products,id))

    const [selectedSize, setSelectedSize] = useState<string>(
        item?.has_size ? item.sizes[0] : "S"
    );
    const [selectedColor, setSelectedColor] = useState<string>(
        item?.has_size ? item.color[0] : "Black"
    );
    
    return (
        item
        ?<View className="overflow-hidden rounded-xl flex-row mb-4 bg-gray-lighter">
            <TouchableOpacity  
                onPress={() => navigation.navigate(
                            "Shop_Product_Detail", { item }
                    )}
                >
                <Animated.Image
                    style={{ width: width * 0.3, height: 150 }}
                    resizeMode="cover"
                    source={{ uri: item.thumbnail! }}
                />
            </TouchableOpacity>
            <View className="flex-1 justify-between ml-2"> 
                <View className="justify-between flex-row">
                    <Text className="font-bold"
                        style={{width:width*0.55}}
                    >
                        {item.display_name}
                    </Text>
                    <IconButton icon="close" iconColor={"red"} size={24}
                        onPress={()=>onDeletePress(id)}
                    />
                </View>
                <View className="mr-4 mt-2"
                    style={{width:width*0.55}}
                >
                    {item.has_color && (
                        <View className="flex-row flex-wrap mb-2">
                            <View className="bg-gray/50 rounded-full  flex-row p-[2]">
                                {item.color.map((c, i) => (
                                    <View key={i}
                                        className="w-[16] h-[16] rounded-full overflow-hidden mx-2"
                                        style={{backgroundColor: c.toLowerCase()}}/>
                                ))}
                            </View>
                        </View>
                        )}
                    {item.has_size && (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <View className="flex-row flex-wrap">
                                {item.sizes.map((s, i) => (
                                    <View key={i}
                                        className="center-x bg-primary-dark/80 w-[48] rounded-2xl mr-1"
                                    >
                                        <Text className="text-primary-light text-xs">{s}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>   
                <View className="between-x mr-2 py-1">
                    <Text className="font-bold pr-4">￥{item.price}</Text>
                    {item.is_discount  
                        ?<View className="bg-primary px-2 rounded-full">
                            <Text className="text-primary-light text-xs">{`-${item.discount.percentage}%`}</Text>
                        </View>
                        :<View/>
                        }
                </View>          
            </View>

        </View>
        :<View></View>
    );
};

export default React.memo(FavoriteCard);
