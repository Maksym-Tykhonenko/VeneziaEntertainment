import {StyleSheet, Text, View} from 'react-native';
import {ImageOnBg} from '../components/layout';
import {Calendar} from 'react-native-calendars';
import {COLOR} from '../contstants/colors';
import {useState} from 'react';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');
  return (
    <ImageOnBg>
      <Text style={styles.header}>CALENDAR</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendarStyle}
          theme={{
            ...styles.calendarTheme,
            textMonthFontSize: 22,
            monthTextColor: COLOR.gold,
            textDayFontSize: 20, 
            dayTextColor: COLOR.white,
            todayTextColor: COLOR.gold, 
            weekVerticalMargin: 25,
            todayBackgroundColor: COLOR.white + 50,
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />
      </View>
    </ImageOnBg>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: 100,
    padding: 10,
    justifyContent: 'center',
  },
  calendarStyle: {
    borderRadius: 20,
    paddingBottom: 10,
    height: 500, 
    width: '100%',
  },
  calendarTheme: {
    calendarBackground: COLOR.black + 90,
    arrowColor: COLOR.gold, 
    todayTextColor: COLOR.gold, 
    textSectionTitleColor: COLOR.white, 
    selectedDayBackgroundColor: COLOR.blue, 
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold', 
  },
  header: {
    fontWeight: '800',
    fontSize: 32,
    textAlign: 'center',
    color: COLOR.gold,
    letterSpacing: 5,
  },
});
