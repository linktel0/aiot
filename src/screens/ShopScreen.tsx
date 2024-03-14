import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import BottomTab from "../components/navigation/BottomTab";
import Header from "../components/navigation/Header";
import {ShopScreenProps} from "../navigation/ScreensNavigationRouteProps";
import * as display from '../redux/display'
import { useAppSelector } from "../redux/hooks";
import {TDisplay } from "../redux/data_types";
import CategoryCard from "../components/cards/CategoryCard";

const ShopScreen = ({ navigation, route }:ShopScreenProps) => {
    const [categories,setCategories] = useState<TDisplay>();
    const displays = useAppSelector((state) => display.selectAll(state.display.displays));
    useEffect(()=>{
        displays.forEach((item)=>{
            if (item.display_type==='category'){
                setCategories(item)
            }
        })        
    },[])

    return (
        categories?
        <View className="h-full w-full">
            <Header title={categories.display_name} goBack={()=>navigation.goBack()}/>
            <BottomTab route_name={route.name}/>
            <ScrollView className="flex-1 mt-2 mb-14"
                showsVerticalScrollIndicator ={false}
            >
                {categories?.ids.map((id,index) => (
                    <CategoryCard key={index} id={id}/>
                ))}
            </ScrollView>
        </View>
        :<View></View>
    );
};

export default ShopScreen;
