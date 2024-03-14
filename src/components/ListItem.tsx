import React, { ReactNode } from "react";
import { StyleSheet,View, Text } from "react-native";


interface ListItemProps {
    left_icon?: ReactNode;
    right_icon?: ReactNode;
    title: string;
    description: string;
}

const ListItem = ({
    title,
    description,
    left_icon,
    right_icon,
}:ListItemProps) => {
    return (
        <View className="between-x rounded-xl my-4 p-2 bg-primary-light">
            <View className="center-x">
                {left_icon && left_icon}
                <View className="justify-center mx-4">
                    <Text className="font-bold"> {title} </Text>
                    <Text className="opacity-70"> {description} </Text>
                </View>
            </View>
            {right_icon && right_icon}
        </View>
    );
};

export default ListItem;
