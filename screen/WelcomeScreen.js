import {StyleSheet, Text, View, Animated} from 'react-native';
import {MonaLisaBg} from '../components/layout';
import {COLOR} from '../contstants/colors';
import {useRef, useEffect} from 'react';

const WelcomeScreen = ({navigation}) => {
  const animate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => navigation.navigate('TabNavigationMenu'));
  }, [animate]);

  return (
    <MonaLisaBg>
      <View style={styles.container}>
        <View style={[styles.circle, styles.zigzag2]}>
          <Text style={styles.text}>Welcome to</Text>
        </View>
        <View style={[styles.circle, styles.zigzag1]}>
          <Text style={styles.text}>Venezia</Text>
        </View>
        <View style={[styles.circle3, styles.zigzag3]}>
          <Text style={styles.text}>Environment</Text>
        </View>
      </View>
    </MonaLisaBg>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    marginBottom: 60,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75, // Р
    backgroundColor: COLOR.black + 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLOR.gold,
    paddingHorizontal: 10,
  },
  text: {
    color: 'gold',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  zigzag1: {
    marginRight: 5,
  },
  zigzag2: {
    marginRight: 40,
  },
  zigzag3: {
    marginRight: 40,
  },
  circle3: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLOR.black + 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLOR.gold,
    paddingHorizontal: 10,
  },
});
