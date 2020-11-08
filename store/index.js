import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects'
import auth,{authSaga} from './auth/auth';
import company,{companySaga} from './company/company';
import member,{memberSaga} from './member/member';
import commute,{commuteSaga} from './commute/commute';

import loading from './loading';

const rootReducer = combineReducers({
    auth,company,member,commute,loading
})

export function* rootSaga(){
    yield all ([authSaga(),companySaga(),memberSaga(),commuteSaga()]);

}

export default rootReducer;
