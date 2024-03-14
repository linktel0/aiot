import React from 'react'
import {Text,Image,Dimensions} from 'react-native'
import { useAppSelector } from '../redux/hooks';
import * as subCategory  from '../redux/subcategory';
import { useNavigation } from "@react-navigation/core";
import {TouchableOpacity} from "react-native-gesture-handler";

interface SubCategoryViewProps {
    id: number;
}

const { width} = Dimensions.get("screen");
const SubCategoryView = ({id}:SubCategoryViewProps)=> {
    const navigation = useNavigation<any>();
    const item = useAppSelector((state) => subCategory.selectById(state.subCategory.subCategories,id))

    return(
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => 
                navigation.navigate("Shop_Search", {
                    search_term: item?.display_name,
                })
            }
        >
            <Image 
                style={{
                    width: width * 0.6,
                    height: 100,
                    borderRadius: 20,
                    overflow: "hidden",
                    marginRight:32
                }}
                resizeMode="cover"
                source={{
                    uri: item?.image,
                }}
            />

            <Text className="absolute  bottom-4 left-6 text-primary-light text-xl">
                {item?.display_name}
            </Text>
        </TouchableOpacity>
    )}

    export default React.memo(SubCategoryView);