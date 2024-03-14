import React from "react";
import { TouchableOpacity,View,Text } from "react-native";

interface ButtonProps {
    isValid: boolean;
    title: string;
    onPress(): void
}

const Button = ({isValid, title, onPress}:ButtonProps) => {
    return (
        <TouchableOpacity 
            className={`w-full rounded-2xl justify-center items-center ${isValid?'bg-primary/90':'bg-primary/30'}`}
            onPress={onPress}>
                <Text className="body2 p-4" >
                    {title}
                </Text>
        </TouchableOpacity>
    );
};

export default Button;
