import * as React from 'react';
import Waiting from '../components/Waiting';
import {AuthenticationScreenProps} from "../navigation/ScreensNavigationRouteProps";
import { View,Text,Alert} from "react-native";
import {Button,Avatar,Switch} from 'react-native-paper'
import * as asyncStore from '../storage/asyncStore';
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react';


export const AuthenticationScreen = ({ route, navigation }: AuthenticationScreenProps) =>{
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [sign, setSign] = useState('');
    const [isLoading, setIsLoading] = useState(false);
/*
    const verifyAvailableAuthentication= async()=>{
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log(
          'type ',
          types.map((type) => LocalAuthentication.AuthenticationType[type])
        );
      }


    useEffect(() => {
        verifyAvailableAuthentication();
    }, []);
  */  
    useEffect(()=>{
        const asyncRun = async()=>{
            setIsLoading(true);
            const mode = await asyncStore.getLoginMode();
            setSign(mode); 
            
            if(mode == 'unsign') {
                navigation.navigate("Advertise");
            }

            if(mode == 'sign') {
                authenticate();
            }
            setIsLoading(false);
        }
        asyncRun();
    },[])

    const authenticate = async () => {
        const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isBiometricEnrolled) {
          return Alert.alert(
            '登录',
            '未发现生物识别信息。 请在设备上注册.'
          );
        }
    
        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: '安全认证,指纹识别',
          fallbackLabel: "无法识别"
        })

        if(auth.success){
            await asyncStore.setLoginMode(isSwitchOn?'sign':'unsign');
            navigation.navigate("Advertise")
        }
    };
    
    const handleSwitch = () =>{
        setIsSwitchOn(!isSwitchOn);  
    }
    
   
    return (
     sign == ''
      ?<View className='center-x h-full w-full'><Waiting/></View>
      :<View className="mt-10 center-y h-full">
          <View>
            <Avatar.Image size={240} source={require("../../assets/icon.png")} />
          </View> 
          <Text className="text-2xl font-semibold mt-5"
          > 隐私保护 </Text>

          <Text className="text-lg mt-8"
          > 使用指纹识别 </Text>
          <Text
            className="text-lg"
          > 保护你的隐私 </Text>

          
          <View className="mx-16 mt-10">
            <View className="between-x w-full bg-primary/70 rounded-full">

                <View className="center-x">
                    {isSwitchOn
                    ?<Avatar.Icon size={52} icon="fingerprint" className="bg-primary/10 pl-4" /> 
                    :<Avatar.Icon size={52} icon="fingerprint-off" className="bg-primary/10 pl-4" /> }
                </View>
                
                <Button mode="contained" className="bg-primary/10"
                    onPress={() => handleSwitch()}>
                    指纹识别
                </Button>
                <Switch 
                    color='white' 
                    value={isSwitchOn} 
                    onValueChange={()=>handleSwitch()}
                />  
            </View>

            <Button className="bg-primary/90 p-1 mt-10 mb-20 rounded-full"
                mode="contained" onPress={() => authenticate()}>
                下一步
            </Button>  
          </View>       
        </View>
    );
}