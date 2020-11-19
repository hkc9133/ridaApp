import React,{useState,useRef,useCallback} from 'react';
import {SafeAreaView,Text, TouchableOpacity, View, ScrollView, TextInput, StyleSheet, Platform,Keyboard,TouchableWithoutFeedback} from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import ReactNativePickerModule from "react-native-picker-module"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {addSchedule, initializeForm} from '../store/schedule/schedule';
import Dialog from 'react-native-dialog';
import CustomText from '../component/common/CustomText';

const scheduleTypeList = [
    {
        value: "WO",
        label: "업무",
    },
    {
        value: "IT",
        label: "중요",
    },
    {
        value: "BT",
        label: "출장",
    },
    {
        value: "SA",
        label: "영업",
    },
    {
        value: "VC",
        label: "휴가",
    },
];

const WorkScheduleAddScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const {schedule,loading} = useSelector(({schedule,loading}) =>({
        schedule:schedule.add,
        loading:loading['schedule/ADD_SCHEDULE'],
    }))


    const [startDatePicker, setStartDatePicker] = useState(false);
    const [startTimePicker, setStartTimePicker] = useState(false);
    const [endDatePicker, setEndDatePicker] = useState(false);
    const [endTimePicker, setEndTimePicker] = useState(false);
    const [isConfirm, setIsConfirm] = useState(true);
    const [workSchedule,setWorkSchedule] = useState({
        title:"",
        content:"",
        scheduleType:"",
        startDate:"",
        startTime:"",
        endDate:"",
        endTime:""
    })
    const [error, setError] = useState({
        result:null,
        errorCode:null,
        msg:""
    });

    const scheduleTypeRef = React.useRef();

    React.useEffect(() => {
        return () => {
            setWorkSchedule({
                title:"",
                content:"",
                scheduleType:"",
                startDate:"",
                startTime:"",
                endDate:"",
                endTime:""
            })
            dispatch(initializeForm('add'))
        }
    },[])


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth:0,
                shadowColor:"#fff"
            },
            headerTransparent: false,
            headerTintColor: '#000',
            headerTitleStyle: {
                textAlign: 'center',
                // flexGrow:1,
                alignSelf:'center',
                fontWeight: 'normal'
            },
            headerLeft:() => (<TouchableOpacity onPress={() => {navigation.goBack();}}><Text style={{padding:8,fontSize:16,fontWeight:'500'}}>닫기</Text></TouchableOpacity>),
            headerRight:() => (<TouchableOpacity onPress={() => {submitSchedule();}} disabled={!isConfirm} di><CustomText style={{padding:8,fontSize:16,fontWeight:'500',color: !isConfirm ? "gray" : 'black'}}>저장</CustomText></TouchableOpacity>)
        });
    }, [navigation,isConfirm,workSchedule]);

    React.useEffect(() => {
        let confirm = true;
        Object.keys(workSchedule).forEach(function(key){
            if(workSchedule[key] == null || workSchedule[key] == ""){
                confirm = false;
            }
        });
        if(confirm){
            setIsConfirm(true)
        }else{
            setIsConfirm(false)
        }
    },[workSchedule])

    React.useEffect(() => {

        if(schedule.result === false && schedule.errorCode !== null){
            setError({
                result:false,
                errorCode:schedule.errorCode,
                msg:schedule.code == 409 ? "중복된 일정이 있습니다" : "일정 등록중 문제가 발생했씁니다"
            })
        }

    },[schedule])

    // React.useEffect(() => {
    //     if(!loading && schedule.result){
    //         return(
    //             <Dialog.Container visible={schedule.result}>
    //                 <Dialog.Title>{`일정 추가 완료`}</Dialog.Title>
    //                 {/*<Dialog.Description>*/}
    //                 {/*    {`${commuteInfo.type}처리가 완료되었습니다.`}*/}
    //                 {/*</Dialog.Description>*/}
    //                 <Dialog.Button label="확인" onPress={() => {navigation.goBack();}}/>
    //             </Dialog.Container>
    //         )
    //     }
    // },[schedule,loading])


    const onChangeTitle = useCallback(
        value => {
            setWorkSchedule({
                ...workSchedule,
                title:value
            })
        },
        [workSchedule]
    );


    const onChangeContent = useCallback(
        value => {
            setWorkSchedule({
                ...workSchedule,
                content:value
            })
        },
        [workSchedule]
    );

    const submitSchedule = () =>{
        const data = {
            title:workSchedule.title,
            content:workSchedule.content,
            scheduleType:workSchedule.scheduleType,
            startDate: `${workSchedule.startDate} ${workSchedule.startTime}`,
            endDate:`${workSchedule.endDate} ${workSchedule.endTime}`
        }
        dispatch(addSchedule(data));
    }



    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.section}>
                    <View style={{height:30,marginBottom:15}}>
                        <TextInput value={workSchedule.title} placeholder="제목을 입력하세요" value={workSchedule.title}  style={styles.textInput} onChangeText={(value) => onChangeTitle(value)}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',marginBottom:10}}>
                        <CustomText style={styles.leftText}>유형 선택</CustomText>
                        <TouchableOpacity onPress={() => {scheduleTypeRef.current.show();}}>
                            {workSchedule.scheduleType == "" ? <CustomText style={styles.pickerPlaceholder}>유형</CustomText> : <Text style={styles.valueText}>{scheduleTypeList.filter(type => type.value == workSchedule.scheduleType)[0].label}</Text>}
                        </TouchableOpacity>
                        <ReactNativePickerModule
                            pickerRef={scheduleTypeRef}
                            value={workSchedule.scheduleType}
                            title={"일정을 선택하세요"}
                            items={scheduleTypeList}
                            titleStyle={{ color: "#8f8f8f",fontSize:20}}
                            itemStyle={{ color: "black" }}
                            // selectedColor="#FC0"
                            confirmButtonEnabledTextStyle={{ color: "black",fontWeight:'400' }}
                            confirmButtonDisabledTextStyle={{ color: "grey" }}
                            confirmButtonEnabledTextStyle={{ color: "#007ff9",fontWeight:'400',fontSize:20 }}
                            cancelButtonTextStyle={{ color: "#007ff9",fontWeight:'400',fontSize:20 }}
                            backdropOpacity={0.3}
                            // confirmButtonStyle={{
                            //     backgroundColor: "rgba(0,0,0,1)",
                            // }}
                            // cancelButtonStyle={{
                            //     backgroundColor: "rgba(0,0,0,1)",
                            // }}
                            // contentContainerStyle={{
                            //     backgroundColor: "rgba(0,0,0,1)",
                            // }}
                            confirmButton={"완료"}
                            cancelButton={"취소"}
                            // onCancel={() => {
                            //     console.log("Cancelled")
                            // }}
                            onValueChange={value => {
                                setWorkSchedule({...workSchedule,scheduleType: value})
                            }}
                        />
                        {/*<RNPickerSelect*/}
                        {/*    ref={dutyRef}*/}
                        {/*    onOpen={() => { // 선택창이 열릴때*/}
                        {/*        Keyboard.dismiss(); //키보드 내림*/}
                        {/*    }}*/}
                        {/*    onValueChange={(value) => console.log(value)}*/}
                        {/*    onUpArrow={() => {console.log("a")}}*/}
                        {/*    placeholder={{  // 값이 없을때 보일 값, 없어도 된다면 이 안의 내용을 지운다. placeholder={{}} 이건 남겨둠.. 이부분까지 지우면 기본값으로 설정됨.*/}
                        {/*        label: '직무 유형',*/}
                        {/*        value: null,*/}
                        {/*    }}*/}
                        {/*    InputAccessoryView={() =>*/}
                        {/*        <View style={styles.accessoryView}>*/}
                        {/*            <TouchableOpacity onPress={() => {dutyRef.current.togglePicker(true)}} style={styles.accessoryButton}>*/}
                        {/*                    <Text style={styles.accessoryText}>완료</Text>*/}
                        {/*            </TouchableOpacity>*/}
                        {/*        </View>*/}
                        {/*    }*/}
                        {/*    items={[*/}
                        {/*        { label: 'Football', value: 'football' },*/}
                        {/*        { label: 'Baseball', value: 'baseball' },*/}
                        {/*        { label: 'Hockey', value: 'hockey' },*/}
                        {/*    ]}*/}
                        {/*    style={{placeholder: styles.pickerPlaceholder,    inputAndroid: styles.pickerAndroid,*/}
                        {/*        inputIOS: styles.pickerIos}}*/}
                        {/*/>*/}
                    </View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',marginBottom:10}}>
                        <CustomText style={styles.leftText}>시작</CustomText>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => {setStartDatePicker(true)}} style={{height:30}}>
                                {workSchedule.startDate == "" ? <CustomText style={styles.pickerPlaceholder}>날짜</CustomText> : <CustomText style={styles.valueText}>{workSchedule.startDate}</CustomText>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setStartTimePicker(true)}}  style={{height:30}}>
                                {workSchedule.startTime == "" ? <CustomText style={styles.pickerPlaceholder}>시간</CustomText> : <CustomText style={styles.valueText}>{workSchedule.startTime}</CustomText>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',marginBottom:10}}>
                        <CustomText style={styles.leftText}>종료</CustomText>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => {setEndDatePicker(true)}} style={{height:30}}>
                                {workSchedule.endDate == "" ? <CustomText style={styles.pickerPlaceholder}>날짜</CustomText> : <CustomText style={styles.valueText}>{workSchedule.endDate}</CustomText>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setEndTimePicker(true)}}  style={{height:30}}>
                                {workSchedule.endTime == "" ? <CustomText style={styles.pickerPlaceholder}>시간</CustomText> : <CustomText style={styles.valueText}>{workSchedule.endTime}</CustomText>}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <DateTimePickerModal
                        isVisible={startDatePicker}
                        testID="startDatePicker"
                        mode="date"
                        is24Hour={true}
                        locale = { 'ko'}
                        headerTextIOS="날짜 선택"
                        confirmTextIOS="확인"
                        cancelTextIOS="취소"
                        onConfirm={(date) => {setWorkSchedule({...workSchedule,startDate:moment(date).format("YYYY-MM-DD").toString()});setStartDatePicker(false);}}
                        onCancel={() => {setStartDatePicker(false)}}
                    />
                    <DateTimePickerModal
                        isVisible={startTimePicker}
                        testID="startTimePicker"
                        mode="time"
                        // is24Hour={true}
                        locale = {'ko'}
                        headerTextIOS="시간 선택"
                        confirmTextIOS="확인"
                        cancelTextIOS="취소"
                        onConfirm={(time) => {setWorkSchedule({...workSchedule,startTime:moment(time).format("hh:mm").toString()});setStartTimePicker(false);}}
                        onCancel={() => {setStartTimePicker(false)}}
                    />
                    <DateTimePickerModal
                        isVisible={endDatePicker}
                        testID="endDatePicker"
                        mode="date"
                        is24Hour={true}
                        locale = { 'ko'}
                        headerTextIOS="종료 날짜 선택"
                        confirmTextIOS="확인"
                        cancelTextIOS="취소"
                        onConfirm={(date) => {setWorkSchedule({...workSchedule,endDate:moment(date).format("YYYY-MM-DD").toString()});setEndDatePicker(false);}}
                        onCancel={() => {setEndDatePicker(false)}}
                    />
                    <DateTimePickerModal
                        isVisible={endTimePicker}
                        testID="endTimePicker"
                        mode="time"
                        // is24Hour={true}
                        locale = {'ko'}
                        headerTextIOS="종료 시간 선택"
                        confirmTextIOS="확인"
                        cancelTextIOS="취소"
                        onConfirm={(time) => {setWorkSchedule({...workSchedule,endTime:moment(time).format("hh:mm").toString()});setEndTimePicker(false);}}
                        onCancel={() => {setEndTimePicker(false)}}
                    />

                </View>
                <View style={styles.section}>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',marginBottom:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Feather
                                name="map-pin"
                                color="black"
                                size={25}
                            />
                            <CustomText style={[styles.leftText,{marginLeft:10}]}>위치</CustomText>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',marginBottom:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Feather
                                name="bell"
                                color="black"
                                size={25}
                            />
                            <CustomText style={[styles.leftText,{marginLeft:10}]}>알람</CustomText>
                        </View>
                        <View>
                            <CustomText style={[styles.leftText,{marginLeft:10}]}>사용함</CustomText>
                        </View>
                        <View>
                            <CustomText style={[styles.leftText,{marginLeft:10}]}>매일</CustomText>
                        </View>
                        <View>
                            <Feather
                                name="plus-circle"
                                color="gray"
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Feather
                                name="user"
                                color="black"
                                size={25}
                            />
                            <CustomText style={[styles.leftText,{marginLeft:10}]}>참여자</CustomText>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <TextInput autoCapitalize="none" style={{height:200}} placeholder="내용을 입력하세요" multiline={true} value={workSchedule.content} onChangeText={(value) => onChangeContent(value)}/>
                </View>

            </ScrollView>
            <Dialog.Container visible={schedule.result}>
                {/*<Dialog.Title>{`완료`}</Dialog.Title>*/}
                <Dialog.Description>
                    일정 추가가 완료되었습니다
                </Dialog.Description>
                <Dialog.Button label="확인" onPress={() => {navigation.goBack();}}/>
            </Dialog.Container>
            <Dialog.Container visible={error.result === false}>
                {/*<Dialog.Title>{`완료`}</Dialog.Title>*/}
                <Dialog.Description>
                    {error.msg}
                </Dialog.Description>
                <Dialog.Button label="확인" onPress={() => {setError({...error,result:null,errorCode:null, msg:""})}}/>
            </Dialog.Container>
        </SafeAreaView>
    );
};

export default WorkScheduleAddScreen;

const styles = StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        padding:20,
        marginBottom:15
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 3,
        fontSize:18,
        // marginBottom:30,
        height:30,
        textAlign:'left'

    },
    leftText: {
        marginTop: Platform.OS === 'ios' ? 3.5 : 0,
        paddingLeft: 3,
        fontSize:17,
        // paddingBottom:5,
        // marginBottom:15,
        height:30,
        // alignItems:'flex-start'
    },
    valueText:{
        fontSize:17,
        height:30,
        marginLeft:10,
        color:'black'
    },
    pickerPlaceholder:{
        fontSize:17,
        color:'#919191',
        height:30,
        marginLeft:10,
        paddingTop:2,
    },
    pickerIos:{
        fontSize:18
    },
    pickerAndroid:{
        fontSize:18
    },

    accessoryView:{
        height:25,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    accessoryButton:{
        fontSize:16,
        marginRight:15
    },
    accessoryText:{
        fontSize:16,
    }
});
