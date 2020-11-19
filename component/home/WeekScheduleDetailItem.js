import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import CustomText from '../common/CustomText';

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

const WeekScheduleDetailItem = ({item}) => {

    const {colors} = useTheme();

    const [type, setType] = useState(null);
    const [color, setColor] = useState(null);

    const editDateFormat = (str) => {
        return moment(str).format("HH:mm:ss")
    }

    useEffect(() => {
        switch (item.event) {
            case 'WORK_IN':
                setType("출근");
                setColor("#0ec269");
                break;
            case 'WORK_OUT':
                setType("퇴근");
                setColor("#0ec269")
                break;
            case 'WO':
                setType("업무");
                setColor("#547980")
                break;
            case 'IT':
                setType("중요");
                setColor("#45ADA8")
                break;
            case 'BT':
                setType("출장");
                setColor("#9DE0AD")
                break;
            case 'SA':
                setType("영압");
                setColor("#E5FCC2")
                break;
            case 'VC':
                setType("휴가");
                setColor("#594F4F")
                break;
        }
    },[])

    return (
        <Animatable.View animation="fadeIn" duration={1800} useNativeDriver={true} style={styles.item}>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{width:10,height:10,backgroundColor:color,borderRadius:5,alignSelf:'center',justifyContent:'center'}}></View>
                <CustomText style={{marginLeft:10,fontWeight:'600'}}>{type}</CustomText>
                <CustomText style={{marginLeft:5,fontWeight:'600'}}>{item.title}</CustomText>
            </View>
            <View style={{marginTop:5}}>
                <CustomText style={{fontSize:16}}>{`${editDateFormat(item.date)}`}</CustomText>
                {item.content != null &&(
                    <View>
                        <CustomText style={{marginTop:5,fontSize:16}}>{item.content}</CustomText>
                    </View>
                )}
            </View>
        </Animatable.View>
    );
};

export default WeekScheduleDetailItem;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        borderBottomWidth: 1, borderBottomColor: 'lightgrey'
    },
    itemHourText: {
        color: 'black',
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14,
    },
});

