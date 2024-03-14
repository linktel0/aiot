import React, { useState } from "react";
import {View,Text,TouchableOpacity,ScrollView} from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
//import { ScrollView } from "react-native-gesture-handler";
import {IconButton,Button} from 'react-native-paper'

interface SortViewProps {
    width: number;
    height: number;
    onClose(): void;
    translateY: Animated.SharedValue<number>;
    onApply(v: 'Heighest' | 'Lowest' | 'Relevance'): void;
}

const SortView = ({
    width,
    height,
    onClose,
    translateY,
    onApply,
}:SortViewProps) => {

    const [selected, setSelected] = useState<'Heighest' | 'Lowest' | 'Relevance'>("Relevance");
    const styles = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(translateY.value) }],
    }));
    return (
        <Animated.View className="w-full bg-secondary-light/100 absolute bottom-0 z-50 rounded-2xl"
            style={styles}
        >
            <View className="w-full center-x"> 
                    <IconButton className="w-8 h-8 bg-secondary-light rounded-full items-center -mt-4"
                        icon="close"
                        size={24}
                        onPress={onClose}
                    />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 16 }}
            >
                <View>
                    <TouchableOpacity className={`items-center mb-1 p-2 ${selected === 'Relevance' ?  'bg-primary/80' : 'bg-secondary-light'}`}
                        onPress={() =>  setSelected('Relevance')}>
                        <Text className={`text-lg ${selected === 'Relevance' ? 'text-primary-light' : 'text-primary-dark'}`}>
                            不按价格排序
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  className={`items-center mb-1 p-2 ${selected === 'Lowest' ?  'bg-primary/80' : 'bg-secondary-light'}`}
                        onPress={() => setSelected('Lowest')}>
                        <Text className={`text-lg ${selected === 'Lowest' ? 'text-primary-light' : 'text-primary-dark'}`}>
                            价格由低到高
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`items-center p-2 ${selected === 'Heighest' ?  'bg-primary/80' : 'bg-secondary-light'}`}
                        onPress={() => setSelected('Heighest')}>
                        <Text className={`text-lg ${selected === 'Heighest' ? 'text-primary-light' : 'text-primary-dark'}`}>
                            价格由高到低
                        </Text>
                    </TouchableOpacity>

                    <Button className="bg-primary m-4 rounded-full p-2"
                        textColor="white"
                        onPress={() => onApply(selected)}>
                        APPLY
                    </Button>
                </View>
            </ScrollView>
        </Animated.View>
    );
};

export default SortView;
