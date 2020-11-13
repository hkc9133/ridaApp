import React,{useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {initializeCompany} from '../store/company/company';
import Feather from 'react-native-vector-icons/Feather';
import CookieManager from '@react-native-community/cookies';

// import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    const {colors} = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {

    },[])

    const changeCompany = async () => {
        try {
            dispatch(initializeCompany());
            await AsyncStorage.removeItem('COMPANY_ID');

            props.setCompany();
        }
        catch(error) {
            return false;
        }
    }
    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1,paddingTop:0,height:'90%',backgroundColor:'#fff',borderTopRightRadius:10,borderBottomRightRadius:10}}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row',marginTop: 10,alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={[styles.text_header_logo,{color: colors.ridaTheme}]}>RIDA</Text>
                    {/*<Avatar.Image*/}
                    {/*    source={{*/}
                    {/*        uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'*/}
                    {/*    }}*/}
                    {/*    size={22}*/}
                    {/*    // style={{alignItems:'baseline'}}*/}
                    {/*/>*/}
                    <Icon
                        name="cog"
                        color='gray'
                        size={22}
                        style={{marginRight:20}}
                    />
                    {/*<View style={{marginLeft:15, flexDirection:'column'}}>*/}
                    {/*    <Title style={styles.title}>John Doe</Title>*/}
                    {/*    <Caption style={styles.caption}>@j_doe</Caption>*/}
                    {/*</View>*/}
                </View>

                {/*<View style={styles.row}>*/}
                {/*    <View style={styles.section}>*/}
                {/*        <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>*/}
                {/*        <Caption style={styles.caption}>Following</Caption>*/}
                {/*    </View>*/}
                {/*    <View style={styles.section}>*/}
                {/*        <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>*/}
                {/*        <Caption style={styles.caption}>Followers</Caption>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </View>
            <ScrollView {...props} style={{borderWidth:0,flex:1,paddingTop:0,marginTop:35}}>
                <View style={styles.drawerContent}>
                    {/*<Drawer.Section style={styles.drawerSection}>*/}
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>출퇴근 체크</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>급여관리</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>휴가관리</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>리포트</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>연락처</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>공지사항</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                        <View>
                            <Text style={[styles.drawerSectionItem,{padding:10}]}>도움말 및 지원</Text>
                        </View>
                    </TouchableOpacity>


                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    label="출퇴근 체크"*/}
                        {/*    style={{padding:0}}*/}
                        {/*    onPress={() => {props.navigation.navigate('Home')}}*/}
                        {/*/>*/}
                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    label="급여관리"*/}
                        {/*    style={{padding:0,margin:0}}*/}
                        {/*    onPress={() => {props.navigation.navigate('Profile')}}*/}
                        {/*/>*/}
                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    // icon={({color, size}) => (*/}
                        {/*    //     <Icon*/}
                        {/*    //     name="bookmark-outline"*/}
                        {/*    //     color={color}*/}
                        {/*    //     size={size}*/}
                        {/*    //     />*/}
                        {/*    // )}*/}
                        {/*    label="휴가관리"*/}
                        {/*    onPress={() => {props.navigation.navigate('BookmarkScreen')}}*/}
                        {/*/>*/}
                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    // icon={({color, size}) => (*/}
                        {/*    //     <Icon*/}
                        {/*    //     name="settings-outline"*/}
                        {/*    //     color={color}*/}
                        {/*    //     size={size}*/}
                        {/*    //     />*/}
                        {/*    // )}*/}
                        {/*    label="리포트"*/}
                        {/*    onPress={() => {props.navigation.navigate('SettingsScreen')}}*/}
                        {/*/>*/}
                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    // icon={({color, size}) => (*/}
                        {/*    //     <Icon*/}
                        {/*    //     name="account-check-outline"*/}
                        {/*    //     color={color}*/}
                        {/*    //     size={size}*/}
                        {/*    //     />*/}
                        {/*    // )}*/}
                        {/*    label="연락처"*/}
                        {/*    onPress={() => {props.navigation.navigate('SupportScreen')}}*/}
                        {/*/>*/}
                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    label="공지사항"*/}
                        {/*    onPress={() => {props.navigation.navigate('SupportScreen')}}*/}
                        {/*/>*/}
                        {/*<DrawerItem*/}
                        {/*    labelStyle={styles.drawerSectionItem}*/}
                        {/*    label="도움말 및 지원"*/}
                        {/*    onPress={() => {props.navigation.navigate('SupportScreen')}}*/}
                        {/*/>*/}
                    {/*</Drawer.Section>*/}
                    {/*<Drawer.Section title="Preferences">*/}
                    {/*    /!*<TouchableRipple onPress={() => {toggleTheme()}}>*!/*/}
                    {/*        <View style={styles.preference}>*/}
                    {/*            <Text>Dark Theme</Text>*/}
                    {/*            <View pointerEvents="none">*/}
                    {/*                /!*<Switch value={paperTheme.dark}/>*!/*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    /!*</TouchableRipple>*!/*/}
                    {/*</Drawer.Section>*/}
                </View>
            </ScrollView>
            {/*<Drawer.Section style={styles.bottomDrawerSection}underlineColor={"red"} >*/}
            <View style={{alignItems:'center'}}>
                <DrawerItem
                    // icon={({color, size}) => (
                    //     <Icon
                    //     name="exit-to-app"
                    //     color={color}
                    //     size={size}
                    //     />
                    // )}
                    label="회사변경"
                    // inactiveBackgroundColor={colors.ridaTheme}
                    labelStyle={{color:'#fff',textAlign:'center',fontSize:15}}
                    style={{borderRadius:0, width:'80%', backgroundColor:colors.ridaTheme, marginBottom:30, paddingLeft:25}}
                    onPress={() => {changeCompany()}}
                />
            </View>
            {/*</Drawer.Section>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        // flex: 1,
        paddingLeft: 10,
        // justifyContent:'flex-start'
    },
    userInfoSection: {
        // justifyContent:'space-between',
        marginTop:15,
      paddingLeft: 20,
        height: 60,
        // marginBottom: 25
    },
    text_header_logo: {
        fontWeight: 'bold',
        fontSize: 40
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
        // borderTopColor: '#f4f4f4',
        // borderTopWidth: 1,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    bottomDrawerSection: {
        // borderWidth:1,
        marginBottom: 20,
        shadowColor: 'transparent',
        borderColor:'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,

    },
    drawerSectionItem:{
        fontSize:17,
        color:'black',
        fontWeight:'normal'
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
