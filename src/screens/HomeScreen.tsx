import React, { useEffect, useState } from "react";
import { Dimensions,View,Text, ScrollView,TouchableOpacity} from "react-native";
import AnimatedScrollView from "../components/AnimatedScrollView";
import SubCategoryView from "../components/SubCategoryView";
import BottomTab from "../components/navigation/BottomTab";
import {IconButton} from 'react-native-paper'
import  Waiting  from "../components/Waiting";
import {HomeScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import * as product from "../redux/product"
import * as display from "../redux/display";
import * as bag from "../redux/bag"
import * as favorite from "../redux/favorite";
import { TDisplay } from "../redux/data_types";
import ProductItem from "../components/cards/ProductItem";


const { width} = Dimensions.get("screen");

const HomeScreen = ({ navigation, route }:HomeScreenProps) => {
    const dispatch = useDispatch();
    const displays = useAppSelector((state) => display.selectAll(state.display.displays));
    const dagItems = useAppSelector((state) => bag.selectAll(state.bag.bagItems));
    const favorites = useAppSelector((state) => favorite.selectAll(state.favorite.favorites));

    const [subCategory,setSubCategory] = useState<TDisplay>();
    const [product0,setProduct0] = useState<TDisplay[]>([])
    const [product1,setProduct1] = useState<TDisplay[]>([])
    const [product2,setProduct2] = useState<TDisplay[]>([])
    const productState = useAppSelector((state) => state.product);

    useEffect(()=>{
        let temp:TDisplay[]
        let ids = new Map();
        dagItems.map((item)=>(ids.set(item.id,0)));
        favorites.map((item)=>(ids.set(item.id,0)));
        displays.map((item,index)=>{
            switch(item.name){
                case 'category':
                    //console.log('category',item.display_type,item.ids)
                    break;
                case 'subCategory':
                    setSubCategory(item);
                    break;
                case 'product':
                    item.ids.map((id)=>{
                        ids.set(id,0)
                    })
                    switch(item.display_type){ 
                        case 'normal':
                            temp = product0;
                            temp.push(item);
                            setProduct0(temp);
                            break;
                        case 'small':
                            temp = product1;
                            temp.push(item);
                            setProduct1(temp);
                            break;
                        case 'animation':
                            temp = product2;
                            temp.push(item);
                            setProduct2(temp);
                            break;
                    }
            }
        })
        if (!productState.loading) dispatch(product.fetch(Array.from(ids.keys())));
    },[])

    return (
        !subCategory 
        ?<View className="w-full h-full center-x"><Waiting/></View>
        :<View className="h-full w-full">
            <BottomTab route_name={route.name} />
            <ScrollView showsVerticalScrollIndicator ={false}
                className="mx-4 mt-8 mb-16">
                <View className="bg-primary rounded-2xl my-1 p-6">
                    <View className="between-x mb-5">
                        <Text className="text-3xl text-primary-light">
                            欢迎挑选 !
                        </Text>
                        <IconButton size={24} icon="shopping-outline" 
                            onPress={() => navigation.navigate('Bag_Main')}
                            iconColor={ 'white'} 
                            className="bg-red-lighter"           
                        />
                    </View>

                    <TouchableOpacity className="bg-primary-light between-x rounded-xl"
                        onPress={() => 
                            navigation.navigate("Shop_Search", {
                                search_term: undefined,
                            })
                        }
                    >
                        <Text className="opacity-50 ml-2"> 查 询 </Text>
                        <IconButton 
                            icon="magnify"
                            iconColor={'red'}
                            size={32}
                        />
                    </TouchableOpacity>
                </View>
                
                <View className="mt-2">
                    <Text className="text-base opacity=90">
                        {subCategory.display_name}
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={"fast"}
                        snapToInterval={width * 0.6 + 16 * 2}
                    >
                        {subCategory && subCategory.ids.map((id,index)=>{ 
                            return(
                                <SubCategoryView key = {index} id={id} />
                            )}
                        )}
                        
                    <View style={{width:width*0.24}}/>
                    </ScrollView>
                </View>
                 <View >
                    {product0.map((item,index)=>{
                        return(
                            <View key={index} className="mt-2">
                                <Text className="text-base opacity=90">
                                    {item.display_name}
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    decelerationRate={"fast"}
                                    snapToInterval={width*0.5 + 16 * 2}
                                >
                                    {item.ids.map((id,_index) => (
                                        <ProductItem 
                                            key={_index} 
                                            id={id} 
                                            itemWidth={width*0.5}
                                            itemHeight={width*0.55}
                                        />
                                    ))}
                                    
                                    <View style={{width:width*0.34}}/>
                                </ScrollView>
                            </View>
                        )
                    })}
                </View>
                <View className="mt-2">
                    {product1.map((item,index)=>{
                        return(
                            <View key={index} className="mt-2">
                                <Text className="text-base opacity=90">
                                    {item.display_name}
                                </Text>
                                <View className="center-x flex-wrap"
                                    style={{width:width}}
                                >
                                    {item.ids.map((id,_index) => (
                                        <ProductItem 
                                            key={_index} 
                                            id={id} 
                                            itemWidth={width / 2 - 16 * 2}
                                            itemHeight={width*0.3}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    )}
                </View>
               <View>
                    {product2.map((item,index)=>{
                        return(
                            <View key={index} className="mt-2">
                                <Text className="text-base opacity=90">
                                    {item.display_name}
                                </Text>
                                <AnimatedScrollView ids={item.ids}/>
                            </View>
                        )}
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default React.memo(HomeScreen);
