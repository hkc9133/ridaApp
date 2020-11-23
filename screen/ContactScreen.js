import React,{useState,useEffect} from 'react';
import {View, ScrollView, Text, Platform} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Searchbar, List, useTheme} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {getContact} from '../store/member/member';


const userDate = [{name:"황규철","email":"hkc9133@naver.com"},{name:"황규철2","email":"hkc9133@naver.com"},{name:"황규철3","email":"hkc9133@naver.com"},{name:"황규철4","email":"hkc9133@naver.com"},{name:"황규철5","email":"hkc9133@naver.com"}]
const ContactScreen = () => {

    const dispatch = useDispatch();
    const {colors} = useTheme();

    const [searchText, setSearchText] = useState("");
    const [memberList, setMemberList] = useState(null);

    const {contact, contactLoading} = useSelector(({member, loading}) => ({
        contact: member.contact,
        contactLoading: loading['member/GET_CONTACT'],
    }));

    useEffect(() => {
        dispatch(getContact());
    },[])

    useEffect(() => {
        if(contact.data != null){
            setMemberList(
                Object.keys(contact.data).map(function(chosung) {
                    return (
                        <List.Section key={chosung}>
                            <List.Subheader style={{paddingTop:0,color:'black'}}>{chosung}</List.Subheader>
                            {
                                contact.data[chosung].map((item,index) => {
                                    // return <List.Item key={index} titleStyle={{borderBottomColor:'black',borderBottomWidth:1}} style={{borderWidth:1, backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:contact.data[chosung].length-1 == index? 15 : 0,borderBottomRightRadius:contact.data[chosung].length-1 == index ? 15 : 0 }} title={<View style={{borderBottomColor:'black',borderBottomWidth:1,width:'100%'}}><Text>{item.memberName}</Text></View>} left={() => <List.Icon icon="folder" />} />
                                    return <View key={index} style={{flexDirection:'row',height:70,backgroundColor:'#f2f2f2', borderColor:'lightgray',borderTopWidth:index == 0 ? 0.5 : 0,borderBottomWidth:contact.data[chosung].length-1 == index? 0.5 : 0,borderLeftWidth:0.5,borderRightWidth:0.5,borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:contact.data[chosung].length-1 == index? 15 : 0,borderBottomRightRadius:contact.data[chosung].length-1 == index ? 15 : 0 }}><View style={{width:70}}></View><View style={{flexDirection:'column',justifyContent:'center',borderBottomColor:'gray',borderBottomWidth:contact.data[chosung].length-1 == index ? 0 : 0.5,flex:1,marginRight:20}}><Text style={{fontSize:17,marginBottom:5}}>{item.memberName}</Text><Text style={{color:'gray'}}>{item.memberName}</Text></View></View>
                                })
                            }
                        </List.Section>
                    )
                })
            )
        }
    },[contact])

    const changeSearchText = (value) => {
        setSearchText(value)
            setMemberList(
                Object.keys(contact.data).map(function(chosung) {
                    let tag = <List.Section key={chosung}>
                        <List.Subheader style={{paddingTop:0,color:'black'}}>{chosung}</List.Subheader>
                        {

                            contact.data[chosung].filter((searchMember,index) => {
                                if(searchMember.memberName.indexOf(value) != -1){
                                    return searchMember
                                }
                            }).map((item,index,array) => {
                                return <View key={index}  style={{flexDirection:'row',height:70,backgroundColor:'#f2f2f2', borderColor:'lightgray',borderTopWidth:index == 0 && array.length-1 == index  ? 0.5 : 0,borderBottomWidth:array.length-1 == index? 0.5 : 0,borderLeftWidth:0.5,borderRightWidth:0.5,borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:array.length-1 == index? 15 : 0,borderBottomRightRadius:array.length-1 == index ? 15 : 0 }}><View style={{width:70}}></View><View style={{flexDirection:'column',justifyContent:'center',borderBottomColor:'gray',borderBottomWidth:array.length-1 == index ? 0 : 0.5,flex:1,marginRight:20}}><Text style={{fontSize:17,marginBottom:5}}>{item.memberName}</Text><Text style={{color:'gray'}}>{item.memberName}</Text></View></View>

                            })
                        }
                    </List.Section>;
                    return tag.props.children[1].length === 0 ? null : tag;
                })
            )
    }

    return (
        <View style={{flex:1,backgroundColor:'#ffffff',flexDirection:'column'}}>
            <View style={{backgroundColor:'#ffffff',paddingHorizontal:30,paddingVertical:20}}>
                <Searchbar
                    icon={false}
                    placeholder="검색"
                    onChangeText={changeSearchText}
                    value={searchText}
                    round={true}
                    selectionColor={'gray'}
                    inputContainerStyle={{backgroundColor:'#f2f2f2'}}
                    style={{backgroundColor:'#f2f2f2',height:35,...Platform.select({
                            ios: {shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 0,
                                shadowRadius: 0},
                            // android: {elevation: 1},
                        }),}}
                />
            </View>
            <View style={{paddingHorizontal:15,flex:1}}>
                <ScrollView style={{flex:1,backgroundColor:'#ffffff'}}>
                    {
                        contact.data !== null &&(
                            memberList
                        )
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default ContactScreen;
