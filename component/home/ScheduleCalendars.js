import React, {useState, useEffect, useLayoutEffect} from 'react';
import {TouchableOpacity, View, Alert, Text} from 'react-native';

import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import ScheduleDetailModal from './ScheduleDetailModal';
import {getSchedule, getMonthSchedule, initializeForm} from '../../store/schedule/schedule';
import {useDispatch, useSelector} from 'react-redux';
import WeekCalendar from 'react-native-calendars/src/expandableCalendar/weekCalendar';
import WeekCalendars from './WeekCalendars';
import MonthCalendars from './MonthCalendars';


LocaleConfig.locales['kr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1.', '2.', '3', '4', '5', '6', '7.', '8', '9.', '10.', '11.', '12'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: 'today',
};
LocaleConfig.defaultLocale = 'kr';

const commute = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const work = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const vacation = {key: 'workout', color: 'green'};

const theme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: 'black',
    // textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: 'transparent',
    // selectedDayTextColor:'#2d4150',
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
            // height:50
        },
        today:{
            backgroundColor:'blue'
        }
    },
}


const ScheduleCalendars = ({scrollRef}) => {

    const {colors} = useTheme();
    const dispatch = useDispatch();

    const [markedDates, setMarkedDates] = useState({});
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [selectDay, setSelectDay] = useState(null);

    const [toggleCalendar, setToggleCalendar] = useState(true);

    const {schedule, monthList, scheduleLoading, monthLoading} = useSelector(({schedule, loading}) => ({
        monthList: schedule.monthList,
        schedule: schedule.schedule,
        scheduleLoading: loading['schedule/GET_SCHEDULE'],
        monthLoading: loading['schedule/GET_MONTH_SCHEDULE'],
    }));

    useLayoutEffect(() => {

        const today = moment().format('YYYY-MM-DD');
        console.log(today);
        // setMarkedDates({
        //     ...markedDates,
        //     [today]:{selected: true, selectedColor: '#0ec269',markSunday:true},
        // })

    }, []);

    useEffect(() => {
        const dateInfo = {
            year: moment().format('YYYY'),
            month: moment().format('MM'),
        };
        dispatch(getMonthSchedule(dateInfo));
    }, []);

    useEffect(() => {
        if (!monthLoading && monthList.result && monthList.data !== null) {
            console.log(monthList.data);
            handleMarkeDate(monthList.data);

        }
    }, [monthList, monthLoading]);


    useEffect(() => {
        if (!scheduleLoading && schedule.result) {
            setIsShowDetail(true);
        }
    }, [schedule, scheduleLoading]);

    useEffect(() => {
        if (isShowDetail === false) {
            setSelectDay(null);
        }
    }, [isShowDetail]);

    const getDaySchedule = (day) => {
        setSelectDay(day);
        dispatch(getSchedule(day.dateString));
    };

    const initSchedule = () => {
        dispatch(initializeForm('schedule'));
    };

    const handleMarkeDate = (data) => {
        let tempMarkeDates = {};
        data.forEach(function (item) {
            tempMarkeDates[moment(item.date).format('YYYY-MM-DD')] = {dots: [commute]};
        });
        setMarkedDates(tempMarkeDates);
    };


    return (
        <View style={{flex: 1}}>
            <TouchableOpacity style={{
                position: 'absolute', top: 3,
                alignSelf: 'flex-end',
                right: 15,
                justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25,
                zIndex: 55,
            }} onPress={() => {
                setToggleCalendar(!toggleCalendar);
            }}>
                <View style={{
                    width: 44,
                    height: 44,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 22,
                }}>
                    <Feather
                        name="calendar"
                        color='black'
                        size={20}
                    />
                </View>
            </TouchableOpacity>

            {toggleCalendar ? (
                    <>
                        <MonthCalendars markedDates={markedDates} getDaySchedule={getDaySchedule} theme={theme}/>
                        <ScheduleDetailModal isShowDetail={isShowDetail} setIsShowDetail={setIsShowDetail}
                                             schedule={schedule} initSchedule={initSchedule} selectDay={selectDay}/>
                    </>)
                : (
                    <WeekCalendars scrollRef={scrollRef}/>
                )}


        </View>
    );
};


export default ScheduleCalendars;
