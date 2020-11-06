import {call, put,fork} from 'redux-saga/effects'
import {startLoading, finishLoading} from "../store/loading";
import React from "react";
import Dialog from 'react-native-dialog';
import {Alert} from 'react-native';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type, request) {

    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action){

        function wrappedAlert() {
            return new Promise(resolve => {
                Alert.alert(
                    "No connection",
                    "네트워크 연결 중 문제가 발생했씁니다",
                    [{text: "OK", onPress: resolve }], // I want this function to make Saga continue
                    {cancelable: true},
                )
            });
        }

        yield put(startLoading(type));
        try{
            const response = yield call(request, action.payload)
            console.log(response.data)
            yield put({
                type:SUCCESS,
                payload:response.data,
            })
        }catch(e){
            console.log("====ERROR 발생====")
            console.log(e)
            console.log(e.code)
            console.log("====ERROR 발생====")


            // e.response.data = "문자게 발생했습니다";
            console.log(e.response)
            const error = {
                response:{
                    data:"문제가 발생했습니다."
                }
            }

            if(e.code == 'ECONNABORTED'){
                yield put({
                    type:FAILURE,
                    payload:error,
                    error:true,
                })
                yield call(wrappedAlert);
            }else{
                yield put({
                    type:FAILURE,
                    payload:e,
                    error:true,
                })
            }

        }
        yield put(finishLoading(type))
    }
}
