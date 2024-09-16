import {ImageBackground} from 'react-native';

const MonaLisaBg = ({children, style}) => {
  return (
    <ImageBackground
      style={[style, {flex: 1}]}
      source={require('../../assets/img/bg/MonaLisa.png')}>
      {children}
    </ImageBackground>
  );
};

export default MonaLisaBg;


