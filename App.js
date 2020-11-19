/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect,useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import {authCheck,initialize} from './store/auth/auth';
import {useDispatch, useSelector} from "react-redux";
import RootStackScreen from './screen/RootStackScreen';
import SelectCompanyScreen from './screen/SelectCompanyScreen';

import { DrawerContent } from './screen/DrawerContent';


import MainTabScreen from './screen/MainTabScreen';
import SupportScreen from './screen/SupportScreen';
import SettingsScreen from './screen/SettingsScreen';
import BookmarkScreen from './screen/BookmarkScreen';
import Loader from './component/Loader';
import CookieManager from '@react-native-community/cookies';

import client, {url} from './lib/api/client';
import CompanyRouter from './screen/CompanyRouter';
import {initializeCompany, settingCompany} from './store/company/company';



// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);
const Drawer = createDrawerNavigator();

//핸드폰 설정에서 글자 크기 조절 disable
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false;
// Text.defaultProps.style =  { color: 'NotoSansKR-Regular' }

const App = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(false)
  const [selectCompany, setSelectCompany] = useState(null)
  const dispatch = useDispatch();

  const {user,company,authCheckLoading,loading} = useSelector(({auth,company,loading}) =>({
    user:auth,
    company:company,
    authCheckLoading:loading['auth/AUTH_CHECK'],
    loading:loading
  }))

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(true);
      SplashScreen.hide();
    }, 1500);

    tokenCheck();
  }, []);

  useEffect(() => {
    // CookieManager.get(url)
    //     .then((cookies) => {
    //       console.log(cookies['COMPANY_IDa']['value'])
    //     }).error((e) => {
    //       console.log(e)
    //     })
    // AsyncStorage.getItem('COMPANY_ID').then((value)=>{
    //   if(!authCheckLoading && user.user.login && (company.selectCompany.companyId !== null || value !== null)){
    //     setCompany()
    //   }
    // });

  },[user,company])

  useEffect(() =>{

    if(!authCheckLoading && user.user.login){
      setCompany()
    }

  },[authCheckLoading,user])

  // useEffect(() => {
  //   console.log(loading)
  //
  // },[loading])

  // useEffect(() => {
  //   if(user.user.token != null){
  //     setToken()
  //   }
  //
  // }, [dispatch,user]);
  //
  // async function setToken() {
  //   try {
  //     await AsyncStorage.setItem('userToken', user.token);
  //   } catch (error) {
  //   }
  // }

  // useEffect(async () => {
  //   console.log(member)
  //   const value = await AsyncStorage.getItem('userToken');
  //   console.log(value)
  // },[member])

  function tokenCheck() {
      try {
        dispatch(authCheck())
      } catch (error) {
        // Error retrieving data러
      }
  }

  async function setCompany() {
    dispatch(initializeCompany())
        // CookieManager.get(url)
        //     .then((cookies) => {
        //       if(cookies['COMPANY_ID']['value'] == '' || cookies['COMPANY_ID']['value'] == null){
        //         dispatch(initializeCompany())
        //       }else{
        //         dispatch(settingCompany(cookies['COMPANY_ID']['value']))
        //       }
        //     }).catch((a) =>{
        //   dispatch(initializeCompany())
        // });


        // try {
        //   const value = await AsyncStorage.getItem('COMPANY_ID');
        //   if (value !== null) {
        //
        //     setSelectCompany(value);
        //   }else{
        //     setSelectCompany(false);
        //   }
        // } catch (error) {
        //   setSelectCompany(false);
        // }
  }

  // const setCompany = async () => {
  //   console.log("셋컴")
  //     try {
  //       AsyncStorage.getItem('companyId', (error, value) => {
  //         console.log("밸밸")
  //         console.log(value)
  //         console.log("밸밸")
  //       });
  //
  //       const value = await AsyncStorage.getItem('companyId');
  //       if (value !== null) {
  //         console.log("널아님")
  //         setSelectCompany(value);
  //         console.log(value)
  //       }
  //     } catch (error) {
  //     }
  // }

  // const setCompany (()) {
  //   AsyncStorage.getItem('companyId', (error, value) => {
  //     setSelectCompany(value);
  //   // try {
  //   //   const value = await AsyncStorage.getItem('companyId');
  //   //   if (value !== null) {
  //   //     setSelectCompany(value);
  //   //     console.log(value)
  //   //   }
  //   // } catch (error) {
  //   // }
  // }

  // if(authCheckLoading == undefined && !user.user.login) {
  //   return(
  //       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //         <Text>loding.......</Text>
  //       </View>
  //   );
  // }

  return (

        <>
          {loading.loading && <Loader/>}
          <NavigationContainer>
            {!authCheckLoading && user.user.login ? (
                <>
                {/*<SafeAreaView>*/}
                {/*  /!*<StatusBar barStyle="dark-content" />*!/*/}
                {/*    <ScrollView*/}
                {/*        contentInsetAdjustmentBehavior="automatic"*/}
                {/*        style={styles.scrollView}>*/}
                  {company.selectCompany.companyId == null && user.user.login &&
                      <SelectCompanyScreen/>
                  }
                  {company.selectCompany.companyId != null && company.selectCompany.companyId != false && (
                      <CompanyRouter setCompany={setCompany}>
                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} setCompany={setCompany} />} drawerStyle={{flexDirection: 'row',
                          justifyContent: 'flex-start',backgroundColor:'transparent',alignItems:'center',width:"70%"}}>
                          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
                        </Drawer.Navigator>
                      </CompanyRouter>
                  )}
                {/*</SafeAreaView>*/}
                </>
            ) : (
                <RootStackScreen/>
            )}
          </NavigationContainer>
        </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.dark
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
