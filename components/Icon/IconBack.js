import {Image, TouchableOpacity, View} from 'react-native';
import {COLOR} from '../../contstants/colors';
import {useNavigation} from '@react-navigation/native';

const IconBack = () => {
  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={goBack}>
      <Image
        source={require('../../assets/img/icons/back.png')}
        style={{width: 45, height: 45, margin: 40, tintColor: COLOR.gold}}
      />
    </TouchableOpacity>
  );
};

export default IconBack;
