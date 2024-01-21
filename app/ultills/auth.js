import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = () => {
  let result = '';
  AsyncStorage.getItem('access_token').then(res => (result = res));
  return result || '';
};
export const saveAccessToken = async token => {
  await AsyncStorage.setItem('access_token', token);
};
export const saveProfileTo = async profile => {
  await AsyncStorage.setItem('profile', JSON.stringify(profile));
};
export const getProfile = async () => {
  let result = {};
  await AsyncStorage.getItem('profile').then(res => (result = JSON.parse(res)));
  return result;
};
export const removeProfile = async () => {
  await AsyncStorage.clear();
};
