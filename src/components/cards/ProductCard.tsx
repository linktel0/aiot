import React from "react";
import {
    Dimensions,
    TouchableOpacity,
} from "react-native";

import Animated from "react-native-reanimated";
import { Product } from "../../redux/data_types";

import { AirbnbRating } from "react-native-ratings";
import {View,Text} from 'react-native'

interface ProductCardProps {
    product: Product;
    width: number;
    is_new?: boolean;
    onImagePress(item: Product): void;
    onAddToBagPress?(item: Product): void;
    is_in_bag?: boolean
    show_icon?: boolean
}

const { width: SWitch, height } = Dimensions.get("screen");

const ProductCard = ({
    width,
    product,
    is_new,
    onImagePress,
    onAddToBagPress,
    is_in_bag,
    show_icon,
}:ProductCardProps) => {
    return (
        <View className="rounded-xl bg-primary-light m-[8]"
            style={{width:width}}
        >
            <TouchableOpacity onPress={() => onImagePress(product)}>
                <View className="bg-primary-light h-[150] w-[width] overflow-hidden rounded-xl">
                    {(product.is_discount && product.is_new) 
                    ? <View className="absolute top-1 right-1 bg-primary z-20 px-3 rounded-full">
                            <Text className="text-primary-light">{`-${product.discount.percentage}%`} New</Text>
                        </View>
                    :<>
                        {product.is_discount && 
                            <View className="absolute top-1 right-1 bg-primary z-20 px-3 rounded-full">
                                <Text className="text-primary-light">{`-${product.discount.percentage}%`}</Text>
                            </View>
                        }
                        {product.is_new && 
                            <View className="absolute top-1 right-1 bg-primary z-20 px-3 rounded-full">
                                <Text className="text-primary-light">New</Text>
                            </View>
                        }
                    </>}
                    <Animated.View>
                        {/*</View>sharedTransitionTag={`container-${product.id}`}*/}
                        {/* sharedTransitionTag={`image-${product.id}`} */}
                        <Animated.Image
                            resizeMode="cover"
                            source={{uri: product.thumbnail!}}
                            style={{ width, height: 150, }}
                        />
                    </Animated.View>
                </View>

                {/*(!is_in_bag || !show_icon) && 
                <View className="absolute z-50 ">
                    <IconButton className="bg-primary w-8 h-8"
                        icon = "shopping-outline"
                        iconColor="white"
                        onPress={() => onAddToBagPress && onAddToBagPress(product)}
                    />
                    </View>*/} 
            </TouchableOpacity>
            <View className="center-x">
                <AirbnbRating
                    defaultRating={product.avg_rating}
                    isDisabled
                    size={10}
                    showRating={false}
                />
                <Text className="opacity-50">
                    ({product.number_reviews})
                </Text>
            </View>
            <Text className="opacity-50">
                {product.brand.display_name}
            </Text>
            <Text className="font-bold opacity-50">
                {product.display_name}
            </Text>
            <Text className="font-bold opacity-50">
                ￥{product.price}
            </Text>
        </View>
    );
};

export default ProductCard;
