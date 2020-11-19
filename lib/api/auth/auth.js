import client from '../client';
import AsyncStorage from '@react-native-community/async-storage';

export const login = (loginInfo) =>{
    console.log(loginInfo)
    return client.post('/user/login',loginInfo);
}

export const signup = (signUpInfo) =>
    client.post('/user/signup',signUpInfo);

export const logout = () =>
    client.post('/user/logout');

export const authCheck = async () =>{
    return client.post('/user/authCheck')
    // try {
    //     const userToken = await AsyncStorage.getItem('userToken');
    //     console.log("USER TOKEN")
    //     console.log(userToken)
    //     console.log("USER TOKEN")
    //     let headers = {};
    //     if (userToken !== null) {
    //         headers = {
    //             headers: {
    //                 Authorization: `Bearer ${userToken}`
    //             }
    //         }
    //     }
    //     return client.post('/user/authCheck',null)
    // } catch (error) {
    //     // Error retrieving data
    // }
}
