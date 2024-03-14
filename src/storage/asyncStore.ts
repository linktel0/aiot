import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: string) => await AsyncStorage.setItem(key, value);
export const getItem = async (key: string) => {
    return await AsyncStorage.getItem(key);
}
export const removeItem = async (key: string) => await AsyncStorage.removeItem(key);

export const getLoginMode = async (): Promise<string> => {
    let mode = await getItem("loginMode");
    return mode?mode:'unknow';
}
export const setLoginMode = async (loginMode: string) => {
    await setItem("loginMode", loginMode);
}
