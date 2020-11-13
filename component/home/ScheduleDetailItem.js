import React,{useEffect,useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';

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
                setColor("red")
                break;
        }

    },[])
    return (
        <View style={{marginBottom:10}}>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{width:10,height:10,backgroundColor:color,borderRadius:5,alignSelf:'center',justifyContent:'center'}}></View>
                <Text style={{marginLeft:10,fontWeight:'600'}}>{title != null && title}</Text>
            </View>
            <View style={{marginTop:5}}>
                <Text style={{marginLeft:20,color:"#919191"}}>{`${editDateFormat(item.date)}`}</Text>
            </View>
        </View>
    );
};

export default ScheduleDetailItem;
