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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from "@sparkfabrik/react-native-idfa-aaid";
import appsFlyer from "react-native-appsflyer";
import { LogLevel, OneSignal } from "react-native-onesignal";
import AppleAdsAttribution from "@hexigames/react-native-apple-ads-attribution";

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
  const [idfa, setIdfa] = useState();
  console.log("idfa==>", idfa);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [pid, setPid] = useState();
  console.log("appsUid==>", appsUid);
  console.log("sab1==>", sab1);
  console.log("pid==>", pid);
  const [adServicesToken, setAdServicesToken] = useState(null);
  //console.log('adServicesToken', adServicesToken);
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    idfa,
    appsUid,
    sab1,
    pid,
    adServicesToken,
    adServicesAtribution,
    adServicesKeywordId,
  ]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        appsUid,
        sab1,
        pid,
        adServicesToken,
        adServicesAtribution,
        adServicesKeywordId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("App", jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("App");
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log("Дані дістаються в AsyncStorage");
        console.log("parsedData in App==>", parsedData);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
        setAdServicesToken(parsedData.adServicesToken);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setAdServicesKeywordId(parsedData.adServicesKeywordId);
      } else {
        await fetchIdfa();
        await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();
        await fetchAdServicesToken(); // Вставка функції для отримання токену
        await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log("Помилка отримання даних:", e);
    }
  };

  ///////// Ad Attribution
  //fetching AdServices token
  const fetchAdServicesToken = async () => {
    try {
      const token = await AppleAdsAttribution.getAdServicesAttributionToken();
      setAdServicesToken(token);
      //Alert.alert('token', adServicesToken);
    } catch (error) {
      await fetchAdServicesToken();
      //console.error('Помилка при отриманні AdServices токену:', error.message);
    }
  };

  //fetching AdServices data
  const fetchAdServicesAttributionData = async () => {
    try {
      const data = await AppleAdsAttribution.getAdServicesAttributionData();
      const attributionValue = data.attribution ? "1" : "0";
      setAdServicesAtribution(attributionValue);
      setAdServicesKeywordId(data.keywordId);
      //Alert.alert('data', data)
    } catch (error) {
      console.error("Помилка при отриманні даних AdServices:", error.message);
    }
  };

  ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: "rNzpXRjeUweji2s8zgJoT4",
            appId: "6670729728",
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
          },
          resolve,
          reject
        );
      });
      //console.log('App.js AppsFlyer ініціалізовано успішно');
    } catch (error) {
      console.log(
        "App.js Помилка під час виконання операцій AppsFlyer:",
        error
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      //Alert.alert('appsFlyerUID', appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    (res) => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === "Non-organic") {
            //const media_source = res.data.media_source;
            //console.log('App.js res.data==>', res.data);

            const { campaign, pid, af_adset, af_ad, af_os } = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === "Organic") {
            //console.log('App.js res.data==>', res.data);
            const { af_status } = res.data;
            //console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      }
    }
  );

  ///////// OneSignall
  // 4c28093d-a544-4008-9ee2-57cbbf877ad3
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      //console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("4c28093d-a544-4008-9ee2-57cbbf877ad3");

  OneSignal.Notifications.addEventListener("click", (event) => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag("key", "value");

  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(true); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  ///////// Route useEff
  // brilliant-cool-victory.space
  useEffect(() => {
    const checkUrl = `https://brilliant-cool-victory.space/v8fGSMJC`;

    const targetData = new Date("2024-09-19T10:00:00"); //дата з якої поч працювати webView
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
            initialParams={{
              idfa: idfa,
              sab1: sab1,
              pid: pid,
              uid: appsUid,
              adToken: adServicesToken,
              adAtribution: adServicesAtribution,
              adKeywordId: adServicesKeywordId,
            }}
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
    }, 1500);
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
            source={require("./assets/img/updates/Loader.png")}
            style={{
              //...props.style,
              opacity: appearingAnim,
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
          <Animated.Image
            source={require("./assets/img/updates/Loader1.png")}
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
        </View>
      ) : (
        <Route isFatch={route} />
      )}
    </NavigationContainer>
  );
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
