import React, { useEffect, useState } from "react";
import { Dimensions, View,Text, ScrollView} from "react-native";
import { IconButton } from "react-native-paper";
import Animated from "react-native-reanimated";
import * as bag from "../../redux/bag";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import * as product from "../../redux/product";
import { TItem } from "../../redux/data_types";

interface BagCardProps  {
    id: number;
    updatePrice(item:TItem): void;
}

const { width, height } = Dimensions.get("screen");

const BagCard = ({
    id,
    updatePrice,
}:BagCardProps) => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const [total,setTotal] = useState(0);
    const item = useAppSelector((state) => product.selectById(state.product.products,id))
    const bagItem = useAppSelector((state) => bag.selectById(state.bag.bagItems,id))

    const onDeletePress = (id:number) =>{
        dispatch(bag.removeFromBag(id)) 
    }

    useEffect(()=>{
        let sum = 0;
        if(bagItem){
            bagItem.details.forEach((item)=>{
                sum += item.quantity;
            })
            sum *= item?item.price:0
            setTotal(sum)   
            sum *= item?(1-item.discount.percentage/100):0    
            updatePrice({id:id,value:sum})
        }
    },[bagItem])

    return (
        item
        ?<View className="rounded-xl my-2">
            <View className="overflow-hidden flex-row">
                <TouchableOpacity 
                    onPress={() => navigation.navigate(
                                "Shop_Product_Detail", { item }
                        )}
                    >
                    <Animated.View>
                        {/*</View>sharedTransitionTag={`container-${product.id}`}*/}
                        {/* sharedTransitionTag={`image-${bagItem.product.id}` */}
                        <Animated.Image
                            resizeMode="cover"
                            source={{ uri: item.thumbnail! }}
                            style={{ width: width * 0.3, height: 150 }}
                        />
                    </Animated.View>
                </TouchableOpacity>
                <View  className="justify-between ml-2 pr-6">
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
                            <View className="flex-row mb-2">
                                <View className="bg-gray/50 rounded-full  flex-row p-[2]">
                                    {item.color.map((c, i) => (
                                        <View key={i}
                                            className="w-[16] h-[16] rounded-full overflow-hidden mx-[8]"
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
                            ?<View className="bg-primary px-2 rounded-full mx-2">
                                <Text className="text-primary-light text-xs">
                                    {`-${item.discount.percentage}%`}
                                </Text>
                            </View>
                            :<View/>
                            }
                    </View>
                </View>
            </View>
            {bagItem?.details.map((detail,index)=>{
                return(
                <View className={`between-x ${(index%2===0)?"bg-gray-lighter":"bg-gray-lighter/50"}`} key={index}>
                    <View className="flex-row items-center -my-2">
                        <View className="center-x pl-4"
                            style={{width:width*0.25}}
                        >
                            <IconButton icon="close" iconColor={"red"} size={16}
                                onPress={()=>{dispatch(bag.removeItem({id:id,value:index}))}}
                            />
                            <View className="center-x bg-primary-dark/80 w-[48] rounded-2xl mr-1 -ml-1">
                                <Text className="text-primary-light text-xs">{detail.size}</Text>
                            </View>                            
                            <View className="w-[16] h-[16] rounded-full overflow-hidden mr-4"
                                style={{backgroundColor: detail.color.toLowerCase()}}/>
                        </View>
                        <View className="between-x">
                            <IconButton className="bg-white/0"
                                icon="menu-left"
                                iconColor={'black'}
                                size={32}
                                onPress={()=>{dispatch(bag.decrementQuantity({id:id,value:index}))}}
                            />
                            <Text className="text-sm -ml-2">{detail.quantity}</Text>
                            <IconButton className="bg-white/0 -ml-1"
                                icon="menu-right"
                                iconColor={'black'}
                                size={32}
                                onPress={()=>{dispatch(bag.incrementQuantity({id:id,value:index}))}}
                            />
                        </View>
                    </View>
                    <Text className="font-bold pr-4">￥{(item.price*detail.quantity).toFixed(2)}</Text>
                </View>
                )
            })}
            <View className="between-x ml-2 bg-white">
                <Text className="font-bold text-base p-2"
                    style={{width:width*0.25}}
                >Sum</Text>
                <View className="between-x"
                    style={{width:width*0.70}}
                >
                    {item.discount.percentage > 0 
                     ?<View className="flex-row items-center">
                        <Text className="font-bold text-base py-2 text-primary"
                            style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}
                        >￥{total.toFixed(2)} </Text>
                      </View>
                     :<View/>
                    }
                    <Text className="font-bold text-base p-2">
                        ￥{(bagItem?(total*(1-item.discount.percentage/100)):0).toFixed(2)} 
                    </Text>
                </View>
            </View>
        </View>
        :<View></View>
    );
};

export default React.memo(BagCard);
