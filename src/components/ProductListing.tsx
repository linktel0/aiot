import React, { useEffect, useState } from "react";
import { Dimensions,View } from "react-native";
import { Product } from "../redux/data_types";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "./cards/ProductCard";
import { useNavigation } from "@react-navigation/native";
import {Waiting} from '../components/Waiting'


interface ProductListingProps {
    products: Product[];
    product_width: number;
    products_in_bag: number[];
}

const { width } = Dimensions.get("screen");

const ProductListing = ({
    product_width,
    products_in_bag,
    products,
}:ProductListingProps) => {
    const navigation = useNavigation<any>();

    const [display, setDisplay] = useState(false);
    useEffect(() => {
        setDisplay(true);
    }, []);

    const left_products = products.filter((p, i) => i % 2 !== 0);
    const right_products = products.filter((p, i) => i % 2 === 0);

    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{paddingTop: 24}}>
                {display ? (    
                    <View className="flex-row justify-center" >
                        <View>
                            {left_products.length > 0 &&
                                left_products.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        width={
                                            product_width - 8 * 2
                                        }
                                        is_in_bag={products_in_bag.includes(
                                            p.id
                                        )}
                                        product={p}
                                        onAddToBagPress={() => {}}
                                        onImagePress={() =>
                                            navigation.navigate(
                                                "Shop_Product_Detail",
                                                {
                                                    item: p,
                                                }
                                            )
                                        }
                                    />
                                ))}
                        </View>
                        <View className="">
                            {right_products.length > 0 &&
                                right_products.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        width={
                                            product_width - 8 * 2
                                        }
                                        is_in_bag={products_in_bag.includes(
                                            p.id
                                        )}
                                        product={p}
                                        onAddToBagPress={() => {}}
                                        onImagePress={() =>
                                            navigation.navigate(
                                                "Shop_Product_Detail",
                                                {
                                                    item: p,
                                                }
                                            )
                                        }
                                    />
                                ))}
                        </View>
                    </View>
                ) : (
                    <Waiting/>
                )}
            </ScrollView>
        </View>
    );
};

export default ProductListing;
