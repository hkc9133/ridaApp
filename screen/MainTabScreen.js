import React from 'react';
import {Image, Text,Animated} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import WorkScheduleAddScreen from './WorkScheduleAddScreen';
import CustomText from '../component/common/CustomText';
import ContactScreen from './ContactScreen';
import PrivacyScreen from './PrivacyScreen';
import {useTheme} from 'react-native-paper';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const forFade = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateX: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.width, // Focused, but offscreen in the beginning
                                0, // Fully focused
                                screen.width * -0.3, // Fully unfocused
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    };
};


const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="gray"
      barStyle={{ backgroundColor: '#f2f2f2' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: '홈',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: '프리퀀시',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='alpha-p-circle-outline' color={color} size={24} />

          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '출퇴근관리',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={24} />
          ),
        }}
      />
      {/*<Tab.Screen*/}
      {/*  name="Explore"*/}
      {/*  component={ExploreScreen}*/}
      {/*  options={{*/}
      {/*    tabBarLabel: 'Explore',*/}
      {/*    tabBarColor: '#d02860',*/}
      {/*    tabBarIcon: ({ color }) => (*/}
      {/*      <Icon name="ios-aperture" color={color} size={26} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (



    <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ffffff',
            },
            // headerTransparent: true,
            headerTintColor: '#000000',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}
                         mode={'modal'}
    >
        <HomeStack.Screen name="Home" component={HomeScreen} headerMode="screen" options={{
            title:'RIDA',
            headerTitleStyle: {
                color:'black',
                textAlign: 'center',
                alignSelf:'center',
            },
            headerStyle: {
            },
            headerTintColor: {
                /*  */
            },
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor='transparent' underlayColor='transparent' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            headerRight:() => (
                <CustomText></CustomText>
            )
        }} />
        <HomeStack.Screen name="workScheduleAdd" component={WorkScheduleAddScreen} options={{
            title:'근무일정 추가',
        }} />
        <HomeStack.Screen name="contact" component={ContactScreen} options={{
            title:'연락처',
            cardStyleInterpolator: forSlide
        }} />
        <HomeStack.Screen name="privacy" component={PrivacyScreen} options={{
            title:'개인정보',
            headerStyle: {
                backgroundColor: '#0ec269',
                shadowOpacity:0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            cardStyleInterpolator: forSlide
        }} />
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
            headerLeft: () => (
                <Image source={require('../asset/image/menu_black.png')} style={{opacity:1,position:'absolute',marginLeft:10,marginTop:10}}/>
            )
        }} />
</DetailsStack.Navigator>
);
