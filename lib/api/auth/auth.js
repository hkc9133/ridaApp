import client from '../client';

export const login = (loginInfo) =>

    client.post('/user/login',loginInfo);

export const signup = (signUpInfo) =>
    client.post('/user/signup',signUpInfo);

export const logout = ({userId, password}) =>
    client.post('/user/login',{userId,password});

export const authCheck = () =>{
    return client.post('/user/authCheck')
}
