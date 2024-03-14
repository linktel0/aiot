import { ReactNode } from "react";
import {
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    TextStyle,
    View,Text
} from "react-native";


interface InputProps {
    placeholder: string;
    icon?: ReactNode;
    textInputStyle?: StyleProp<TextStyle>;
    textInputProps?: TextInputProps;
    password?: boolean;
    elevation?: number;
    inputRef?: React.LegacyRef<TextInput> | undefined;
    onBlur?:
        | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
        | undefined;
    error?: string;
}

const Input = ({
    placeholder,
    icon,
    textInputStyle,
    textInputProps,
    password,
    elevation,
    inputRef,
    onBlur,
    error,
}:InputProps) => {
    return (
        <View>
            <View
                className="bg-white p-3 rounded-lg flex-row justify-between items-center border-2 border-primary"
            >
                <TextInput
                    onBlur={onBlur}
                    ref={inputRef}
                    placeholder={placeholder}
                    secureTextEntry={password}
                />
                {icon && icon}
            </View>
            {error  
                ? <Text className="mx-4 text-primary description">
                    {error}
                </Text>
                :<Text/>
        
            }
        </View>
    );
};

export default Input;
