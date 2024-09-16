import {
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ImageOnBg} from '../components/layout';
import {VENICE_GOUP} from '../data/data';
import {COLOR} from '../contstants/colors';
import {ENTERTAINMENT} from '../data/data';

const MainScreen = ({navigation}) => {
  return (
    <ImageOnBg>
      <FlatList
        data={ENTERTAINMENT}
        renderItem={({item}) => <Card item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </ImageOnBg>
  );
};

export default MainScreen;

const Card = ({item, navigation}) => {
  function eventCall() {
    navigation.navigate('EventScreen', {
      item,
    });
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={eventCall}>
      <ImageBackground
        source={{uri: item.coverImage}}
        style={styles.image}></ImageBackground>
      <Text style={styles.text}>{item.type.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 2, 
    shadowColor: COLOR.white, 
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2 - 20, 
    height: 180,
    resizeMode: 'cover',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.gold,
    fontWeight: '800',
    fontSize: 22,
  },
  grid: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
