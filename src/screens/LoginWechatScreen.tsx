import {useEffect,useState} from "react";
import { Dimensions,View,Text,TouchableOpacity,Alert,Image } from "react-native";
import {LoginWechatScreenProps} from "../navigation/ScreensNavigationRouteProps";
import Input from "../components/forms/form_elements/Input";
import Button from "../components/forms/form_elements/Button";
import {Avatar} from "react-native-paper";
//import * as wechat  from '../../packages/react-native-wechat-lib';
//import * as wechat  from 'react-native-wechat-lib';

export const LoginWechatScreen = ({
    navigation,
    route,
}:LoginWechatScreenProps) => {
    const [isValid,setIsValid] = useState(false);
    const [phone,setPhone] = useState('');
    const [versionNumber, setVersionNumber] = useState<string | undefined>();

    useEffect(() => {
        setIsValid(true);
    }, []);
{/*
    const onRegisterApp = () => {
        console.log('hello');
        wechat.registerApp('wx7973caefdffba1b8', 'universalLink').then((res) => {
            console.log("registerApp: " + res)
            wechat.getApiVersion().then((num) => {
                console.log("test: " + num)
                setVersionNumber(num)
                // openWXApp().then()
            })
        });                                                                                                                                                                             
    };

    const onLogin = () => {
        wechat.sendAuthRequest('snsapi_userinfo', '')
        .then((response: any) => {
            // todo 登录 response.code
            Alert.alert('登录成功，code: ' + response.code)
        })
        .catch(error => {
            console.log(error)
            let errorCode = Number(error.code);
            if (errorCode === -2) {
            Alert.alert('已取消授权登录')
            } else {
            Alert.alert('微信授权登录失败')
            }
        });

    }

    const onShareText = () => {
        wechat.shareText({
            text: 'test content.',
            scene: 0
        }).then()
    }

    const onPress = () => {
        console.log('hello');
    }
*/}
    return (
        <View className="h-full w-full justify-center items-center">
            <Text >Call wechat SDK demo</Text>
            <Text >
                Version: {versionNumber}
            </Text>
            <View >
                <TouchableOpacity  onPress={() => { onRegisterApp() }} >
                    <Text>注册服务</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { wechat.openWXApp().then() }} >
                    <Text>拉起微信</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { onLogin() }} >
                    <Text>授权登录</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => { onShareText() }} >
                    <Text>分享</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

 