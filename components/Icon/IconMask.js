import {Image, View} from 'react-native';
import {COLOR} from '../../contstants/colors';

const IconMask = ({focused}) => {
  return (
    <View
      style={{
        padding: 9,
        backgroundColor: focused ? COLOR.gold : COLOR.white + 30,
        borderRadius: 50,
      }}>
      <Image
        source={require('../../assets/img/icons/mask.png')}
        style={{width: 45, height: 45}}
      />
    </View>
  );
};

export default IconMask;
