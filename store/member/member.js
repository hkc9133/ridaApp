import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as memberAPI from '../../lib/api/member/member';
import AsyncStorage from '@react-native-community/async-storage';

const [SELECT_COMPANY,SELECT_COMPANY_SUCCESS, SELECT_COMPANY_FAILURE] = createRequestActionTypes('member/SELECT_COMPANY')
const INITIALIZE = 'member/INITIALIZE';


// export const selectCompany = createAction(SELECT_COMPANY,(id)=>(id));
export const initialize = createAction(INITIALIZE);

// const selectCompanySaga = createRequestSaga(SELECT_COMPANY, memberAPI.selectCompany);

export function* memberSaga(){
    // yield takeLatest(SELECT_COMPANY, selectCompanySaga);
}

const initialState = {
    // selectCompany:{
    //     companyId:null,
    //     result:null,
    //     error:null
    // }
};

const member = handleActions(
    {
        // [SELECT_COMPANY_SUCCESS]: (state, {payload: response}) =>
        //     produce(state,draft => {
        //         draft.selectCompany.companyId = response.data.companyId;
        //         draft.selectCompany.result = true;
        //         draft.selectCompany.error = false;
        //         AsyncStorage.setItem('userToken', response.data.token);
        //         AsyncStorage.setItem('companyId', response.data.companyId);
        //     }),
        //
        // [SELECT_COMPANY_FAILURE]: (state, {payload: error}) =>
        //     produce(state, draft => {
        //         draft.selectCompany.result = false;
        //         draft.selectCompany.error = error.response.data;
        //         AsyncStorage.clear();
        //     }),
        // [INITIALIZE]: (state, {payload: form}) => ({
        //     ...initialState
        // }),
    },
    initialState
);
export default member;
