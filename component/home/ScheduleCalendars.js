import React, {useState, useEffect, useLayoutEffect} from 'react';
import {TouchableOpacity, View,Alert,Text} from 'react-native';

import {Calendar, LocaleConfig,Agenda} from 'react-native-calendars';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';


LocaleConfig.locales['kr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1.', '2.', '3', '4', '5', '6', '7.', '8', '9.', '10.', '11.', '12'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: 'today',
};
LocaleConfig.defaultLocale = 'kr';

const getMonthData = () => {
    //let loadingData = true;
    let dataToReturn = {
        '2020-09-01': [{name: 'item 1 - any js object'}],
        '2020-09-03': [{name: 'item 2 - any js object'}],
        '2020-09-06': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
    };
    return dataToReturn;
};


const ScheduleCalendars = () => {
    const {colors} = useTheme();
    const [markedDates,setMarkedDates] = useState({});

    const monthData = getMonthData();

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    useLayoutEffect(() => {

        const today = moment().format('YYYY-MM-DD');
        console.log(today)
        setMarkedDates({
            ...markedDates,
            [today]:{selected: true, selectedColor: '#0ec269',markSunday:true},
        })

    },[])



    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => {setKey(key+1)}} style={{
                position:'absolute',top:7,
                alignSelf: 'flex-end',
                right:15,
                justifyContent:'flex-end',alignItems:'center',marginBottom:25,
                zIndex:55
            }}>
                <View style={{width:44,height:44,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:22}}>
                    <Feather
                        name="calendar"
                        color='black'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <Calendar
                markedDates={markedDates}
                theme={{
                    // backgroundColor: '#ffffff',
                    // calendarBackground: '#ffffff',
                    textSectionTitleColor: 'black',
                    // textSectionTitleDisabledColor: '#d9e1e8',
                    // selectedDayBackgroundColor: '#00adf5',
                    // selectedDayTextColor: '#ffffff',
                    todayTextColor:'#0ec269',
                    dayTextColor: '#2d4150',
                    // textDisabledColor: '#d9e1e8',
                    todayDotColor: '#0ec269',
                    // selectedDotColor: '#ffffff',
                    arrowColor: '#0ec269',
                    // disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'black',
                    // indicatorColor: 'blue',
                    // textDayFontFamily: 'monospace',
                    // textMonthFontFamily: 'monospace',
                    // textDayHeaderFontFamily: 'monospace',
                    // textDayFontWeight: '300',
                    // textMonthFontWeight: 'bold',
                    // textDayHeaderFontWeight: '300',
                    // textDayFontSize: 16,
                    // textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    textDayHeaderFontColor: 'black',
                    'stylesheet.calendar.header': {
                        // arrow: {
                        //     // width:20,
                        //     // marginTop: 5,
                        //     // flexDirection: 'row',
                        //     // justifyContent: 'space-between'
                        // },
                        header:{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 6,
                            alignItems: 'center',
                            height:50
                        },
                        today:{
                            backgroundColor:'blue'
                        }
                    }
                }}
            />
            {/*<Text>Locate Screen</Text>*/}
            {/*<Agenda*/}
            {/*    items={monthData}*/}
            {/*    renderItem={(item) => { return (renderItem(item)) }}*/}
            {/*    selected={'2020-09-01'}*/}
            {/*    pastScrollRange={0}*/}
            {/*    futureScrollRange={0}*/}
            {/*    //renderEmptyData={renderEmptyItem}*/}
            {/*    //renderEmptyDate={renderEmptyDate}*/}
            {/*    //theme={calendarTheme}*/}
            {/*/>*/}

        </View>
    );
};


export default ScheduleCalendars;
