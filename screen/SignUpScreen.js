import React, {useCallback,useEffect} from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import {login, signup} from '../store/auth/auth';
import {useDispatch, useSelector} from 'react-redux';

const SignInScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const {auth,signupLoading} = useSelector(({auth,loading}) =>({
        auth:auth,
        signupLoading:loading['auth/SIGNUP'],
    }))

    const { colors } = useTheme();

    const [data, setData] = React.useState({
        userId: '',
        userPassword: '',
        userPasswordConfirm: '',
        userName:'',
        userPhone:'',
        userPhone01:'',
        userPhone02:'',
        userPhone03:'',
        checkIdInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidName: true,
        isValidPhone: true,
    });

    const [terms, setTerms] = React.useState({
        all:false,
        service:false,
        privacy:false,
    });

    useEffect(() => {
        if(!signupLoading && auth.signup.result !== null && auth.signup.result){
            Alert.alert(
                //title
                '회원가입 완료',
                //body
                '로그인 후 이용해주세요',
                [
                    {
                        text: '로그인',
                        onPress: () => navigation.goBack()
                    },
                ],
                {cancelable: false},
            );

        }
    },[signupLoading,auth])


    const onChangeIdValue = (value) => {
        if( value.trim().length >= 5 ) {
            setData({
                ...data,
                userId: value,
                checkIdInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                userId: value,
                checkIdInputChange: false,
                isValidUser: false
            });
        }
    }

    const onChangePasswordValue = (value) => {
        if( value.trim().length >= 5 ) {
            setData({
                ...data,
                userPassword: value,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                userPassword: value,
                isValidPassword: false
            });
        }
    }

    const onChangePasswordConfirmValue = (value) => {
        if( value.trim().length >= 5 ) {
            setData({
                ...data,
                userPasswordConfirm: value,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                userPasswordConfirm: value,
                isValidPassword: false
            });
        }
    }

    const onChangeNameValue = (value) => {
        if( value.trim().length >= 1 ) {
            setData({
                ...data,
                userName: value,
                isValidName: true
            });
        } else {
            setData({
                ...data,
                userName: value,
                isValidName: false
            });
        }
    }

    const onChangePhoneValue01 = (value) => {
        if( value.trim().length == 3 ) {
            setData({
                ...data,
                userPhone01: value,
            });
        } else {
            setData({
                ...data,
                userPhone01: value,
            });
        }
    }

    const onChangePhoneValue02 = (value) => {
        if( value.trim().length > 3 && value.trim().length <= 4) {
            setData({
                ...data,
                userPhone02: value,
            });
        } else {
            setData({
                ...data,
                userPhone02: value,
            });
        }
    }

    const onChangePhoneValue03 = (value) => {
        if( value.trim().length == 4 ) {
            setData({
                ...data,
                userPhone03: value,
            });
        } else {
            setData({
                ...data,
                userPhone03: value,
            });
        }
    }

    const handleTermsAll = (value) => {
        if(terms.all){
            setTerms({
                ...terms,
                all:false,
                service:false,
                privacy:false,
            })
        }else{
            setTerms({
                ...terms,
                all:true,
                service:true,
                privacy:true,
            })
        }

    }

    // const signUpHandle = useCallback(
    //     () => {
    //
    //         const signUpInfo = {
    //             userId:data.userId,
    //             userPassword:data.userPassword,
    //             userPasswordConfirm:data.userPasswordConfirm,
    //             userName:data.userName,
    //             userPhone: `${data.userPhone01}${data.userPhone02}${data.userPhone03}`,
    //
    //         }
    //         if(data.isValidUser && data.isValidPassword && data.isValidName && terms.privacy && terms.service){
    //             dispatch(signup(signUpInfo))
    //         }else{
    //             console.log(data)
    //             Alert.alert("","미입력된 정보가 있습니다")
    //         }
    //     },
    //     [auth],
    // );

    const signUpHandle = () => {
        const signUpInfo = {
            userId:data.userId,
            userPassword:data.userPassword,
            userPasswordConfirm:data.userPasswordConfirm,
            userName:data.userName,
            userPhone: `${data.userPhone01}${data.userPhone02}${data.userPhone03}`,

        }
        console.log(data)
        console.log(terms)
        if(data.isValidUser && data.isValidPassword && data.isValidName && terms.privacy && terms.service){
            dispatch(signup(signUpInfo))
        }else{
            console.log(data)
            Alert.alert("","미입력된 정보가 있습니다")
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="dark-content"/>
            {/*<View>*/}
            {/*    <Feather*/}
            {/*        name="chevron-left"*/}
            {/*        color="black"*/}
            {/*        size={30}*/}
            {/*        con*/}
            {/*    />*/}
            {/*</View>*/}
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View style={{paddingHorizontal: 40}}>

                    <View style={styles.header}>
                        <Text style={styles.text_header}>기본정보</Text>
                    </View>
                    <Text style={[styles.text_footer,{marginTop:25}]}>아이디</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="아이디"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => onChangeIdValue(value)}
                        />
                        {data.checkIdInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    { data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>아이디는 필수입니다</Text>
                        </Animatable.View>
                    }
                    { auth.signup.error.userId === null ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{auth.signup.error.userId}</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer,{marginTop: 22}]}>이름</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="홍길동"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => onChangeNameValue(value)}
                        />
                        {/*{data.check_textInputChange ?*/}
                        {/*    <Animatable.View*/}
                        {/*        animation="bounceIn"*/}
                        {/*    >*/}
                        {/*        <Feather*/}
                        {/*            name="check-circle"*/}
                        {/*            color="green"*/}
                        {/*            size={20}*/}
                        {/*        />*/}
                        {/*    </Animatable.View>*/}
                        {/*    : null}*/}
                    </View>
                        { data.isValidName ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>이름은 필수입니다</Text>
                            </Animatable.View>
                        }
                        { auth.signup.error.userName === null  ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{auth.signup.error.userName}</Text>
                            </Animatable.View>
                        }

                    <Text style={[styles.text_footer, {
                        marginTop: 22
                    }]}>생년월일</Text>
                    <View style={{  justifyContent: 'space-between', flexDirection: 'row',flex: 1,
                        marginTop: 10,
                        paddingBottom: 5}}>
                        <TextInput
                            maxLength={6}
                            placeholder="생년월일 6자리"
                            style={styles.textInputHalf}
                            autoCapitalize="none"
                            keyboardType={'numeric'}

                        />
                        <Text style={{marginHorizontal:5}}> - </Text>
                        <TextInput
                            placeholder="앞 1자리"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInputHalf}
                            autoCapitalize="none"
                            maxLength={1}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 22
                    }]}>휴대전화</Text>
                    <View style={{  justifyContent: 'space-between', flexDirection: 'row',flex: 1,
                        marginTop: 10,
                        paddingBottom: 5}}>
                        <TextInput
                            maxLength={3}
                            style={styles.textInputHalf}
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            onChangeText={(value) => onChangePhoneValue01(value)}

                        />
                        <Text style={{marginHorizontal:5}}> - </Text>
                        <TextInput
                            style={styles.textInputHalf}
                            autoCapitalize="none"
                            maxLength={4}
                            keyboardType={'numeric'}
                            onChangeText={(value) => onChangePhoneValue02(value)}

                        />
                        <Text style={{marginHorizontal:5}}> - </Text>
                        <TextInput
                            style={styles.textInputHalf}
                            autoCapitalize="none"
                            maxLength={4}
                            keyboardType={'numeric'}
                            onChangeText={(value) => onChangePhoneValue03(value)}

                        />
                    </View>
                        { data.isValidPhone ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>전화번호</Text>
                            </Animatable.View>
                        }
                        { auth.signup.error.userPhone === null  ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{auth.signup.error.userPhone}</Text>
                            </Animatable.View>
                        }


                    <Text style={[styles.text_footer, {
                        marginTop: 22
                    }]}>비밀번호</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="비밀번호"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => onChangePasswordValue(value)}

                        />
                        <TouchableOpacity>
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 6
                    }]}>영문 대,소문자와 숫자, 특수문자 포함된 8 ~ 20자</Text>
                    <Text style={[styles.text_footer, {
                        marginTop: 22
                    }]}>비밀번호 확인</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="비밀번호를 다시 입력해주세요"
                            secureTextEntry={data.confirmSecureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => onChangePasswordConfirmValue(value)}

                        />
                        <TouchableOpacity

                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                        { data.isValidPassword ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>비밀번호확인</Text>
                            </Animatable.View>
                        }
                        { auth.signup.error.userPassword  === null ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{auth.signup.error.userPassword}</Text>
                            </Animatable.View>
                        }

                    <Text style={[styles.text_footer, {
                        marginTop: 22
                    }]}>약관동의</Text>
                    <View style={{flex: 1,
                        marginTop: 10,
                        paddingBottom: 5,}}>
                        <View>
                            <CheckBox
                                title='약관 전체동의'
                                checked={terms.all}
                                checkedColor={colors.ridaTheme}
                                onIconPress={() => handleTermsAll()}
                                checkedColor={colors.ridaTheme}
                                textStyle={styles.text_footer}
                                containerStyle={{backgroundColor:'#fff',borderWidth:0,marginLeft:0,padding:0,height:30}}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <CheckBox
                                title='서비스 이용약관 동의'
                                checked={terms.service}
                                checkedColor={colors.ridaTheme}
                                onIconPress={() => setTerms({...terms,service:!terms.service})}
                                checkedColor={colors.ridaTheme}
                                textStyle={styles.text_footer}
                                checkedColor={colors.ridaTheme}
                                containerStyle={{backgroundColor:'#fff',borderWidth:0,marginLeft:0,padding:0,height:30}}
                            />
                            <TouchableOpacity style={{height:30,justifyContent:'center'}}>
                                <Text>
                                    전문보기
                                    <Feather
                                        name="chevron-right"
                                        color="grey"
                                        size={16}
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <CheckBox
                                title='개인정보처리 방침 동의'
                                checked={terms.privacy}
                                checkedColor={colors.ridaTheme}
                                onIconPress={() => setTerms({...terms,privacy:!terms.privacy})}
                                checkedColor={colors.ridaTheme}
                                textStyle={styles.text_footer}
                                checkedColor={colors.ridaTheme}
                                containerStyle={{backgroundColor:'#fff',borderWidth:0,marginLeft:0,padding:0,height:30}}
                            />
                            <TouchableOpacity style={{height:30,justifyContent:'center'}}>
                                <Text>
                                    전문보기
                                    <Feather
                                        name="chevron-right"
                                        color="grey"
                                        size={16}
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {signUpHandle();}}
                        >
                                <Text style={[styles.textSign, {
                                    color:'#fff'
                                }]}>회원가입</Text>
                        </TouchableOpacity>

                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => navigation.goBack()}*/}
                        {/*    style={[styles.signIn, {*/}
                        {/*        borderColor: '#009387',*/}
                        {/*        borderWidth: 1,*/}
                        {/*        marginTop: 15*/}
                        {/*    }]}*/}
                        {/*>*/}
                        {/*    <Text style={[styles.textSign, {*/}
                        {/*        color: '#009387'*/}
                        {/*    }]}>Sign In</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingHorizontal: 40,
        // paddingVertical: 40
    },
    header: {
        // flex: 1,
        justifyContent: 'center',
        // paddingHorizontal: 20,
        // paddingBottom: 50
        marginTop: 20
    },
    footer: {
        // flex: Platform.OS === 'ios' ? 1 : 4,
        flex:1,
        backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingHorizontal: 20,
        // paddingVertical: 30
    },
    text_header: {
        color: 'black',
        fontWeight: '500',
        fontSize: 35
    },
    text_footer: {
        color: '#333',
        // paddingHorizontal: 20,
        fontWeight:'500',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        // backgroundColor:'red',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 3,
        fontSize:18,
        paddingBottom:5
        // paddingHorizontal: 20,
    },
    textInputHalf: {
        // backgroundColor:'red',
        fontSize:18,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 3,
        paddingBottom:5,
        textAlign:'center'
        // paddingHorizontal: 20,
    },
    button: {
        flex:1,
        marginTop:30,
        marginBottom:30,
        backgroundColor:'#013476',
        alignItems: 'center',
        // height:60,
        justifyContent: 'flex-end'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
