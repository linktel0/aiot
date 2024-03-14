import { NavigatorScreenParams } from "@react-navigation/core"
import { ImageSourcePropType } from "react-native"
import { Category, Order, Product, ShippingAddress } from "../redux/data_types"

export type AppStackParamList = {
    AuthenticationScreen: undefined
    Advertise: undefined
    Auth: NavigatorScreenParams<AuthStackParamList>
    Main: NavigatorScreenParams<MainStackParamList>
}

export type AuthStackParamList = {
    LoginAli: undefined
    LoginWechat: undefined
    LoginMobile: undefined
    Login: undefined
    Register: undefined
    ResetPassword: undefined
}

export type MainStackParamList = {
    Components: undefined
    Home: undefined
    Bag_Main: undefined
    Favorite_Main: undefined
    
    Profile_Main: undefined
    Profile_Orders: undefined
    Profile_Order_Detail: {
        order: Order
    }
    Profile_ShippingAddresses: undefined
    Profile_Reviews: undefined
    Profile_Settings: undefined
    Profile_New_Address: {
        shipping_address: ShippingAddress | null
    }
    
    Shop_Main: undefined
    Shop_Category: {
        category: Category & {image: string}
    }
    Shop_Search: {
        search_term: string | undefined
    }
    Shop_Product_Detail: {
        item: Product
    } 
}

