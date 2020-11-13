import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox} from 'react-native-elements';


FontAwesome.loadFont();
Feather.loadFont();

import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {authCheck, login, initialize} from '../store/auth/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {getSchedule} from '../store/schedule/schedule';

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const {user, loginLoading} = useSelector(({auth, loading}) => ({
        user: auth,
        loginLoading: loading['auth/LOGIN'],
    }));
    const [data, setData] = React.useState({
        userId: '',
        userPassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidLogin: true,
    });
    const [isIdSave, setIsIdSave] = useState(false);

    const {colors} = useTheme();
    useEffect(() => {
        // AsyncStorage.getItem("userId").then((userId) => {
        //     setData({
        //         ...data,
        //         userId:userId
        //     });
        // })
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const onChangeIdValue = (value) => {
        if (value.trim().length >= 5) {
            setData({
                ...data,
                userId: value,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                userId: value,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    useEffect(() => {
        if (!loginLoading && user.user.token == null && user.login.error !== null) {
            setData({
                ...data,
                isValidLogin: false,
            });
        }
    }, [user, loginLoading]);

    const onChangePasswordValue = (value) => {
        if (value.trim().length >= 8) {
            setData({
                ...data,
                userPassword: value,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                userPassword: value,
                isValidPassword: false,
            });
        }
    };

    const loginHandle = (loginData) => {
        if (data.isValidUser && data.isValidPassword) {
            // AsyncStorage.removeItem('COMPANY_ID');
            saveId();
            dispatch(login(loginData));
        }
    };

    // const loginHandle = useCallback(
    //     (loginData) => {
    //         if(data.isValidUser && data.isValidPassword){
    //             AsyncStorage.removeItem('companyId');
    //             saveId();
    //             dispatch(login(loginData));
    //         }
    //     },
    //     [user],
    // );


    async function saveId() {
        try {
            if (isIdSave) {
                await AsyncStorage.setItem('userId', data.userId);
            } else {
                await AsyncStorage.removeItem('userId');
            }
        } catch (error) {
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="dark-content"/>
            {/*<View style={styles.header}>*/}
            {/*    <Text style={styles.text_header}>Welcome!</Text>*/}
            {/*</View>*/}
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: '#fff',
                }]}
            >
                <View style={styles.header_logo}>
                    <Text style={[styles.text_header_logo, {color: colors.ridaTheme}]}>RIDA</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.text_header}>로그인</Text>
                </View>
                {/*<Text style={[styles.text_footer, {*/}
                {/*    color: colors.text*/}
                {/*}]}>Username</Text>*/}
                <View style={[styles.action, {marginTop: 70}]}>
                    <Feather
                        name="user"
                        color={colors.text}
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="아이디"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(value) => onChangeIdValue(value)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color={colors.ridaTheme}
                                size={20}
                                style={styles.icon}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>아이디는 5자 이상합니다</Text>
                    </Animatable.View>
                }


                {/*<Text style={[styles.text_footer, {*/}
                {/*    color: colors.text,*/}
                {/*    marginTop: 35*/}
                {/*}]}>Password</Text>*/}
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="비밀번호"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(value) => onChangePasswordValue(value)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                                style={styles.icon}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                                style={styles.icon}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>비밀번호는 8 ~ 20자 입니다.</Text>
                    </Animatable.View>
                }
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        title='아이디 저장'
                        checked={isIdSave}
                        checkedColor={colors.ridaTheme}
                        onIconPress={() => setIsIdSave(!isIdSave)}
                        containerStyle={{backgroundColor: '#fff', borderWidth: 0, marginLeft: 0}}
                    />
                </View>
                {data.isValidLogin ? null :
                    <Animatable.View animation="fadeInUp" duration={500}>
                        <Text style={[styles.errorMsg, {textAlign: 'center'}]}>아이디 or 패스워드가 잘못되었습니다</Text>
                    </Animatable.View>
                }


                {/*<TouchableOpacity>*/}
                {/*    <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>*/}
                {/*</TouchableOpacity>*/}
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            loginHandle(data);
                        }}
                    >
                        {/*<LinearGradient*/}
                        {/*    colors={['#08d4c4', '#01ab9d']}*/}
                        {/*    style={styles.signIn}*/}
                        {/*>*/}
                        <Text style={[styles.textSign, {
                            color: 'black',
                        }]}>로그인</Text>
                        {/*</LinearGradient>*/}
                    </TouchableOpacity>

                    {/*<TouchableOpacity*/}
                    {/*    onPress={() => navigation.navigate('SignUpScreen')}*/}
                    {/*    style={[styles.signIn, {*/}
                    {/*        borderColor: '#009387',*/}
                    {/*        borderWidth: 1,*/}
                    {/*        marginTop: 15*/}
                    {/*    }]}*/}
                    {/*>*/}
                    {/*    <Text style={[styles.textSign, {*/}
                    {/*        color: '#009387'*/}
                    {/*    }]}>Sign Up</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
                    <TouchableOpacity
                        style={[styles.bottomButton]}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        <Text style={[styles.bottomBottomText]}>회원가입</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomButton}
                    >
                        <Text style={[styles.bottomBottomText]}>아이디 찾기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomButton}
                    >
                        <Text style={[styles.bottomBottomText]}>비밀번호 재설정</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 60, justifyContent: 'flex-end'}}>
                    <Text style={{textAlign: 'center', color: '#919191'}}>
                        Ⓒ 2020.Rida all rights reserved.
                    </Text>
                </View>
            </Animatable.View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header_logo: {
        height: 40,
        justifyContent: 'center',
        marginTop: 100,
    },
    header: {
        height: 40,
        justifyContent: 'center',
        marginTop: 5,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header_logo: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    text_header: {
        color: 'black',
        fontWeight: '500',
        fontSize: 35,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 3,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        height: 40,
        fontSize: 17,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0.5,
        borderColor: '#919191',
        ...Platform.select({
            ios: {shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84},
            android: {elevation: 1},
        }),

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    label: {
        margin: 8,
    },
    bottomButton: {
        marginTop: 25,
        height: 25,
        // flex: 1
    },
    bottomBottomText: {
        fontSize: 16,
        color: '#919191',
    },
    icon: {
        marginTop: Platform.OS === 'ios' ? 8 : -3,
    },

});
