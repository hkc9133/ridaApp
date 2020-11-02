import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {authCheck} from '../../store/auth/auth';

const client = axios.create();
client.defaults.baseURL = 'http://127.0.0.1:8080';
// client.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem('userToken');

// axios.interceptors.response.use();

client.interceptors.request.use(async function (config) {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                console.log(userToken)
                if (userToken !== null) {
                    config.headers.Authorization = `Bearer ${userToken}`;
                }
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
