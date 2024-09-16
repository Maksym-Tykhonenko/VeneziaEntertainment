import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {ImageOnBg} from '../components/layout';
import PickUserImage from '../components/ui/PickUserImage';
import {COLOR} from '../contstants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    initDataUser();
  }, []);

  const initDataUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userProfile');
      if (userData !== null) {
        const {name, image} = JSON.parse(userData);
        setName(name);
        setImage(image);
        setIsRegistered(true);
      }
    } catch (error) {
      Alert.alert('Failed to load data', error.message);
    }
  };

  const saveUserData = async () => {
    // if (name && image) {
    //   const userProfile = {name, image};
    //   try {
    //     await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
    //     Alert.alert('Success', 'User data saved successfully');
    //     setIsEditing(false);
    //     setIsRegistered(true);
    //   } catch (error) {
    //     Alert.alert('Failed to save data', error.message);
    //   }
    // } else {
    //   Alert.alert('Please enter your name and select a image');
    // }
    if (name) {
      const userProfile = {name, image};
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
        Alert.alert('Success', 'User data saved successfully');
        setIsEditing(false);
        setIsRegistered(true);
      } catch (error) {
        Alert.alert('Failed to save data', error.message);
      }
    } else {
      Alert.alert('Please enter your name');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <ImageOnBg>
      <View style={styles.container}>
        {isRegistered && !isEditing ? (
          <>
            {image && (
              <Image
                source={{uri: image}}
                style={styles.imageSaved}
                resizeMode="contain"
              />
            )}
            <Text style={styles.nameSaved}>{name}</Text>
            <EditProfile onPress={handleEdit} />
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {isRegistered ? 'Edit Profile' : 'Log In'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="User name"
              value={name}
              onChangeText={text => setName(text)}
              placeholderTextColor={COLOR.white + 40}
            />

            <PickUserImage
              handleImage={images => setImage(images[0])}
              btnStyle={styles.imagePickerBtn}>
             <Text style={styles.text}>
                {image ? 'Change Photo' : 'Select Photo (Optional)'}
              </Text>
            </PickUserImage>

            {image && (
              <Image
                source={{uri: image}}
                style={styles.imagePreview}
                resizeMode="contain"
              />
            )}

            <CustomButton onPress={saveUserData} isRegistered={isRegistered} />
          </>
        )}
      </View>
    </ImageOnBg>
  );
};

const CustomButton = ({isRegistered, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {isRegistered ? 'SAVE CHANGES' : 'SAVE'}
      </Text>
    </TouchableOpacity>
  );
};

const EditProfile = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: COLOR.red,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '400',
        }}>
        Edit Profile
      </Text>
    </TouchableOpacity>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    color: COLOR.red,
    letterSpacing: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: COLOR.white + 80,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 25,
    color: COLOR.white,
    fontWeight: '600',
  },
  imagePickerBtn: {
    backgroundColor: COLOR.green,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePreview: {
    width: 250,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  imageSaved: {
    width: 260,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  nameSaved: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOR.gold,
    marginVertical: 32,
    letterSpacing: 5,
  },
  text: {color: COLOR.matteYellow, fontWeight: '700', fontSize: 18},
  button: {
    backgroundColor: COLOR.green, // Задаємо колір фону
    paddingVertical: 12, // Відступи по вертикалі
    paddingHorizontal: 24, // Відступи по горизонталі
    borderRadius: 10, // Закруглені кути
    alignItems: 'center', // Центруємо текст всередині кнопки
    marginVertical: 10, // Відступи від інших елементів
  },
  buttonText: {
    color: COLOR.white, // Колір тексту
    fontSize: 22, // Розмір шрифту
    fontWeight: 'bold', // Товщина шрифту
    letterSpacing: 5,
  },
});
