import React from 'react';
import {Calendar} from 'react-native-calendars';

const MonthCalendars = ({markedDates,getDaySchedule,theme}) => {

    return (
        <Calendar
            // markedDates={markedDates}
            markedDates={markedDates}
            // markedDates={{
            //     '2020-11-05': {marked: true},
            //     '2020-11-26': {dots: [massage, workout], disabled: true}
            // }}
            // onDayPress={(day) => {console.log('selected day', day)}}
            onDayPress={(day) => {getDaySchedule(day)}}
            onMonthChange={(month) => {console.log('month changed', month)}}
            markingType={'multi-dot'}
            theme={theme}
        />
    );
};

export default MonthCalendars;
