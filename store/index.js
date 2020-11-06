import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects'
import auth,{authSaga} from './auth/auth';
import company,{companySaga} from './company/company';
import member,{memberSaga} from './member/member';

import loading from './loading';

const rootReducer = combineReducers({
    auth,company,member,loading
})

export function* rootSaga(){
    yield all ([authSaga(),companySaga(),memberSaga()]);

}

export default rootReducer;
