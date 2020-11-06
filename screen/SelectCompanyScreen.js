import React,{useState,useEffect} from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import Dialog from "react-native-dialog";
import Loader from '../component/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {getCompanyList,selectCompany} from '../store/company/company';
// import {selectCompany} from '../store/company/company';
import CompanyListItem from '../component/compnay/CompanyListItem';
// import Prompt from "../util/Prompt";

const SelectCompanyScreen = () => {

    const dispatch = useDispatch();

    const {company,companyLoading} = useSelector(({company,loading}) =>({
        company:company,
        companyLoading:loading['company/GET_COMPANY_LIST']
    }))

    const { colors } = useTheme();

    const [showCompanyJoin,setShowCompanyJoin] = useState(false);
    const [joinCode,setJoinCode] = useState("");

    useEffect(() => {
        dispatch(getCompanyList());
    },[])

    useEffect(() => {
        console.log(company)
    },[company])

    const handleJoinCompany = () => {
    }

    const insertJoinCode = (value) =>{
        setJoinCode(value);
    }
    const handleJoinCompanyShow = () => {
        setShowCompanyJoin(true)
    }

    const handleJoinCompanyCancel = () => {
        setShowCompanyJoin(false)
    }

    const handleSelectCompany = (id) => {
        console.log(id)
        dispatch(selectCompany(id));
    }

    return (
        <SafeAreaView >
            <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="dark-content"/>
            <Animatable.View
                animation="fadeInUp"
                // easing="ease-out"
                style={[styles.footer, {
                    height:'100%',
                    minHeight:800
                    // backgroundColor: 'blue'
                }]}
            >
                <View >
                    <View style={styles.header_logo}>
                        <Text style={[styles.text_header_logo,{color: colors.ridaTheme}]}>RIDA</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.text_header}>환영합니다!</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={{color:'#919191',fontSize:16}}>회사를 선택하거나 합류해주세요</Text>
                    </View>
                </View>
                {company.company.list != null && (
                    company.company.list.map((item) => (
                        <CompanyListItem key={item.companyId} item={item} handleSelectCompany={handleSelectCompany}/>
                    ))

                )}
                {/*{company.company.list.map((item) => (*/}
                {/*    <TouchableOpacity onPress={() => {handleJoinCompanyShow();}}>*/}
                {/*        <View style={{height:100,borderWidth:1.5,marginTop:25,flex:1,flexDirection:'row',padding:20,justifyContent: 'space-between'}}>*/}
                {/*            <View style={{justifyContent: 'flex-start',alignItems:'baseline',alignSelf : "center"}}>*/}
                {/*                <Text style={{fontSize:17,marginBottom:5}}>직장 합류하기</Text>*/}
                {/*                <Text style={{color:'#919191'}}>합류코드를 이용하여 직원으로 합류합니다</Text>*/}
                {/*            </View>*/}
                {/*            <View style={{justifyContent: 'flex-end',alignSelf : "center"}}>*/}
                {/*                <Feather*/}
                {/*                    name="plus"*/}
                {/*                    // color="grey"*/}
                {/*                    size={25}*/}
                {/*                    style={{textAlign:'right'}}*/}
                {/*                />*/}
                {/*            </View>*/}

                {/*        </View>*/}
                {/*    </TouchableOpacity>*/}
                {/*))}*/}

                <TouchableOpacity onPress={() => {handleJoinCompanyShow();}}>
                    <View style={{height:100,borderWidth:1.5,marginTop:25,flex:1,flexDirection:'row',padding:20,justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'flex-start',alignItems:'baseline',alignSelf : "center"}}>
                            <Text style={{fontSize:17,marginBottom:5}}>직장 합류하기</Text>
                            <Text style={{color:'#919191'}}>합류코드를 이용하여 직원으로 합류합니다</Text>
                        </View>
                        <View style={{justifyContent: 'flex-end',alignSelf : "center"}}>
                            <Feather
                                name="plus"
                                // color="grey"
                                size={25}
                                style={{textAlign:'right'}}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={{height:100,borderWidth:1.5,marginTop:25,flex:1,flexDirection:'row',padding:20,justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'flex-start',alignItems:'baseline',alignSelf : "center"}}>
                            <Text style={{fontSize:17,marginBottom:5}}>회사 만들기</Text>
                            <Text style={{color:'#919191'}}>새로운 회사를 생성합니다</Text>
                        </View>
                        <View style={{justifyContent: 'flex-end',alignSelf : "center"}}>
                            <Feather
                                name="plus"
                                // color="grey"
                                size={25}
                                style={{textAlign:'right'}}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
                {/*<View style={[styles.action,{marginTop:70}]}>*/}
                {/*    <FontAwesome*/}
                {/*        name="user-o"*/}
                {/*        color={colors.text}*/}
                {/*        size={20}*/}
                {/*        style={styles.icon}*/}
                {/*    />*/}
                {/*    <TextInput*/}
                {/*        placeholder="아이디"*/}
                {/*        placeholderTextColor="#666666"*/}
                {/*        style={[styles.textInput, {*/}
                {/*            color: colors.text*/}
                {/*        }]}*/}
                {/*        autoCapitalize="none"*/}
                {/*        onChangeText={(value) => onChangeIdValue(value)}*/}
                {/*    />*/}
                {/*    {data.check_textInputChange ?*/}
                {/*        <Animatable.View*/}
                {/*            animation="bounceIn"*/}
                {/*        >*/}
                {/*            <Feather*/}
                {/*                name="check-circle"*/}
                {/*                color={colors.ridaTheme}*/}
                {/*                size={20}*/}
                {/*                style={styles.icon}*/}
                {/*            />*/}
                {/*        </Animatable.View>*/}
                {/*        : null}*/}
                {/*</View>*/}
                {/*{ data.isValidUser ? null :*/}
                {/*    <Animatable.View animation="fadeInLeft" duration={500}>*/}
                {/*        <Text style={styles.errorMsg}>아이디는 5자 이상합니다</Text>*/}
                {/*    </Animatable.View>*/}
                {/*}*/}
                {/*<View style={styles.action}>*/}
                {/*    <Feather*/}
                {/*        name="lock"*/}
                {/*        color={colors.text}*/}
                {/*        size={20}*/}
                {/*        style={styles.icon}*/}
                {/*    />*/}
                {/*    <TextInput*/}
                {/*        placeholder="비밀번호"*/}
                {/*        placeholderTextColor="#666666"*/}
                {/*        secureTextEntry={data.secureTextEntry ? true : false}*/}
                {/*        style={[styles.textInput, {*/}
                {/*            color: colors.text*/}
                {/*        }]}*/}
                {/*        autoCapitalize="none"*/}
                {/*        onChangeText={(value) => onChangePasswordValue(value)}*/}
                {/*    />*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={updateSecureTextEntry}*/}
                {/*    >*/}
                {/*        {data.secureTextEntry ?*/}
                {/*            <Feather*/}
                {/*                name="eye-off"*/}
                {/*                color="grey"*/}
                {/*                size={20}*/}
                {/*                style={styles.icon}*/}
                {/*            />*/}
                {/*            :*/}
                {/*            <Feather*/}
                {/*                name="eye"*/}
                {/*                color="grey"*/}
                {/*                size={20}*/}
                {/*                style={styles.icon}*/}
                {/*            />*/}
                {/*        }*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                {/*{ data.isValidPassword ? null :*/}
                {/*    <Animatable.View animation="fadeInLeft" duration={500}>*/}
                {/*        <Text style={styles.errorMsg}>비밀번호는 8 ~ 20자 입니다.</Text>*/}
                {/*    </Animatable.View>*/}
                {/*}*/}
                {/*<View style={styles.checkboxContainer}>*/}
                {/*    <CheckBox*/}
                {/*        title='아이디 저장'*/}
                {/*        checked={isIdSave}*/}
                {/*        checkedColor={colors.ridaTheme}*/}
                {/*        onIconPress={() => setIsIdSave(!isIdSave)}*/}
                {/*        containerStyle={{backgroundColor:'#fff',borderWidth:0,marginLeft:0}}*/}
                {/*    />*/}
                {/*</View>*/}
                {/*{ data.isValidLogin ? null :*/}
                {/*    <Animatable.View animation="fadeInUp" duration={500}>*/}
                {/*        <Text style={[styles.errorMsg,{textAlign:'center'}]}>아이디 or 패스워드가 잘못되었습니다</Text>*/}
                {/*    </Animatable.View>*/}
                {/*}*/}
                {/*<View style={styles.button}>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.signIn}*/}
                {/*        onPress={() => {loginHandle(data)}}*/}
                {/*    >*/}
                {/*        <Text style={[styles.textSign, {*/}
                {/*            color:'black'*/}
                {/*        }]}>로그인</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                {/*<View style={{  justifyContent: 'space-between', flexDirection: 'row',flex: 1}}>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={[styles.bottomButton]}*/}
                {/*        onPress={() => navigation.navigate('SignUpScreen')}*/}
                {/*    >*/}
                {/*        <Text style={[styles.bottomBottomText]}>회원가입</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.bottomButton}*/}
                {/*    >*/}
                {/*        <Text style={[styles.bottomBottomText]}>아이디 찾기</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.bottomButton}*/}
                {/*    >*/}
                {/*        <Text style={[styles.bottomBottomText]}>비밀번호 재설정</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                <Dialog.Container visible={showCompanyJoin}>
                    <Dialog.Title>직장 합류</Dialog.Title>
                    <Dialog.Description>
                        {`합류코드는 관라자에게서 받은 초대 이메일/문자메세지에서 찾을 수 있습니다.\n초대 이메일,문자메시지를 받지 못했으면, 관리자에게 문의하세요`}
                    </Dialog.Description>
                    <Dialog.Button label="취소" onPress={handleJoinCompanyCancel} />
                    <Dialog.Button label="합류하기" onPress={handleJoinCompany} />
                    <Dialog.Input onChangeText={(value) => {insertJoinCode(value)}} style={{borderRadius:6,borderColor: '#919191',paddingLeft: 10}}  placeholder="합류코드"/>
                </Dialog.Container>
                {/*<Prompt*/}
                {/*    title="UPDATE DETAILS ID:"*/}
                {/*    placeholder="Enter Username"*/}
                {/*    defaultValue={"asdasd"}*/}
                {/*    placeholderSecond="Enter Password"*/}
                {/*    defaultValueSecond={"asdasd"}*/}
                {/*    visible={true}*/}
                {/*/>*/}
                <View style={{height:60,justifyContent: 'flex-end',flex:1}}>
                    <Text style={{textAlign:"center", color:'#919191'}}>
                        Ⓒ 2020.Rida all rights reserved.
                    </Text>
                </View>
            </Animatable.View>
        </View>
        </ScrollView>
</SafeAreaView>
    );
};

export default SelectCompanyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        // height:1200
        // backgroundColor:'red',
    },
    header_logo: {
        height:40,
        justifyContent: 'center',
        marginTop: 20
    },
    header: {
        height:40,
        justifyContent: 'center',
        marginTop: 5
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header_logo: {
        fontWeight: 'bold',
        fontSize: 40
    },
    text_header: {
        color: 'black',
        fontWeight: '500',
        fontSize: 35
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        height:40,
        fontSize:17
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0.5,
        borderColor: '#919191'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'normal'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        width:20,
        height:20,
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    bottomButton:{
        marginTop:25,
        height:25,
        // flex: 1
    },
    bottomBottomText:{
        fontSize:16,
        color:'#919191'
    },
    icon:{
        marginTop: Platform.OS === 'ios' ? 8 : -3,
    },
    popupContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

});

