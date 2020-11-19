import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as companyAPI from '../../lib/api/company/company';
import * as memberAPI from '../../lib/api/member/member';
import AsyncStorage from '@react-native-community/async-storage';

const [GET_COMPANY_LIST,GET_COMPANY_LIST_SUCCESS, GET_COMPANY_LIST_FAILURE] = createRequestActionTypes('company/GET_COMPANY_LIST')
const [CREATE_COMPANY,CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE] = createRequestActionTypes('company/CREATE_COMPANY')
const [JOIN_COMPANY,JOIN_COMPANY_SUCCESS, JOIN_COMPANY_FAILURE] = createRequestActionTypes('company/JOIN_COMPANY')
const [SELECT_COMPANY,SELECT_COMPANY_SUCCESS, SELECT_COMPANY_FAILURE] = createRequestActionTypes('company/SELECT_COMPANY')
const INITIALIZE = 'company/INITIALIZE';
const INITIALIZE_COMPANY = 'company/INITIALIZE_COMPANY';
const SETTING_COMPANY = 'company/SETTING_COMPANY';


export const getCompanyList = createAction(GET_COMPANY_LIST);
export const joinCompany = createAction(JOIN_COMPANY,(joinCode)=> (joinCode));
export const createCompany = createAction(CREATE_COMPANY,(companyName)=> (companyName));
export const selectCompany = createAction(SELECT_COMPANY,(id)=>(id));
export const initialize = createAction(INITIALIZE);
export const initializeCompany = createAction(INITIALIZE_COMPANY);
export const settingCompany = createAction(SETTING_COMPANY, (companyId)=>(companyId));

const joinCompanyListSaga = createRequestSaga(JOIN_COMPANY, companyAPI.joinCompany);
const getCompanyListSaga = createRequestSaga(GET_COMPANY_LIST, companyAPI.getCompanyList);
const createCompanySaga = createRequestSaga(CREATE_COMPANY, companyAPI.createCompany);
const selectCompanySaga = createRequestSaga(SELECT_COMPANY, companyAPI.selectCompany);

export function* companySaga(){
    yield takeLatest(JOIN_COMPANY, joinCompanyListSaga);
    yield takeLatest(CREATE_COMPANY, createCompanySaga);
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
    },
    create:{
        result:null
    },
    join:{
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
        [CREATE_COMPANY_SUCCESS]: (state, {payload: response}) =>
            produce(state, draft => {
                draft.create.result = true;
            }),
        [CREATE_COMPANY_FAILURE]: (state, {payload: error}) =>
            produce(state, draft => {
                draft.create.result = false;
            }),
        [JOIN_COMPANY_SUCCESS]: (state, {payload: response}) =>
            produce(state, draft => {
                draft.join.result = true;
                draft.join.error = null;
            }),
        [JOIN_COMPANY_FAILURE]: (state, {payload: error}) =>
            produce(state, draft => {
                draft.join.result = false;
                draft.join.error = error.response.data.message;
            }),
        [SELECT_COMPANY_SUCCESS]: (state, {payload: response}) =>
            produce(state,draft => {
                draft.selectCompany.companyId = response.data.companyId;
                draft.selectCompany.result = true;
                draft.selectCompany.error = false;
                AsyncStorage.setItem('COMPANY_ID', response.data.companyId);
            }),

        [SELECT_COMPANY_FAILURE]: (state, {payload: error}) =>
            produce(state, draft => {
                draft.selectCompany.result = false;
                draft.selectCompany.error = error.response.data;
                AsyncStorage.removeItem('COMPANY_ID');
            }),
        [SETTING_COMPANY]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.selectCompany.companyId = id;
                draft.selectCompany.result = true;
            }),
        [INITIALIZE_COMPANY]: (state, {payload: form}) =>
            produce(state, draft => {
                draft.selectCompany.companyId = initialState.selectCompany.companyId;
                draft.selectCompany.result = initialState.selectCompany.result;
                draft.selectCompany.error = initialState.selectCompany.error;
                AsyncStorage.removeItem('COMPANY_ID');
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
