import {Text, TouchableOpacity, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const PickUserImage = ({handleImage, style, children, btnStyle}) => {
  const handleResponse = response => {
    if (response.didCancel) {
      Alert.alert('Operation canceled');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const image = response.assets[0].uri;
      const images = response.assets.map(asset => asset.uri);
      handleImage(images);
    } else {
      Alert.alert('No image selected');
    }
  };
  const phoneLibrary = () => {
    const options = {storageOptions: {path: 'images'}, selectionLimit: 0};
    launchImageLibrary(options, handleResponse);
  };
  return (
    <TouchableOpacity style={[btnStyle]} onPress={() => phoneLibrary()}>
      <Text style={[style, {textAlign: 'center'}]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default PickUserImage;
