import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInAsyncStorage = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error("Error saving data to AsyncStorage", e);
    }
};

export const getFromAsyncStorage = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving data from AsyncStorage", e);
        return null;
    }
};
