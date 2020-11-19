import client from '../client';
import AsyncStorage from '@react-native-community/async-storage';

export const getCompanyList = () =>{
    return client.get('/company/list');
}

export const createCompany = (companyName) =>{
    return client.post('/company/create',companyName);
}

export const joinCompany =  (joinCode) =>{
    return client.post(`/company/join`,joinCode);
}

export const selectCompany =  (id) =>{
    return client.get(`/company/selectCompany?companyId=${id}`);
}
