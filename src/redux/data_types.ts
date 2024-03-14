import data from "./shop.json"
export type TAdvertise = typeof data.advertises[number];
export type TProduct = typeof data.products[number];
export type TFavorite = typeof data.favorites[number];
export type TDisplay = typeof data.displays[number];
export type TCategory = typeof data.categories[number];
export type TSubCategory = typeof data.sub_categories[number];
export type TBagItem = typeof data.bagItems[number];
export type TUser = typeof data.users[number];
export type TAddress = typeof data.users[number]['shipping_addresses'][number];
//export type TOrder = typeof data.users[number];
//export type TUser = typeof data.users[number];
//export type TUser = typeof data.users[number];


export default data;

export interface TItem {
    id: number
    value: number
  }

export enum SIZES {
    S = "S",
    M = "M",
    L = "L",
    XL = "XL"
}

export enum OrderStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAILURE = "FAILURE",
    CANCELLED = "CANCELLED"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export type Product = {
    id: number
    name: string
    display_name: string
    thumbnail: string | null
    images: string[] | [] 
    price: number
    has_color: boolean
    has_size: boolean
    color: string[]
    sizes: string[]
    details: {
        title: string
        detail_list: string[] | []
    },
    brand: {
        name: string
        display_name: string
    }
    number_reviews: number
    number_views: number
    number_sold: number
    is_in_stock: boolean
    is_discount: boolean
    avg_rating: number
    is_new: boolean
    discount: {
        percentage: number
    }
    category: Category 
    sub_category: SubCategory 
}


export type Category = {
    id :number
    name: string
    display_name: string
    sub_categories: SubCategory[]
    number_product: number
}

export type SubCategory = {
    id: number
    name: string
    display_name: string
    image:string
    category: Category | number
}

export type ShippingAddress = {
    id: number
    full_name: string
    city: string
    state: string
    address: string
    country: string
    zip_code: number
    is_default: boolean
}

export type Review = {
    id: number
    product: number
    user: {
        name: string
    }
    title: string
    description: string
    rating: number
}

export type Order = {
    id: number
    user: number
    date: string
    tracking_number: string
    order_items: OrderItem[]
    status: OrderStatus
    total_amount: number
}

export type OrderItem = {
    product: Product
    quantity: number
    color: string
    size: string
}

export type User = {
    id: number
    first_name: string
    last_name: string
    email: string
    gender: Gender
    avatar: string | null
    is_verified: boolean
    shipping_addresses: ShippingAddress[] | []
    orders: Order[] | []
    reviews: Review [] | []
}