import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
export default {
  storeData,
  getData,
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = `${currentDate.getMonth() + 1}`.padStart(2, "0"); // Months are zero-based
  const day = `${currentDate.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
