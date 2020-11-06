import client from '../client';
import AsyncStorage from '@react-native-community/async-storage';

export const getCompanyList = async () =>{
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
    //     return client.get('/company/list',headers);
    // } catch (error) {
    //     // Error retrieving data
    // }
    return client.get('/company/list');
}

export const selectCompany  = async (id) =>{
    return client.get(`/company/selectCompany?companyId=${id}`);
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
    //     return client.get(`/company/selectCompany?companyId=${id}`,headers);
    // } catch (error) {
    //     // Error retrieving data
    // }
}
