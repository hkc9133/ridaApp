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
import {createCompany, getCompanyList, joinCompany, selectCompany} from '../store/company/company';
// import {selectCompany} from '../store/company/company';
import CompanyListItem from '../component/compnay/CompanyListItem';
import {initialize} from '../store/commute/commute';
import CustomText from '../component/common/CustomText';
// import Prompt from "../util/Prompt";

const SelectCompanyScreen = () => {

    const dispatch = useDispatch();

    const {company,companyLoading,joinLoading,createLoading} = useSelector(({company,loading}) =>({
        company:company,
        companyLoading:loading['company/GET_COMPANY_LIST'],
        createLoading:loading['company/CREATE_COMPANY'],
        joinLoading:loading['company/JOIN_COMPANY']
    }))

    const { colors } = useTheme();

    const [showCompanyJoin,setShowCompanyJoin] = useState(false);
    const [showCompanyCreate,setShowCompanyCreate] = useState(false);
    const [joinCode,setJoinCode] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [isCompanyCreate,setIsCompanyCreate] = useState(false);
    const [isCompanyJoin,setIsCompanyJoin] = useState(false);


    useEffect(() => {
        dispatch(initialize())
        dispatch(getCompanyList());
    },[])

    useEffect(() => {
        if(!createLoading && company.create.result){
            setCompanyName("");
            setIsCompanyCreate(true);
            dispatch(initialize())
            dispatch(getCompanyList());
        }
    },[createLoading,company.create.result])

    useEffect(() => {
        if(!joinLoading && company.join.result){
            setJoinCode("");
            setIsCompanyJoin(true);
            dispatch(initialize());
            dispatch(getCompanyList());

        }

    },[joinLoading,company.join.result])



    const handleJoinCompany = () => {
        const date = {
            joinCode:joinCode
        }
        dispatch(joinCompany(date));
    }

    const handleCreateCompany = () => {
        const date = {
            companyName:companyName
        }
        dispatch(createCompany(date))
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
        dispatch(selectCompany(id));
    }

    return (
        <SafeAreaView >
            <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content"/>
            <Animatable.View
                animation="fadeInUp"
                // easing="ease-out"
                style={[styles.footer, {
                    height:'100%',
                    minHeight:800
                    // backgroundColor: 'blue'
                }]}
            >
                <View>
                    <View style={styles.header_logo}>
                        <CustomText style={[styles.text_header_logo,{color: colors.ridaTheme}]}>RIDA</CustomText>
                    </View>
                    <View style={styles.header}>
                        <CustomText style={styles.text_header}>환영합니다!</CustomText>
                    </View>
                    <View style={{marginTop:20}}>
                        <CustomText style={{color:'#919191',fontSize:16}}>회사를 선택하거나 합류해주세요</CustomText>
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
                            <CustomText style={{fontSize:17}} adjustsFontSizeToFit>직장 합류하기</CustomText>
                            <CustomText style={{color:'#919191'}}>합류코드를 이용하여 직원으로 합류합니다</CustomText>
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
                <TouchableOpacity onPress={() => {setShowCompanyCreate(true);}}>
                    <View style={{height:100,borderWidth:1.5,marginTop:25,flex:1,flexDirection:'row',padding:20,justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'flex-start',alignItems:'baseline',alignSelf : "center"}}>
                            <CustomText style={{fontSize:17}} adjustsFontSizeToFit>회사 만들기</CustomText>
                            <CustomText style={{color:'#919191'}}>새로운 회사를 생성합니다</CustomText>
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

                <Dialog.Container visible={showCompanyJoin}>
                    <Dialog.Title>직장 합류</Dialog.Title>
                    <Dialog.Description>
                        {`합류코드는 관라자에게서 받은 초대 이메일/문자메세지에서 찾을 수 있습니다.\n초대 이메일,문자메시지를 받지 못했으면, 관리자에게 문의하세요`}
                    </Dialog.Description>
                    <Dialog.Description style={{color:'red'}}>
                        {company.join.error === null ? "" : company.join.error}
                    </Dialog.Description>
                    <Dialog.Container visible={isCompanyJoin}>
                        <Dialog.Title>회사 합류</Dialog.Title>
                        <Dialog.Description>
                            {`회사 합류가 완료되었습니다`}
                        </Dialog.Description>
                        <Dialog.Button label="확인" onPress={() => {setIsCompanyJoin(false);setShowCompanyJoin(false)}} />
                    </Dialog.Container>
                    <Dialog.Button label="취소" onPress={handleJoinCompanyCancel} />
                    <Dialog.Button label="합류하기" onPress={handleJoinCompany} />
                    <Dialog.Input onChangeText={(value) => {insertJoinCode(value)}} style={{borderRadius:6,borderColor: '#919191',paddingLeft: 10}}  placeholder="합류코드"/>
                </Dialog.Container>

                <Dialog.Container visible={showCompanyCreate}>
                    <Dialog.Title>회사 만들기</Dialog.Title>
                    <Dialog.Description>
                        {`회사 생성 후 이용하세요`}
                    </Dialog.Description>
                    <Dialog.Button label="취소" onPress={() => {setShowCompanyCreate(false)}} />
                    <Dialog.Button label="생성하기" onPress={handleCreateCompany} />
                    <Dialog.Input  onChangeText={(value) => {setCompanyName(value)}} value={companyName} style={{borderRadius:6,borderColor: '#919191',paddingLeft: 10}} placeholder="회사 이름"/>
                    <Dialog.Container visible={isCompanyCreate}>
                        <Dialog.Title>회사 생성 완료</Dialog.Title>
                        <Dialog.Description>
                            {`회사 생성이 완료되었습니다`}
                        </Dialog.Description>
                        <Dialog.Button label="확인" onPress={() => {setIsCompanyCreate(false);setShowCompanyCreate(false)}} />
                    </Dialog.Container>
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
                    <CustomText style={{textAlign:"center", color:'#919191'}}>
                        Ⓒ 2020.Rida all rights reserved.
                    </CustomText>
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
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        // height:1200
        // backgroundColor:'red',
    },
    header_logo: {
        // justifyContent: 'flex-start',
        // marginTop: 100,
    },
    text_header_logo: {
        fontWeight: 'bold',
        fontSize: 45,
    },
    header: {
        // height: 50,
        // justifyContent: 'flex-start',
        // justifyContent: 'flex-end',
    },
    text_header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 37,
        // textAlignVertical: "top"
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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

