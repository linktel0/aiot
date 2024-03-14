import React, { useEffect, useState } from "react";
import { Dimensions, View,Text} from "react-native";
import { IconButton } from "react-native-paper";
import Animated from "react-native-reanimated";
import * as bag from "../../redux/bag";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import * as product from "../../redux/product";
import { TItem } from "../../redux/data_types";

interface CheckOutProps  {
    id: number;
    updatePrice(item:TItem): void;
}

const { width, height } = Dimensions.get("screen");

const CheckOut = ({
    id,
    updatePrice,
}:CheckOutProps) => {
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
        ?<View className="rounded-xl my-1 bg-gray-lighter/50">
            <View className="overflow-hidden flex-row">
                <TouchableOpacity 
                    onPress={() => navigation.navigate(
                                "Shop_Product_Detail", { item }
                        )}
                    >
                    <Animated.View>
                        {/*</View>sharedTransitionTag={`container-${product.id}`}*/}
                        {/* sharedTransitionTag={`image-${bagItem.product.id}` */}
                        <Animated.Image className="rounded-lg"
                            resizeMode="cover"
                            source={{ uri: item.thumbnail! }}
                            style={{ width: width * 0.2, height: width * 0.2 }}
                        />
                    </Animated.View>
                </TouchableOpacity>
                
                <View  className="justify-between pr-6 flex-row">
                    <View className="">
                        {bagItem?.details.map((detail,index)=>{
                            return(
                            <View className={`between-x h-[32]  ${(index%2===0)?"bg-gray/30":"bg-gray-lighter"} rounded-lg`} key={index}>
                                <View className="flex-row items-center"
                                    style={{width:width*0.6}}
                                >
                                    <IconButton icon="close" iconColor={"red"} size={16}
                                        onPress={()=>{dispatch(bag.removeItem({id:id,value:index}))}}
                                    />
                                    <View className="center-x bg-primary-dark/80 w-[48] rounded-2xl">
                                        <Text className="text-primary-light text-xs">{detail.size}</Text>
                                    </View>                            
                                    <View className="w-[16] h-[16] rounded-full overflow-hidden mx-4"
                                        style={{backgroundColor: detail.color.toLowerCase()}}>
                                    </View>
                                </View>
                                <Text className="text-sm pr-4">{detail.quantity}</Text>
                            </View> 
                        )})}
                    </View>
                    <IconButton icon="close" iconColor={"red"} size={24}
                        onPress={()=>onDeletePress(id)}
                    />                    
                </View>
            </View>
        </View>
        :<View></View>
    );
};

export default React.memo(CheckOut);
