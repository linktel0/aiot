import {  MaterialCommunityIcons } from "@expo/vector-icons";
import React, {useEffect, useState } from "react";
import {
    View,Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import ProductCard from "../components/cards/ProductCard";
import FilterView from "../components/FilterView";
import BottomTab from "../components/navigation/BottomTab";
import {SearchScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { Product } from "../redux/data_types";
import { useAppSelector } from "../redux/hooks";;
import { useKeyboard } from "../utils/useKeyboardHeight";
import SortView from "../components/SortView";
import {IconButton} from 'react-native-paper'
import { Header } from "../components/navigation/Header";


const { width, height } = Dimensions.get("screen");
const PRODUCT_WIDTH = width / 2;

const FILTER_VIEW_HEIGHT = height / 2;

const SearchScreen = ({ navigation, route }:SearchScreenProps) => {
    //animations
    const filterTranslateY = useSharedValue(FILTER_VIEW_HEIGHT + 15);
    const sortTranslateY = useSharedValue(FILTER_VIEW_HEIGHT + 15);
    //animations
    const [keyboardHeight, keyboardVisible] = useKeyboard();

    const storedProducts = useAppSelector((state) => state.products.products);
    const products_in_bag = useAppSelector(
        (state) => state.bag.products_in_bag
    );

    const [products, setProducts] = useState<Product[]>([]);

    const [searchTerm, setSearchTerm] = useState(
        route.params.search_term ? route.params.search_term : ""
    );

    useEffect(() => {
        if (route.params.search_term) {
            setProducts((prev) =>
                storedProducts.filter((p) =>
                    p.sub_category.name
                        .toLowerCase()
                        .includes(route.params.search_term!.toLowerCase())
                )
            );
        }
    }, [route.params.search_term]);

    return (
        <View className="h-full">
            <Header title="筛选" goBack={()=>navigation.goBack()}/>
            <SortView
                height={FILTER_VIEW_HEIGHT}
                width={width}
                translateY={sortTranslateY}
                onClose={() => (sortTranslateY.value = FILTER_VIEW_HEIGHT + 15)}
                onApply={() => (sortTranslateY.value = FILTER_VIEW_HEIGHT + 15)}
            />
            <FilterView
                width={width}
                height={FILTER_VIEW_HEIGHT}
                translateY={filterTranslateY}
                onClose={() =>(filterTranslateY.value = FILTER_VIEW_HEIGHT + 15)}
                onApply={() => (filterTranslateY.value = FILTER_VIEW_HEIGHT + 15)}
            />
            {!keyboardVisible && (<BottomTab route_name={route.name} /> )}

            <FlatList
                contentContainerStyle={{ marginBottom: height * 0.1, paddingHorizontal: 16 }}
                ListHeaderComponent={
                    <View className="bg-primary rounded-xl p-5 mt-2" > 
                        <View className="bg-primary-light between-x h-[48] p-3 pr-0 rounded-xl">
                            <TextInput className="w-2/3"
                                placeholder="查 询"
                                value = {searchTerm}
                                onChangeText = {(v) => setSearchTerm(v)}
                            >
                            </TextInput>
                            <IconButton 
                                icon="magnify"
                                size={32}
                                iconColor={'red'}
                                onPress={() =>
                                    setProducts((prev) =>
                                        storedProducts.filter(
                                            (p) =>
                                                p.sub_category.name.toLowerCase() ===
                                                searchTerm.toLowerCase().trim()
                                        )
                                    )
                                }
                            />
                        </View>
                        
                        {products.length !== 0 && (
                            <View className="between-x bg-primary-light h-[48] p-3 mt-4 rounded-xl">
                                <TouchableOpacity className="flex-row items-center"
                                    onPress={() => (filterTranslateY.value = 0)}
                                >
                                    <MaterialCommunityIcons
                                        name="filter-variant"
                                        size={24}
                                        color={'black'}
                                    />
                                    <Text className="ml-2 opacity-70">
                                        类别
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-row items-center"
                                    onPress={() => (sortTranslateY.value = 0)}
                                >
                                    <MaterialCommunityIcons
                                        name="sort"
                                        size={24}
                                        color={'black'}
                                    />
                                    <Text className="ml-2 opacity-70">
                                        价格
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                }
                data={products}
                keyExtractor={(p, i) => p.id.toString()}
                numColumns={2}
                scrollEventThrottle={16}
                
                renderItem={({ item }) => (
                    <ProductCard
                        width={PRODUCT_WIDTH - 16 * 2}
                        is_in_bag={products_in_bag.includes(item.id)}
                        product={item}
                        onAddToBagPress={() => {console.log('hello')}}
                        onImagePress={() =>
                            navigation.navigate("Shop_Product_Detail", {
                                item: item,
                            })
                        }
                    />
                )}
            />
        </View>
    );
};

export default SearchScreen;
