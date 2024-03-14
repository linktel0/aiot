import React, { useState } from "react";
import { ScrollView, View,TouchableOpacity} from "react-native";

interface SelectableColorsProps {
    items: string[] | [];
    value: string;
    onChange(value: string): void;
}

const SelectableColors = ({
    items = [],
    value,
    onChange,
}:SelectableColorsProps) => {
    const [selected, setSelected] = useState(value);

    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {items.length > 0 &&
                    items.map((it, index) => (
                        <View  key={index} className={`center-x w-[30] h-[30] mr-2 
                                           ${selected === it?'border rounded-full':''} `} 
                        >
                            <TouchableOpacity className="h-[25] w-[25] rounded-full"
                                style={{backgroundColor: it.toLowerCase()}}
                                onPress={() => {
                                    setSelected(it);
                                    onChange(it);
                                }}
                            />
                        </View>
                    ))}
            </ScrollView>
        </View>
    );
};

export default SelectableColors;
