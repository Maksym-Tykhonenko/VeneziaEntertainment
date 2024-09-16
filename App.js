import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CalendarScreen,
  EventScreen,
  MainScreen,
  MapScreen,
  UserScreen,
  WelcomeScreen,
} from "./screen";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { COLOR } from "./contstants/colors";
import IconMap from "./components/Icon/IconMap";
import { IconCalendar, IconMain, IconMask } from "./components/Icon";
import VeneziaEntertainmentProdactScreen from "./screen/VeneziaEntertainmentProdactScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigationMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLOR.gold,
        tabBarInactiveTintColor: COLOR.inActive + 80,
        title: "",
        headerShown: false,
        tabBarStyle: styles.barStyle,
        tabBarItemStyle: styles.barItemStyle,
      })}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => <IconMain focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ tabBarIcon: ({ focused }) => <IconMap focused={focused} /> }}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => <IconCalendar focused={focused} />,
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => <IconMask focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const [route, setRoute] = useState(null);
  //console.log('route==>', route)

  ///////// Route useEff
  // remarkable-regal-fun.space
  useEffect(() => {
    const checkUrl = `https://reactnative.dev/`;

    const targetData = new Date("2024-09-25T10:00:00"); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then((r) => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch((e) => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ///////// Route
  const Route = ({ isFatch }) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={
              {
                //idfa: idfa,
                //sab1: sab1,
                //pid: pid,
                //uid: appsUid,
                //adToken: adServicesToken,
                //adAtribution: adServicesAtribution,
                //adKeywordId: adServicesKeywordId,
              }
            }
            name="VeneziaEntertainmentProdactScreen"
            component={VeneziaEntertainmentProdactScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          animationDuration: 1000,
        }}>
        <Stack.Screen name="TabNavigationMenu" component={TabNavigationMenu} />
        <Stack.Screen name="EventScreen" component={EventScreen} />
      </Stack.Navigator>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <NavigationContainer>
      {!louderIsEnded ? (
        <View
          style={{
            position: "relative",
            flex: 1,
            backgroundColor: "rgba(0,0,0)",
          }}>
          <Animated.Image
            source={require("./assets/img/updates/Loader.png")} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingAnim,
              width: "100%",
              height: "100%",
              position: "absolute", // Bind opacity to animated value
            }}
          />
          <Animated.Image
            source={require("./assets/img/updates/Loader1.png")} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              width: "100%",
              height: "100%",
              position: "absolute", // Bind opacity to animated value
            }}
          />
        </View>
      ) : (
        <Route isFatch={route} />
      )}
    </NavigationContainer>
  );
}

{
  /**
const [id, setItem] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeStart();
    const timeOut = setTimeout(() => {
      navigateToMenu();
    }, 6000);
    return () => clearTimeout(timeOut);
  }, []);
  const fadeStart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => fadeFinish());
  };

  const fadeFinish = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setItem(prevState => prevState + 1);
      fadeStart();
    });
  };
  const navigateToMenu = () => {
    setItem(2);
  };


   <Stack.Screen name="Welcome" options={{headerShown: false}}>
            {() => (
              <View style={{flex: 1}}>
                <Animated.Image
                  source={images[id]}
                  style={[
                    {width: '100%', flex: 1},
                    {opacity: animation},
                  ]}></Animated.Image>
              </View>
            )}
          </Stack.Screen>
  
  */
}

export default App;

const styles = StyleSheet.create({
  barStyle: {
    borderRadius: 32,
    height: 110,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "transparent",
    position: "absolute",
    alignItems: "center",
  },
  barItemStyle: {
    flex: 1,
    // backgroundColor: COLOR.white + 10,
    borderRadius: 22,
    margin: 5,
  },
});
