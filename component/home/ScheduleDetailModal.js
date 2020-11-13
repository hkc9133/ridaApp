import React,{useState,useEffect} from 'react';
import {TouchableOpacity, View,ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import ScheduleDetailItem from './ScheduleDetailItem';
import moment from 'moment';

const ScheduleDetailModal = ({isShowDetail,setIsShowDetail,schedule,initSchedule,selectDay}) => {

    const [dayName, setDayName] = useState("");

    useEffect(() => {
        if(selectDay != null){
            getDayName(selectDay.dateString)
        }

    },[selectDay])


    const getDayName = (day) => {
        const weekDayName =  moment(day).format('d');

        switch (weekDayName) {
            case "0":
                setDayName("일");
                break;
            case "1":
                setDayName("월")
                break;
            case "2":
                setDayName("화")
                break;
            case "3":
                setDayName("수")
                break;
            case "4":
                setDayName("목")
                break;
            case "5":
                setDayName("금")
                break;
            case "6":
                setDayName("토")
                break;
        }

    }

    if(selectDay == null){
        return null;
    }
    return (
        <Modal
            //isVisible Props에 State 값을 물려주어 On/off control
            isVisible={isShowDetail}
            // animationType="slideInUp"
            animationIn="slideInUp"
            animationInTiming={500}
            animationOut="slideOutDown"
            animationOutTiming={1000}
            backdropColor="transparent"
            //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center',bottom:50}}
        >
            <View style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding:20,
                // paddingTop:30,
                width: '100%',
                // height: 220,
                backgroundColor:'#fff',
                borderRadius:20,
                borderColor:'lightgray',
                borderWidth:1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5

            }}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%'}}>
                    <View style={{marginBottom:3}}>
                        <Text style={{fontSize:18,fontWeight:"500"}}>{selectDay.day}일</Text>
                    </View>
                    <View>
                        <TouchableOpacity  onPress={() => {setIsShowDetail(false);initSchedule();}}>
                            <Feather
                                name="x"
                                color='black'
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{fontSize:16,fontWeight:"500"}}>{selectDay.year} {selectDay.month}월 {selectDay.day}일({dayName})</Text>
                </View>
                <ScrollView style={{borderTopWidth:1, borderColor:'lightgray',width:'100%',marginTop:20,marginBottom:15,paddingTop:20,maxHeight:300}}>
                    {schedule.result && schedule.data.length > 0 &&(
                        schedule.data.map((item) => (
                            <ScheduleDetailItem key={item.date} item={item}/>
                        ))
                    )}
                    {schedule.result && schedule.data.length == 0 &&(
                        <View style={{alignItems:'center'}}>
                            <Text>일정이 없습니다</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
};

export default ScheduleDetailModal;
