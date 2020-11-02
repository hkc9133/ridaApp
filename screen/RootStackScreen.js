import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='float'
         screenOptions={{
             // headerStyle: {
             //     backgroundColor: '#f4511e',
             // },
             headerTintColor: 'black',
             headerTitleStyle: {
                 fontWeight: 'bold',
                 // headerTitleAlign: "center"
             },
             headerBackImage: ()=>(<Feather
                 name="chevron-left"
                 color="black"
                 size={25}
             />)
             // headerShown: true
             // headerRight:() => (
             //     <Text></Text>
             // )
         }}
    >
        <RootStack.Screen name="SignInScreen" component={LoginScreen} options={{
            title: <Text>로그인</Text>,
                // headerTitleStyle: {
                //     headerTitleAlign: "center",
                //     textAlign:"center",
                //     flex:1
                // },
        }}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{
            title: <Text>회원가입</Text>,
            // headerLeft:<View style={{padding:6}}></View>,
            headerTitleStyle: {
                textAlign: 'center',
                // flexGrow:1,
                alignSelf:'center',
            },
            // headerLeft: () => (
            //     <TouchableOpacity onPress={() => navigation.goBack()}>
            //         <Feather
            //             name="chevron-left"
            //             color="grey"
            //             size={20}
            //         />
            //     </TouchableOpacity>
            // ),
            headerRight:() => (
                <Text></Text>
            )
        }}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
