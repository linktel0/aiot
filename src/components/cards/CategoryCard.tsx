import React, { useState } from "react";
import { View,Text, Dimensions } from "react-native";
import * as category from "../../redux/category";
import { useAppSelector } from "../../redux/hooks";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';

interface CategoryCardProps  {
    id:number
}

const { width} = Dimensions.get("screen");

const CategoryCard = ({
    id
}:CategoryCardProps) => {
    const navigation = useNavigation<any>();
    const item = useAppSelector((state) => category.selectById(state.category.categories,id));
 
    return (
        item
        ?<Animated.View key={id}
            className="center-x mb-4"
        >
            <Animated.Image
                resizeMode="cover"
                source={{uri: item.image}}
                style={{ width:width - 16 * 2, height: 200}}
            />
            <Text className="absolute left-8 bottom-3 text-primary-light text-3xl font-bold">
                {item.display_name}
            </Text>

                <IconButton size={32} icon="arrow-right-thick" iconColor="white"
                    className="absolute right-5 bottom-1 bg-primary-light/0"
                    onPress={() =>
                        navigation.navigate("Shop_Category", {
                            category: item,
                    })} 
                />

        </Animated.View>
        :<View/>
    )
};

export default React.memo(CategoryCard);
