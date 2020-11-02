import {call, put} from 'redux-saga/effects'
import {startLoading, finishLoading} from "../store/loading";
import React from "react";

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type, request) {

    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action){
        yield put(startLoading(type));
        try{
            const response = yield call(request, action.payload)
            yield put({
                type:SUCCESS,
                payload:response.data,
            })
        }catch(e){
            console.log("====ERROR 발생====")
            console.log(e)
            console.log("====ERROR 발생====")
            // if(e.response.status === 403){
            // }
            yield put({
                type:FAILURE,
                payload:e,
                error:true,
            })
        }
        yield put(finishLoading(type))
    }
}
