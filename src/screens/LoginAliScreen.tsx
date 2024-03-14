import {useEffect,useState} from "react";
import {Dimensions,View,Text,TouchableOpacity,Alert,Image } from "react-native";
import {LoginAliScreenProps} from "../navigation/ScreensNavigationRouteProps";
import Input from "../components/forms/form_elements/Input";
import Button from "../components/forms/form_elements/Button";
import {Avatar} from "react-native-paper";
const wx_logo = require('../../assets/wx_logo.png');
const alipay = require('../../assets/alipay.png')
//import * as aliSDK from '../../packages/rn-onepass-alibaba';

export const LoginAliScreen = ({
    navigation,
    route,
}:LoginAliScreenProps) => {
    const [isValid,setIsValid] = useState(false);
    const [phone,setPhone] = useState('');
    //const [onePass,SetOnePass] = useState(false);
    const [initSuccess,SetinitSuccess] = useState(false);

    var listerens = [];

    const init = async () => {
        try {
            const init = await aliSDK.init('this.key');
            console.log('init',init);
            SetinitSuccess(true);
            const available = await aliSDK.checkEnvAvailable(1);
            console.log('available',available);
            await aliSDK.prefetch();
        } catch (error) {
            console.log('error', error);
        }
    };


    useEffect(()=>{
        init();
        listerens = [
            aliSDK.addListener(aliSDK.EVENTS.onTokenSuccess, async (data:any) => {
                try {
                    console.log('onTokenSuccess', data);
                    const {code, msg, requestCode, token, vendorName} = data;
                    //const numberCode = Number(code);
                    if (code === aliSDK.RESULT_CODES["600000"]) {
                        //this.insert('token', token);
                        await aliSDK.hideLoginLoading();
                        await aliSDK.quitLoginPage();
                    } else if (code === aliSDK.RESULT_CODES["700001"]) {
                        //this.insert('token', msg);
                        await aliSDK.quitLoginPage();
                    } else {
                        console.log('token', msg);
                    }
                } catch (error) {
                    console.error('捕获错误', error);
                }
            }),
            aliSDK.addListener(aliSDK.EVENTS.onTokenFailed, (data:any) => {
                try {
                    console.log('onTokenFailed', data);
                    const {code, msg, requestCode, token, vendorName} = data;
                    Alert.alert('温馨提示', msg);
                } catch (error) {
                    console.error('捕获错误', error);
                }
            })
        ]
        return(
            listerens.forEach(item => item.remove())
        )
    },[])

    const getOffsetY = (y:number) => {
        return Math.floor(Dimensions.get('window').height * (y - 60) / 650)
    }
   

    const onePass = async () => {
        const operatorType = await aliSDK.getOperatorType();
        console.log('operatorType', operatorType);
        const config = {
        //状态栏
            statusBarColor: '#FFFFFF',
            lightColor: true,
            statusBarHidden: false,
            // 弹窗使用
            dialogHeightDelta: 100,
            alertBarHidden: true,
            alertBarCloseImgPath: 'onepass_close_btn',
            alertBarCloseImgWidth: 30,
            alertBarCloseImgHeight : 30,
            privacyBottomOffetY:getOffsetY(325),
            // 标题栏
            navColor: '#FFFFFF',
            navTextColor: '#333333',
            navText: '登录',
            navTextSize: 18,
            webNavColor: '#FFFFFF',
            webNavTextColor: '#333333',
            webNavTextSize: 18,
            navReturnImgPath: 'back_icon',
            // navReturnImgWidth: 48,
            // navReturnImgHeight: 48,
            // logo
            logoImgPath: 'app_logo',
            logoHidden: false,
            logoWidth: 80,
            logoHeight: 80,
            logoOffsetY: getOffsetY(175),
            // 手机号掩码
            numberColor: '#333333',
            numberSize: 25,
            numberFieldOffsetY: getOffsetY(300),
            // slogan
            sloganText: `${operatorType}提供认证服务`,
            sloganTextColor: '#B2B2B2',
            sloganTextSize: 13,
            sloganOffsetY: getOffsetY(384),
            // 登录按钮
            logBtnText: '本机号码一键登录',
            logBtnTextColor: '#FFFFFF',
            logBtnTextSize: 18,
            // ios
            logBtnBackgroundPaths: ['onepass_login_btn_normal', 'onepass_login_btn_press', 'onepass_login_btn_unable'],
            // android
            logBtnBackgroundPath: 'login_btn_bg',
            logBtnMarginLeftAndRight: 35,
            logBtnOffsetY: getOffsetY(417),
            // 其他登录方式
            switchAccText: '其他登录方式',
            switchAccTextSize: 15,
            switchAccTextColor: '#0EA8FF',
            switchOffsetY: getOffsetY(492),
            // 协议栏
            privacyBefore: '登录即同意',
            privacyEnd: '并授权获取本机号码',
            checkboxHidden: true,
            privacyState: true,
            appPrivacyOneName: '《智慧好医生APP协议》',
            appPrivacyOneUrl: 'https://www.baidu.com',
            vendorPrivacyPrefix: '《',
            vendorPrivacySuffix: '》',
            privacyTextSize: 12,
            appPrivacyBaseColor: '#B2B2B2',
            appPrivacyColor: '#0EA8FF',
        };
        console.log('App.onePass()', config);
        await aliSDK.setUIConfig(config);
        console.log('UI初始化完成', "");
        await aliSDK.onePass();
    };

    const onPress = () => {
        console.log('hello');
        init();
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
            
        </View>
    )
}

 