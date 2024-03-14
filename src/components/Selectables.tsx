import React, { useState } from "react";
import { ScrollView,View,Text,TouchableOpacity} from "react-native";

interface SelectablesProps {
    items: string[] | [];
    value: string;
    onChange(value: string): void;
}

const Selectables = ({
    items = [],
    value,
    onChange,
}:SelectablesProps) => {
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
                        <TouchableOpacity key={index}
                            className={`${selected === it?'text-primary-dark border bg-primary-light'
                                                         :'text-primary-light bg-primary-dark/80'}
                                         rounded-2xl center-x pb-1 mr-2 my-3 px-[24]` }
                            onPress={() => {setSelected(it); onChange(it); }}
                        >
                            <Text className={`${selected === it ? 'text-primary-dark' : 'text-primary-light'}`}
                            >{it}</Text>
                       </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

export default Selectables;

