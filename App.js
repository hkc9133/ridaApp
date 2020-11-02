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
import AsyncStorage from '@react-native-community/async-storage';
import {authCheck,initialize} from './store/auth/auth';
import {useDispatch, useSelector} from "react-redux";
import RootStackScreen from './screen/RootStackScreen';
import SelectCompanyScreen from './screen/SelectCompanyScreen';


// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);

const App = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(false)
  const dispatch = useDispatch();

  const {user,authCheckLoading} = useSelector(({auth,loading}) =>({
    user:auth,
    authCheckLoading:loading['auth/AUTH_CHECK'],
  }))

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(true);
      SplashScreen.hide();
    }, 1500);

    // async () =>{
    //   try {
    //     const value = await AsyncStorage.getItem('userToken');
    //     console.log("첵1")
    //     if (value !== null) {
    //       console.log("첵")
    //       dispatch(authCheck());
    //     }
    //   } catch (error) {
    //     console.log("초기")
    //     dispatch(initialize());
    //     // Error retrieving data
    //   }
    // }
    tokenCheck();
  }, []);

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

  async function tokenCheck() {
      try {
        const value = await AsyncStorage.getItem('userToken');
        dispatch(authCheck())
        // if (value !== null) {
        //   dispatch(authCheck());
        // }
      } catch (error) {
        // Error retrieving data러
      }
  }

  if(authCheckLoading == undefined && !user.user.login) {
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>loding.......</Text>
        </View>
    );
  }

  return (

        <>
          <NavigationContainer>
            {!authCheckLoading && user.user.login ? (
                <>
                {/*<SafeAreaView>*/}
                {/*  /!*<StatusBar barStyle="dark-content" />*!/*/}
                {/*    <ScrollView*/}
                {/*        contentInsetAdjustmentBehavior="automatic"*/}
                {/*        style={styles.scrollView}>*/}
                      <SelectCompanyScreen/>
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
