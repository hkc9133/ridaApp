import {call, put,fork} from 'redux-saga/effects'
import {startLoading, finishLoading} from "../store/loading";
import React from 'react';
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

        function authAlert() {
            return new Promise(resolve => {
                Alert.alert(
                    "세션이 만료되었습니다",
                    "로그인 후 이용해주세요",
                    [{text: "OK", onPress: resolve }], // I want this function to make Saga continue
                    {cancelable: true},
                )
            });
        }

        function permitAlert() {
            return new Promise(resolve => {
                Alert.alert(
                    "사용 권한이 없습니다",
                    "회사를 선택해주세요",
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
            console.log(e.response)
            console.log(e.code)
            console.log("====ERROR 발생====")

            const error = {
                response:{
                    data:"문제가 발생했습니다."
                }
            }

            if(type != 'auth/AUTH_CHECK' && e.response.status == 401){
                yield put({
                    type:'auth/INITIALIZE',
                    payload:error,
                    error:true,
                })
                yield call(authAlert);
            }

            if(e.response.status == 403){
                yield put({
                    type:'company/INITIALIZE_COMPANY',
                    payload:error,
                    error:true,
                })
                yield call(permitAlert);
            }

            if(e.code == 'ECONNABORTED'){
                console.log("여기")
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
