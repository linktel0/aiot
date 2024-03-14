import {useEffect,useState} from "react";
import { Dimensions,View,Text,TouchableOpacity,Alert,Image } from "react-native";
import {LoginMobileScreenProps} from "../navigation/ScreensNavigationRouteProps";
import Input from "../components/forms/form_elements/Input";
import Button from "../components/forms/form_elements/Button";
import {Avatar} from "react-native-paper";
const wx_logo = require('../../assets/wx_logo.png');
const alipay = require('../../assets/alipay.png')

export const LoginMobileScreen = ({
    navigation,
    route,
}:LoginMobileScreenProps) => {
    const [isValid,setIsValid] = useState(false);
    const [phone,setPhone] = useState('');

    useEffect(() => {
        setIsValid(true);
    }, []);

    const onPress = () => {
        console.log('hello');
    }

    return (
        <View className="h-full w-full justify-center items-center">
            <Image  className="w-72 h-72" 
                source={require("../../assets/adaptive-icon.png")}
            />
            <View className="my-5 px-6 w-full ">
                <Text className="mt-4 text-base">请输入手机号</Text>
                <Input
                    placeholder="13916396951"
                    error={isValid?'':'号码错'}
                ></Input>
                <Button
                    isValid = {isValid}
                    title ={'登 录'}
                    onPress={onPress}
                />

            </View>
            <View className="mt-2 w-full justify-center items-center ">
                <Text className="mt-4 opacity-60">其他登录方式</Text>
                <View className="flex-row justify-between p-6 w-4/6">
                    <TouchableOpacity onPress={() => { navigation.navigate("LoginWechat")}} >
                        <Avatar.Image source={wx_logo} size={48} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("LoginAli") }} >
                        <Avatar.Image source={alipay} size={48} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsValid(!isValid) }} >
                        <Avatar.Icon icon='lock' size={48} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

 