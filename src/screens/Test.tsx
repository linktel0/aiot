import {useEffect,useState} from "react";
import { Dimensions,View,Text,TouchableOpacity,Alert } from "react-native";
import {TestScreenProps} from "../navigation/ScreensNavigationRouteProps";
import {getApiVersion, 
        registerApp, 
        openWXApp, 
        sendAuthRequest, 
        shareText } from 'react-native-wechat-lib';

const Test = ({
    navigation,
    route,
}:TestScreenProps) => {

    const [versionNumber, setVersionNumber] = useState<string | undefined>();


  const register = () => {
    console.log('register');

     registerApp('wx7973caefdffba1b8', 'universalLink').then((res) => {
        console.log("registerApp: " + res);
        getApiVersion().then((num) => {
            console.log("test: " + num)
            setVersionNumber(num)
            // openWXApp().then()
        });
      })
  }

  const  onLogin = () =>{
    console.log('login');
   sendAuthRequest('snsapi_userinfo', '')
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

  const onWXapp = () => {
    console.log('onWXapp');
    //const openWXApp = require('react-native-wechat-lib')
    
    openWXApp().then()
  }

  const onShareText = () => {
    console.log('onShareText');
    
    shareText({
      text: 'test content.',
      scene: 0
    }).then()
  }

    return (
        <View className="w-full h-full bg-white justify-center items-center">
            <Text className="mt-40 text-xl opacity-60">Call wechat SDK demo</Text>
            <Text className="opacity-60">
                Version: {versionNumber}
            </Text>
            <View className="mt-20 w-full p-6 justify-center items-center">
                <TouchableOpacity onPress={() => { register() }} >
                    <Text>注册服务</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onWXapp() }} >
                    <Text>拉起微信</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onLogin() }} >
                    <Text>授权登录</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onShareText() }} >
                    <Text>分享</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Test;

 