import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as companyAPI from '../../lib/api/company/company';
import * as memberAPI from '../../lib/api/member/member';
import AsyncStorage from '@react-native-community/async-storage';

const [GET_COMPANY_LIST,GET_COMPANY_LIST_SUCCESS, GET_COMPANY_LIST_FAILURE] = createRequestActionTypes('company/GET_COMPANY_LIST')
const [SELECT_COMPANY,SELECT_COMPANY_SUCCESS, SELECT_COMPANY_FAILURE] = createRequestActionTypes('company/SELECT_COMPANY')
const INITIALIZE = 'company/INITIALIZE';
const INITIALIZE_COMPANY = 'company/INITIALIZE_COMPANY';


export const getCompanyList = createAction(GET_COMPANY_LIST);
export const selectCompany = createAction(SELECT_COMPANY,(id)=>(id));
export const initialize = createAction(INITIALIZE);
export const initializeCompany = createAction(INITIALIZE_COMPANY);

const getCompanyListSaga = createRequestSaga(GET_COMPANY_LIST, companyAPI.getCompanyList);
const selectCompanySaga = createRequestSaga(SELECT_COMPANY, companyAPI.selectCompany);

export function* companySaga(){
    yield takeLatest(GET_COMPANY_LIST, getCompanyListSaga);
    yield takeLatest(SELECT_COMPANY, selectCompanySaga);
}

const initialState = {
    company:{
        list:null,
        error:null
    },
    selectCompany:{
        companyId:null,
        result:null,
        error:null
    }
};

const company = handleActions(
    {
        [GET_COMPANY_LIST_SUCCESS]: (state, {payload: response}) =>
            produce(state, draft => {
                draft.company.list = response.data;
                draft.company.error = false;
            }),

        [GET_COMPANY_LIST_FAILURE]: (state, {payload: error}) =>
            produce(state, draft => {
                draft.company.list = null;
                draft.company.error = error.response.data.data;
            }),
        [SELECT_COMPANY_SUCCESS]: (state, {payload: response}) =>
            produce(state,draft => {
                draft.selectCompany.companyId = response.data.companyId;
                draft.selectCompany.result = true;
                draft.selectCompany.error = false;
                AsyncStorage.setItem('companyToken', response.data.token);
                AsyncStorage.setItem('companyId', response.data.companyId);
            }),

        [SELECT_COMPANY_FAILURE]: (state, {payload: error}) =>
            produce(state, draft => {
                draft.selectCompany.result = false;
                draft.selectCompany.error = error.response.data;
                AsyncStorage.clear();
            }),
        [INITIALIZE_COMPANY]: (state, {payload: form}) =>
            produce(state, draft => {
                draft.selectCompany.companyId = initialState.selectCompany.companyId;
                draft.selectCompany.result = initialState.selectCompany.result;
                draft.selectCompany.error = initialState.selectCompany.error;
                AsyncStorage.removeItem('companyId');
                AsyncStorage.removeItem('companyToken');
            }),
        [INITIALIZE]: (state, {payload: form}) => ({
            ...initialState
        }),
    }
    ,
    initialState
);
export default company;
