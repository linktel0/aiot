import React, { useState } from "react";
import { Dimensions, ScrollView, View, Text, TextInput} from "react-native";
import {ProductDetailProps} from "../navigation/ScreensNavigationRouteProps";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Header from "../components/navigation/Header";
import Selectables from "../components/Selectables";
import SelectableColors from "../components/SelectableColors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as favorite from "../redux/favorite";
import * as bag from "../redux/bag";
import ImageCarousel from "../components/ImageCarousel";
import {IconButton,Button} from 'react-native-paper'
import { number } from "yup";


const { width, height } = Dimensions.get("screen");

const IMAGE_HEIGHT = height * 0.6;
const HIDDEN_VIEW_HEIGHT = height * 0.4;

const ProductDetail = ({ navigation, route }:ProductDetailProps) => {
    const dispatch = useAppDispatch();

    const item = route.params.item;

    const [text,setText] = useState('')

    const [selectedSize, setSelectedSize] = useState<string>(
        item.has_size ? item.sizes[0] : "S"
    );
    const [selectedColor, setSelectedColor] = useState<string>(
        item.has_size ? item.color[0] : "Black"
    );

    const isLoading = useAppSelector((state) => state.favorite.loading)
    const hasFavorite = useAppSelector((state) => favorite.selectById(state.favorite.favorites,item?.id))?true:false;
    const bagItem = useAppSelector((state) => favorite.selectById(state.bag.bagItems,item?.id))

    const [hiddenViewShow, setHiddenViewShow] = useState(false);
    const hiddenViewTranslateY = useSharedValue(HIDDEN_VIEW_HEIGHT + 15);

    const hiddenViewStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withTiming(hiddenViewTranslateY.value, {
                    easing: Easing.inOut(Easing.ease),
                }),
            },
        ],
    }));
    return (
        <View className="h-full">
            <Header title='商品详情' goBack={()=>navigation.goBack()}/>
            <Animated.View className='absolute w-full h-[340] bottom-0 z-10 bg-gray-lighter/100 rounded-2xl'
                style={hiddenViewStyles}
            >
                <View className="w-full center-x"> 
                    <IconButton className="w-8 h-8 bg-gray-lighter rounded-full items-center -mt-4"
                        icon="close"
                        size={24}
                         onPress={() => {
                            setHiddenViewShow(false);
                            hiddenViewTranslateY.value =
                                HIDDEN_VIEW_HEIGHT + 15;
                        }}
                    />
                </View>
                 <ScrollView className="flex-1">
                    <View className="mx-4">
                        {hiddenViewShow && item.has_size && (
                            <View>
                                <View className="flex-row items-center my-3">
                                    <Text className="opacity-50 text-base">数量</Text>
                                    <TextInput className="w-2/3 text-lg rounded-md bg-primary-light ml-4 pl-2"
                                        placeholder="1"
                                        value={text}
                                        keyboardType = {"numeric"}
                                        onChangeText={text => setText(text)}
                                    />
                                </View>
                                <Text className="opacity-50 text-base">
                                        尺寸
                                </Text>
                                <Selectables
                                    value={selectedSize}
                                    items={item.sizes}
                                    onChange={(v) => setSelectedSize(v)}
                                />
                            </View>
                        )}
                        {hiddenViewShow && item.has_color && (
                            <View className="mt-2">
                                <Text className="opacity-50 text-base m-1">                                
                                    颜色
                                </Text>
                                <SelectableColors
                                    value={selectedColor}
                                    items={item.color}
                                    onChange={(v) => setSelectedColor(v)}
                                />
                            </View>
                        )}
                        {!item.has_color &&
                            !item.has_size && (
                                <View className="p-2">
                                    <Text className="items-center">            
                                        该产品不需要选择颜色与尺寸
                                    </Text>
                                </View>
                            )}
                        <View className="mt-4 py-2">
                            <Button className="bg-primary h-10 rounded-2xl center-x"
                                icon="shopping-outline"
                                textColor='white'
                                onPress={() => {
                                    dispatch(
                                        bag.addToBag({
                                            id: item.id,
                                            details:[{
                                                color: selectedColor,
                                                size: selectedSize,
                                                quantity: Number(text)?Number(text):1,
                                            }]
                                        })
                                    );
                                    hiddenViewTranslateY.value =
                                        HIDDEN_VIEW_HEIGHT + 15;
                                    navigation.goBack();
                                }} 
                            >
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
           <ScrollView>
                <View className="w-full overflow-hidden">
                    <IconButton className="absolute right-5 top-5 bg-primary-light z-10"
                        icon="close"
                        size={24}
                        onPress={() => navigation.goBack()}
                    />
                    
                    <ImageCarousel
                        productId={item.id}
                        thumbnail={item.thumbnail!}
                        images={item.images}
                        imageHeight={IMAGE_HEIGHT}
                    />
                </View>
                
                <View className="m-4">
                    <View>
                        <View className="between-x">
                            <Text className="text-sm opacity=50">
                                {item.brand.display_name}
                            </Text>
                            <Text className="opacity=50">￥{`${item.price}`}</Text>
                        </View>
                        <Text className="text-base font-medium opacity=50 w-5/6">
                            {item.display_name}
                        </Text>
                    </View>
                    {item.has_size && (
                        <View className="mt-2">
                            <Text className="opacity=50">尺 寸</Text>
                            <ScrollView
                                style={{ flex: 1 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View className="flex-row flex-wrap">
                                    {item.sizes.map((s, i) => (
                                        <View key={i}
                                            className="center-x bg-primary-dark w-[64] pb-1 rounded-2xl mr-1"
                                        >
                                            <Text className="text-primary-light">{s}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    )}
                    
                    {item.has_color && (
                        <View className="mt-2">
                            <Text className="opacity=50">
                                颜 色
                            </Text>
                            <View className="flex-row flex-wrap">
                                {item.color.map((c, i) => (
                                    <View key={i}
                                        className="w-[30] h-[30] rounded-full overflow-hidden mr-2"
                                        style={{backgroundColor: c.toLowerCase()}}/>
                                ))}
                            </View>
                        </View>
                    )}

                    <View className="mt-2">
                        <Text className="opacity=50">
                            详 情
                        </Text>
                        {item.details.detail_list.map(
                            (d: string, i: number) => (
                                <View key={i} className="mb-2">                           
                                    <Text className="opacity=50">
                                        {d}
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                    
                    <View className="evenly-x">
                        <Button className="flex-1 rounded-2xl h-10 center-x mr-2"
                            disabled={hasFavorite || isLoading}
                            onPress={() => {
                                dispatch(
                                    favorite.addOne({id:item.id})
                                );
                            }}
                            icon={hasFavorite?"heart-outline":"heart"}
                            textColor={hasFavorite?"gray":"red"}
                            mode="outlined" 
                        >
                        </Button>
                        <Button className="flex-1 bg-primary ml-2 h-10 rounded-2xl center-x"
                            onPress={() => {
                                hiddenViewTranslateY.value = 0;
                                setHiddenViewShow(true);
                            }}
                            icon="shopping-outline"
                            textColor='white'
                        >
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductDetail;
