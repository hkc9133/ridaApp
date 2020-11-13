import React,{useEffect}from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AgendaView from 'react-native-calendars/src/agenda';
import CookieManager from '@react-native-community/cookies';
import {url} from '../lib/api/client';
import {initializeCompany} from '../store/company/company';
import {useDispatch} from 'react-redux';
const CompanyRouter = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        CookieManager.get(url)
            .then((cookies) => {
                if(cookies['COMPANY_ID']['value'] == '' || cookies['COMPANY_ID']['value'] == null){
                    initCompany();
                }
            }).catch((a) =>{
            initCompany();
        });
    },[])

    const initCompany = async () => {
        try {
            dispatch(initializeCompany());
            await AsyncStorage.removeItem('COMPANY_ID');

            props.setCompany();
        }
        catch(error) {
            return false;
        }
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default CompanyRouter;
