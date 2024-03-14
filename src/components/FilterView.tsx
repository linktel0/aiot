import React, { useState } from "react";
import {View,Text} from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Selectables from "./Selectables";
import SelectableColors from "./SelectableColors";
import {Button,IconButton} from 'react-native-paper'

interface FilterViewProps {
    width: number;
    height: number;
    onClose(): void;
    translateY: Animated.SharedValue<number>;
    onApply(filters: {
        category: string;
        sub_category: string;
        color: string;
    }): void;
}

const FilterView = ({
    width,
    height,
    onClose,
    translateY,
    onApply,
}:FilterViewProps) => {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");
    const [selectedColor, setSelectedColor] = useState("Black");
    const styles = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(translateY.value) }],
    }));
    return (
        <Animated.View className="w-full px-4 bg-secondary-light/100 absolute bottom-0 z-50 rounded-2xl"
            style={styles}
        >
            <View className="w-full center-x" > 
                <IconButton className="w-8 h-8 bg-secondary-light rounded-full items-center -mt-4"
                    icon="close"
                    size={24}
                    onPress={onClose}
                />
            </View>

            <ScrollView className="flex-1 mt-2"
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <View>
                        <Text className="opacity-50">
                            选择分类
                        </Text>
                        <Selectables
                            value={selectedCategory}
                            items={["ALL", "MEN", "WOMEN", "KIDS"]}
                            onChange={(v) => setSelectedCategory(v)}
                        />
                    </View>
                    <View>
                        <Text className="opacity-50">
                            选择子类
                        </Text>
                        <Selectables
                            value={selectedSubCategory}
                            items={[
                                "ALL",
                                "JEANS",
                                "SHIRTS",
                                "SHOES",
                                "MONTRE",
                                "LUNETTE",
                            ]}
                            onChange={(v) => setSelectedSubCategory(v)}
                        />
                    </View>
                    <View className="m-1">
                        <Text className="opacity-50">
                            选择颜色
                        </Text>
                        <SelectableColors
                            value={selectedColor}
                            items={[
                                "Black",
                                "Blue",
                                "Red",
                                "Cyan",
                                "Green",
                                "Yellow",
                            ]}
                            onChange={(v) => setSelectedColor(v)}
                        />
                    </View>
                    <Button className="bg-primary m-4 rounded-full p-2"
                        textColor="white"
                        onPress={() =>
                            onApply({
                                category: selectedCategory,
                                sub_category: selectedSubCategory,
                                color: selectedColor,
                            })}
                        >
                        APPLY
                    </Button>
                   
                </View>
            </ScrollView>
        </Animated.View>
    );
};

export default FilterView;
