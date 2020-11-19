import React,{useEffect,useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import CustomText from '../common/CustomText';

const ScheduleDetailItem = ({item}) => {

    const {colors} = useTheme();

    const [title, setTitle] = useState(null);
    const [color, setColor] = useState(null);

    const editDateFormat = (str) => {
        return moment(str).format("HH:mm:ss")
    }

    useEffect(() => {
        switch (item.event) {
            case 'WORK_IN':
                setTitle("출근");
                setColor("#0ec269");
                break;
            case 'WORK_OUT':
                setTitle("퇴근");
                setColor("#0ec269")
                break;
            case 'WO':
                setTitle("업무");
                setColor("#547980")
                break;
            case 'IT':
                setTitle("중요");
                setColor("#45ADA8")
                break;
            case 'BT':
                setTitle("출장");
                setColor("#9DE0AD")
                break;
            case 'SA':
                setTitle("영압");
                setColor("#E5FCC2")
                break;
            case 'VC':
                setTitle("휴가");
                setColor("#594F4F")
                break
        }

    },[])

    return (
        <View style={{marginBottom:10,padding:10}}>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{width:10,height:10,backgroundColor:color,borderRadius:5,alignSelf:'center',justifyContent:'center'}}></View>
                <CustomText style={{marginLeft:10,fontWeight:'600'}}>{title != null && title}</CustomText>
            </View>
            <View style={{marginTop:0}}>
                <CustomText style={{marginLeft:20,color:"#919191"}}>{`${editDateFormat(item.date)}`}</CustomText>
            </View>
        </View>
    );
};

export default ScheduleDetailItem;
