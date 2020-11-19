import _ from 'lodash';
import React, {Component, useEffect, useState} from 'react';
import {
    Platform,
    Alert,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Button,
    SectionList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ExpandableCalendar, AgendaList, CalendarProvider, Agenda} from 'react-native-calendars';
import {useTheme} from 'react-native-paper';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getRangeMemberSchedule} from '../../store/schedule/schedule';
import WeekScheduleDetailItem from './WeekScheduleDetailItem';
import {toHHMMSS} from '../../util/DateUtil'
import WeekCalendar from 'react-native-calendars/src/expandableCalendar/weekCalendar';
import CustomText from '../common/CustomText';


// const testIDs = require('../testIDs');


const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

function getFutureDates(days) {
    const array = [];
    for (let index = 1; index <= days; index++) {
        const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}

function getPastDate(days) {
    return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

const ITEMS = [
    {title: dates[0], data: [{hour: '12am', duration: '1h', title: 'First Yoga'}]},
    {title: dates[1],
        data: [{hour: '4pm', duration: '1h', title: 'Pilates ABC'}, {
            hour: '5pm',
            duration: '1h',
            title: 'Vinyasa Yoga',
        }],
    },
    {title: dates[2],
        data: [{hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'}, {
            hour: '2pm',
            duration: '1h',
            title: 'Deep Streches',
        }, {hour: '3pm', duration: '1h', title: 'Private Yoga'}],
    },
    {title: dates[3], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
    {title: dates[4], data: [{}]},
    {title: dates[5],
        data: [{hour: '9pm', duration: '1h', title: 'Middle Yoga'}, {
            hour: '10pm',
            duration: '1h',
            title: 'Ashtanga',
        }, {hour: '11pm', duration: '1h', title: 'TRX'}, {hour: '12pm', duration: '1h', title: 'Running Group'}],
    },
    {title: dates[6], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
    {title: dates[7], data: [{}]},
    {title: dates[8],
        data: [{hour: '9pm', duration: '1h', title: 'Pilates Reformer'}, {
            hour: '10pm',
            duration: '1h',
            title: 'Ashtanga',
        }, {hour: '11pm', duration: '1h', title: 'TRX'}, {hour: '12pm', duration: '1h', title: 'Running Group'}],
    },
    {title: dates[9],
        data: [{hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'}, {
            hour: '2pm',
            duration: '1h',
            title: 'Deep Streches',
        }, {hour: '3pm', duration: '1h', title: 'Private Yoga'}],
    },
    {title: dates[10], data: [{hour: '12am', duration: '1h', title: 'Last Yoga'}]},
];


const theme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: 'black',
    // textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: 'transparent',
    selectedDayTextColor:'black',
    todayTextColor:'#0ec269',
    dayTextColor: '#2d4150',
    textDisabledColor: '#000000',
    // todayDotColor: 'red',
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

const WeekCalendars = ({item,scrollRef}) => {
    const dispatch = useDispatch();
    const {colors} = useTheme();

    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [weekData, setWeekData] = useState(null);
    const [searchDate, setSearchDate] = useState(null);

    const {schedule, dataLoading} = useSelector(({schedule, loading}) => ({
        schedule: schedule.memberScheduleList,
        dataLoading: loading['schedule/GET_RANGE_MEMBER_SCHEDULE'],
    }));

    const weekDataRef = React.useRef();


    useEffect(() => {
        const date = {
            startDate: moment().startOf('week').format('YYYY-MM-DD'),
            endDate: moment().endOf('week').format('YYYY-MM-DD'),
        };

        setSearchDate(moment().startOf('week').format('YYYY-MM-DD'));

        dispatch(getRangeMemberSchedule(date));

    }, []);

    useEffect(() => {
        if(!dataLoading && schedule.data != null){
            let totalTime = 0;

            setWeekData(
                Object.keys(schedule.data).map(function(key) {
                    let newData = {
                        title:key,
                        data:schedule.data[key]
                    }

                    schedule.data[key].forEach(item =>{
                        if(item.hours != null){
                            totalTime += item.hours
                        }
                    })
                    return newData;
                }).sort(dateAscending)
            )

            setTotalWorkTime(totalTime)
            scrollRef.current.scrollTo({ y: 400, animated: true, });

        }
    },[dataLoading,schedule])

    useEffect(() =>{
        console.log(weekData)

    },[weekData])

    const dateAscending =(a, b) =>{
        const dateA = moment(a.title);
        const dateB = moment(b.title);
        return dateA > dateB ? 1 : -1;
    };

    const onDateChanged = (date) => {
        // console.log(moment(schedule.data[0].date).format('YYYY-MM-DD'))
        if(date == searchDate){
            return;
        }
        if(weekData == null || weekData.length == 0 || moment(weekData[0].date).format('YYYY-MM-DD') != date){
            const dateRange = {
                startDate: moment(date).startOf('week').format('YYYY-MM-DD'),
                endDate: moment(date).endOf('week').format('YYYY-MM-DD'),
            };

            setTotalWorkTime(0)
            setSearchDate(moment(date).startOf('week').format('YYYY-MM-DD'));
            dispatch(getRangeMemberSchedule(dateRange));
        }
        // let start = moment(date).startOf('week').format('YYYY-MM-DD');
        // let end = moment(date).endOf('week').format('YYYY-MM-DD');
        // const time = moment().startOf('day')
        //     .seconds(64139)
        //     .format('H:mm:ss');
    };

    const onMonthChange = (month) => {

    };

    const buttonPressed = () => {
        Alert.alert('show more');
    };

    const itemPressed = (id) => {
        Alert.alert(id);
    };

    const renderEmptyItem = () => {
        return (
            <View style={styles.emptyItem}>
                <CustomText style={styles.emptyItemText}>No Events Planned</CustomText>
            </View>
        );
    };

    const renderItem = ({item}) => {
        if (_.isEmpty(item)) {
            return renderEmptyItem();
        }

        return (
            <WeekScheduleDetailItem item={item}/>
            // {/*<TouchableOpacity*/}
            // {/*    onPress={() => itemPressed(item.title)}*/}
            // {/*    style={styles.item}*/}
            // {/*    testID={'ccc'}*/}
            // {/*>*/}
            // {/*    <View>*/}
            // {/*        <Text style={styles.itemHourText}>{item.hour}</Text>*/}
            // {/*        <Text style={styles.itemDurationText}>{item.duration}</Text>*/}
            // {/*    </View>*/}
            // {/*    <Text style={styles.itemTitleText}>{item.title}</Text>*/}
            // {/*    <View style={styles.itemButtonContainer}>*/}
            // {/*        <Button color={'grey'} title={'Info'} onPress={buttonPressed}/>*/}
            // {/*    </View>*/}
            // {/*</TouchableOpacity>*/}
        );
    };

    const getMarkedDates = () => {
        const marked = {};
        weekData.forEach(item => {
            // NOTE: only mark dates with data
            if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
                marked[item.title] = {disabled: true,marked:true,color:'red'};
            } else {
                marked[item.title] = {disabled: true};
            }
        });
        return marked;
    };

    // const getTheme = () => {
    //     const disabledColor = 'grey';
    //
    //     return {
    //         // arrows
    //         arrowColor: 'black',
    //         arrowStyle: {padding: 0},
    //         // month
    //         monthTextColor: 'black',
    //         textMonthFontSize: 16,
    //         textMonthFontFamily: 'HelveticaNeue',
    //         textMonthFontWeight: 'bold',
    //         // day names
    //         textSectionTitleColor: 'black',
    //         textDayHeaderFontSize: 12,
    //         textDayHeaderFontFamily: 'HelveticaNeue',
    //         textDayHeaderFontWeight: 'normal',
    //         // dates
    //         dayTextColor: themeColor,
    //         textDayFontSize: 18,
    //         textDayFontFamily: 'HelveticaNeue',
    //         textDayFontWeight: '500',
    //         textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    //         // selected date
    //         selectedDayBackgroundColor: themeColor,
    //         selectedDayTextColor: 'white',
    //         // disabled date
    //         textDisabledColor: disabledColor,
    //         // dot (marked date)
    //         dotColor: themeColor,
    //         selectedDotColor: 'white',
    //         disabledDotColor: disabledColor,
    //         dotStyle: {marginTop: -2}
    //     };
    // }

    return (

        <CalendarProvider
            date={weekData != null && weekData.length > 0  ? moment(weekData[0].date).startOf('week').format('YYYY-MM-DD') : moment().startOf('week').format('YYYY-MM-DD')}
            onDateChanged={onDateChanged}
            onMonthChange={onMonthChange}
            // showTodayButton
            disabledOpacity={0.6}
            // theme={{
            //   todayButtonTextColor: themeColor
            // }}
            // todayBottomMargin={16}
        >
            <ExpandableCalendar

                testID={'bbb'}

                // horizontal={false}
                // hideArrows
                disablePan={true}
                hideKnob
                onDayPress={(e) => {console.log(e)}}
                // initialPosition={ExpandableCalendar.positions.OPEN}
                // calendarStyle={styles.calendar}
                // headerStyle={styles.calendar} // for horizontal only
                // disableWeekScroll
                theme={theme}
                disableAllTouchEventsForDisabledDays

                // firstDay={1}
                markedDates={weekData != null ? getMarkedDates() : null} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
                style={{
                    backgroundColor: 'white',
                    ...Platform.select({
                        ios: {
                            // shadowColor: 'none',
                            shadowOpacity: 0,
                            shadowRadius: 0,
                            shadowOffset: {height: 0, width: 0},
                            zIndex: 99,
                        },
                        android: {
                            elevation: 0,
                        },
                    }),
                }}

                // leftArrowImageSource={require('../img/previous.png')}
                // rightArrowImageSource={require('../img/next.png')}
            />
            <Animatable.View key={totalWorkTime} animation="fadeIn" style={{backgroundColor:'white'}}>
                <View style={{backgroundColor:'#fafafa',height:220,flexDirection:'column',alignItems:'center', borderTopRightRadius:40,borderTopLeftRadius:40,borderColor:'#E5E5E5',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1}}>
                    <View style={{backgroundColor:colors.ridaTheme,width:80,height:30,justifyContent:'center',alignItems:'center',marginTop:70,borderRadius:22}}>
                        <CustomText style={{color:'#fff',fontWeight:'500'}}>TOTAL</CustomText>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:20,width:200}}>
                        <CustomText style={{color:'black',fontWeight:'600',fontSize:45,}}>{toHHMMSS(totalWorkTime)}</CustomText>
                    </View>
                </View>
            </Animatable.View>
            {weekData != null && weekData.length > 0 && (
                dataLoading == true ? (null) : (
                        <SectionList
                            scrollEnabled
                            stickySectionHeadersEnabled={false}
                            sections={weekData}
                            renderItem={({item,index}) => <WeekScheduleDetailItem key={item.date} item={item}/>}
                            renderSectionHeader={({section}) =>
                                <View style={{padding:10,borderBottomWidth:0.5,borderBottomColor:'lightgray',backgroundColor:'#f1f1f1'}}>
                                    <Animatable.Text animation="fadeIn" key={section.title} duration={1000} useNativeDriver={true}>{moment(section.title).format("MM월 DD일")}</Animatable.Text>
                                </View>
                            }
                            keyExtractor={(item, index) => index}
                        />

                    )
            )}
        </CalendarProvider>
    );
};

export default WeekCalendars;

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    section: {
        backgroundColor: "#fafafa",
        color: 'grey',
        fontSize:16,
        fontWeight:"500",
        textTransform: 'capitalize',
    },
    item: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
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
