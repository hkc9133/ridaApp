import React from 'react';
import {Text} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import WorkScheduleAddScreen from './WorkScheduleAddScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
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
            backgroundColor: '#009387',
        },
        // headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    }} mode='modal'>
        <HomeStack.Screen name="Home" component={HomeScreen}headerMode="screen" options={{
        title:'',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='transparent' underlayColor='transparent' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
        <HomeStack.Screen name="workScheduleAdd" component={WorkScheduleAddScreen} options={{
            title:'근무일정 추가',
            // headerLeft:() => (<Text style={{padding:8,fontSize:16,fontWeight:'500'}}>닫기</Text>)
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor='transparent' underlayColor='transparent' onPress={() => navigation.goBack()}></Icon.Button>
            // )
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
            <Icon.Button name="ios-menu" size={25} backgroundColor="transparent" underlayColor='transparent' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);
