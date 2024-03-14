import { CompositeNavigationProp, RouteProp } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"

import { AppStackParamList, AuthStackParamList, MainStackParamList } from "./ParmListTypes"

type AuthenticationScreenRouteProp = RouteProp<AppStackParamList, 'AuthenticationScreen'>;
type AuthenticationScreenNavigationProp = StackNavigationProp<
    AppStackParamList,
    'AuthenticationScreen'
  >;
  
export type AuthenticationScreenProps = {
    route: AuthenticationScreenRouteProp;
    navigation: AuthenticationScreenNavigationProp;
 };


export type AdvertiseScreenNavigationProps = StackNavigationProp<AppStackParamList, 'Advertise'>
export type AdvertiseScreenRouteProps = RouteProp<
    AppStackParamList, 
    'Advertise'
>

export type AdvertiseScreenProps = {
    route: AdvertiseScreenRouteProps;
    navigation: AdvertiseScreenNavigationProps;
 };


// Auth Stack Navigation Props

type LoginScreenRouteProps = RouteProp<AuthStackParamList, 'Login'>
type LoginScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, 'Login'>,
    StackNavigationProp<AppStackParamList>
>
export interface LoginScreenProps {
    navigation: LoginScreenNavigationProps;
    route: LoginScreenRouteProps;
}

type LoginAliScreenRouteProps = RouteProp<AuthStackParamList, 'LoginAli'>
type LoginAliScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, 'LoginAli'>,
    StackNavigationProp<AppStackParamList>
>
export interface LoginAliScreenProps {
    navigation: LoginAliScreenNavigationProps;
    route: LoginAliScreenRouteProps;
}

type LoginWEchatScreenRouteProps = RouteProp<AuthStackParamList, 'LoginWechat'>
type LoginWechatScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, 'LoginWechat'>,
    StackNavigationProp<AppStackParamList>
>
export interface LoginWechatScreenProps {
    navigation: LoginWechatScreenNavigationProps;
    route: LoginWEchatScreenRouteProps;
}

type LoginMobileScreenRouteProps = RouteProp<AuthStackParamList, 'LoginMobile'>
type LoginMobileScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, 'LoginMobile'>,
    StackNavigationProp<AppStackParamList>
>
export interface LoginMobileScreenProps {
    navigation: LoginMobileScreenNavigationProps;
    route: LoginMobileScreenRouteProps;
}


// Main Stack Props
/*
export type ComponentsScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Components'>,
    StackNavigationProp<AppStackParamList>
>
*/
type HomeScreenRouteProps = RouteProp<MainStackParamList, 'Home'>
type HomeScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Home'>,
    StackNavigationProp<AppStackParamList>
>
export interface HomeScreenProps {
    navigation: HomeScreenNavigationProps;
    route: HomeScreenRouteProps;
}

type BagScreenRouteProps = RouteProp<MainStackParamList, 'Bag_Main'>
type BagScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Bag_Main'>,
    StackNavigationProp<AppStackParamList>
>
export interface BagScreenProps {
    navigation: BagScreenNavigationProps;
    route: BagScreenRouteProps;
}

type FavoriteScreenRouteProps = RouteProp<MainStackParamList, 'Favorite_Main'>
type FavoriteScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Favorite_Main'>,
    StackNavigationProp<AppStackParamList>
>
export interface FavoriteScreenProps {
    navigation: FavoriteScreenNavigationProps;
    route: FavoriteScreenRouteProps;
}

//----
type ShopScreenRouteProps = RouteProp<MainStackParamList, 'Shop_Main'>
type ShopScreenScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Shop_Main'>,
    StackNavigationProp<AppStackParamList>
>
export interface ShopScreenProps {
    navigation: ShopScreenScreenNavigationProps;
    route: ShopScreenRouteProps;
}



type ProductDetailScreenRouteProps = RouteProp<MainStackParamList, 'Shop_Product_Detail'>
type ProductDetailScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Shop_Product_Detail'>,
    StackNavigationProp<AppStackParamList>
>

export interface ProductDetailProps {
    navigation: ProductDetailScreenNavigationProps;
    route: ProductDetailScreenRouteProps;
}

type SearchScreenRouteProps = RouteProp<MainStackParamList, 'Shop_Search'>
type SearchScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Shop_Search'>,
    StackNavigationProp<AppStackParamList>
>

export interface SearchScreenProps {
    navigation: SearchScreenNavigationProps;
    route: SearchScreenRouteProps;
}

type CategoryScreenRouteProps = RouteProp<MainStackParamList, 'Shop_Category'>
type CategoryScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Shop_Category'>,
    StackNavigationProp<AppStackParamList>
>

export interface CategoryScreenProps {
    navigation: CategoryScreenNavigationProps;
    route: CategoryScreenRouteProps;
}

// ----
type ProfileScreenRouteProps = RouteProp<MainStackParamList, 'Profile_Main'>
type ProfileScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_Main'>,
    StackNavigationProp<AppStackParamList>
>

export interface ProfileScreenProps {
    navigation: ProfileScreenNavigationProps;
    route: ProfileScreenRouteProps;
}

type ShippingAddressesScreenRouteProps = RouteProp<MainStackParamList, 'Profile_ShippingAddresses'>
type ShippingAddressesScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_ShippingAddresses'>,
    StackNavigationProp<AppStackParamList>
>
export interface ShippingAddressesScreenProps {
    navigation: ShippingAddressesScreenNavigationProps;
    route: ShippingAddressesScreenRouteProps;
}

type OrdersScreenRouteProps = RouteProp<MainStackParamList, 'Profile_Orders'>
type OrdersScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_Orders'>,
    StackNavigationProp<AppStackParamList>
>
export interface OrdersScreenProps {
    navigation: OrdersScreenNavigationProps;
    route: OrdersScreenRouteProps;
}

type OrderDetailScreenRouteProps = RouteProp<MainStackParamList, 'Profile_Order_Detail'>
type OrderDetailScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_Order_Detail'>,
    StackNavigationProp<AppStackParamList>
>
export interface OrderDetailScreenProps {
    navigation: OrderDetailScreenNavigationProps;
    route: OrderDetailScreenRouteProps;
}


export type UserReviewsScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_Reviews'>,
    StackNavigationProp<AppStackParamList>
>

type SettingScreenRouteProps = RouteProp<MainStackParamList, 'Profile_Settings'>
type SettingScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_Settings'>,
    StackNavigationProp<AppStackParamList>
>

export interface SettingScreenProps {
    navigation: SettingScreenNavigationProps;
    route: SettingScreenRouteProps;
}

type NewShippingAddressScreenRouteProps = RouteProp<MainStackParamList, 'Profile_New_Address'>
type NewShippingAddressScreenNavigationProps = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Profile_New_Address'>,
    StackNavigationProp<AppStackParamList>
>

export interface NewShippingAddressScreenProps {
    navigation: NewShippingAddressScreenNavigationProps;
    route: NewShippingAddressScreenRouteProps;
}



// Auth Stack route Props

export type RegisterScreenRouteProps = RouteProp<AuthStackParamList, 'Register'>


// Main Stack route props

export type ComponentsScreenRouteProps = RouteProp<MainStackParamList, 'Home'>


// ----

export type UserReviewsScreenRouteProps = RouteProp<MainStackParamList, 'Profile_Reviews'>
export type NewShippingAddessScreenRouteProps = RouteProp<MainStackParamList, 'Profile_New_Address'>

