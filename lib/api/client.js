import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {authCheck} from '../../store/auth/auth';

const client = axios.create();
client.defaults.baseURL = 'http://192.168.25.34:8080';
client.defaults.timeout = 5000;

// client.defaults.baseURL = 'http://210.103.188.119:8080';
// client.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem('userToken');

// axios.interceptors.response.use();

client.interceptors.request.use(async function (config) {
            try {
                // const userToken = await AsyncStorage.getItem('companyToken');
                // console.log(userToken)
                // console.log(config)
                // if (userToken !== null) {
                //     config.headers.Authorization = `Bearer ${userToken}`;
                // }
            } catch (error) {
                // Error retrieving data
            }
        return config;
    },
    function (error) {
        return Promise.reject (error);
    }
);

export default client;
