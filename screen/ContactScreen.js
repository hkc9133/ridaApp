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
                            <List.Subheader style={{paddingTop:0}}>{chosung}</List.Subheader>
                            {
                                contact.data[chosung].map((item,index) => {
                                    // return <List.Item key={index} titleStyle={{borderBottomColor:'black',borderBottomWidth:1}} style={{borderWidth:1, backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:contact.data[chosung].length-1 == index? 15 : 0,borderBottomRightRadius:contact.data[chosung].length-1 == index ? 15 : 0 }} title={<View style={{borderBottomColor:'black',borderBottomWidth:1,width:'100%'}}><Text>{item.memberName}</Text></View>} left={() => <List.Icon icon="folder" />} />
                                    return <View key={index} style={{flexDirection:'row',height:70,backgroundColor:'#f2f2f2', borderColor:'lightgray',borderTopWidth:index == 0 ? 0.5 : 0,borderBottomWidth:contact.data[chosung].length-1 == index? 0.5 : 0,borderLeftWidth:0.5,borderRightWidth:0.5,borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:contact.data[chosung].length-1 == index? 15 : 0,borderBottomRightRadius:contact.data[chosung].length-1 == index ? 15 : 0 }}><View style={{width:70}}></View><View style={{flexDirection:'column',justifyContent:'center',borderBottomColor:'gray',borderBottomWidth:contact.data[chosung].length-1 == index ? 0 : 0.5,flex:1,marginRight:20}}><Text style={{fontSize:17,marginBottom:5}}>{item.memberName}</Text><Text>{item.memberName}</Text></View></View>
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
                        <List.Subheader style={{paddingTop:0}}>{chosung}</List.Subheader>
                        {

                            contact.data[chosung].filter((searchMember,index) => {
                                if(searchMember.memberName.indexOf(value) != -1){
                                    return searchMember
                                }
                            }).map((item,index,array) => {
                                return <View key={index}  style={{flexDirection:'row',height:70,backgroundColor:'#f2f2f2', borderColor:'lightgray',borderTopWidth:index == 0 && array.length-1 == index  ? 0.5 : 0,borderBottomWidth:array.length-1 == index? 0.5 : 0,borderLeftWidth:0.5,borderRightWidth:0.5,borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:array.length-1 == index? 15 : 0,borderBottomRightRadius:array.length-1 == index ? 15 : 0 }}><View style={{width:70}}></View><View style={{flexDirection:'column',justifyContent:'center',borderBottomColor:'gray',borderBottomWidth:array.length-1 == index ? 0 : 0.5,flex:1,marginRight:20}}><Text style={{fontSize:17,marginBottom:5}}>{item.memberName}</Text><Text>{item.memberName}</Text></View></View>

                            })
                        }
                    </List.Section>;
                    return tag.props.children[1].length === 0 ? null : tag;
                })
            )
    }

    const renderContact = (userList) =>{
        // const list = [];

        // let bb = Object.keys(contact.data).map(function(chosung) {
        //     return (
        //         <List.Section>
        //             <List.Subheader key={chosung} style={{padding:1}}>{chosung}</List.Subheader>
        //             {
        //                 contact.data[chosung].map((item,index) => {
        //                     console.log(item)
        //                     return <List.Item key={index} style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius:15,borderTopRightRadius:15}} title={item.memberName} left={() => <List.Icon icon="folder" />} />
        //                 })
        //             }
        //         </List.Section>
        //     )
        // })

        // console.log(bb)

    }
    return (
        <View style={{flex:1,backgroundColor:'#ffffff',flexDirection:'column'}}>
            <View style={{backgroundColor:'#ffffff',paddingHorizontal:30,paddingVertical:20}}>
                <Searchbar
                    underlineColor={'red'}
                    icon={false}
                    placeholder="검색"
                    placeholderTextColor={"gray"}
                    onChangeText={changeSearchText}
                    value={searchText}
                    round={true}
                    // containerStyle={{backgroundColor:'#ffffff',borderWidth:0,borderTopWidth:0,borderBottomWidth:0}}
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
                    lightTheme={true}
                    searchIcon={null}
                />
            </View>
            <View style={{paddingHorizontal:15,flex:1}}>
                <ScrollView style={{flex:1,backgroundColor:'#ffffff'}}>
                    {
                        contact.data !== null &&(
                            memberList
                            // Object.keys(contact.data).map(function(chosung) {
                            //     return (
                            //         <List.Section>
                            //             <List.Subheader key={chosung} style={{paddingTop:0}}>{chosung}</List.Subheader>
                            //             {
                            //                 contact.data[chosung].map((item,index) => {
                            //                     // return <List.Item key={index} titleStyle={{borderBottomColor:'black',borderBottomWidth:1}} style={{borderWidth:1, backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:contact.data[chosung].length-1 == index? 15 : 0,borderBottomRightRadius:contact.data[chosung].length-1 == index ? 15 : 0 }} title={<View style={{borderBottomColor:'black',borderBottomWidth:1,width:'100%'}}><Text>{item.memberName}</Text></View>} left={() => <List.Icon icon="folder" />} />
                            //                     return <View style={{flexDirection:'row',height:70,backgroundColor:'#f2f2f2', borderColor:'lightgray',borderTopWidth:index == 0 ? 0.5 : 0,borderBottomWidth:contact.data[chosung].length-1 == index? 0.5 : 0,borderLeftWidth:0.5,borderRightWidth:0.5,borderTopLeftRadius: index == 0 ? 15 : 0,borderTopRightRadius:index == 0 ? 15 : 0,borderBottomLeftRadius:contact.data[chosung].length-1 == index? 15 : 0,borderBottomRightRadius:contact.data[chosung].length-1 == index ? 15 : 0 }}><View style={{width:70}}></View><View style={{flexDirection:'column',justifyContent:'center',borderBottomColor:'gray',borderBottomWidth:contact.data[chosung].length-1 == index ? 0 : 0.5,flex:1,marginRight:20}}><Text style={{fontSize:17,marginBottom:5}}>{item.memberName}</Text><Text>{item.memberName}</Text></View></View>
                            //                 })
                            //             }
                            //         </List.Section>
                            //     )
                            // })

                        )
                    }
                    {/*{contact.data != null && (*/}
                    {/*    Object.keys(contact.data).forEach(function(chosung) {*/}
                    {/*        <List.Section>*/}
                    {/*            <List.Subheader key={chosung} style={{padding:1}}>{chosung}</List.Subheader>*/}
                    {/*            {*/}
                    {/*                contact.data[chosung].map((item,index) => (*/}
                    {/*                    <List.Item key={index} style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius:15,borderTopRightRadius:15}} title={item.memberName} left={() => <List.Icon icon="folder" />} />*/}
                    {/*                ))*/}
                    {/*            }*/}
                    {/*        </List.Section>*/}
                    {/*    })*/}
                    {/*)*/}
                    {/*}*/}
                    {/*<List.Section>*/}
                    {/*    <List.Subheader style={{padding:1}}>ㄱ</List.Subheader>*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius:15,borderTopRightRadius:15}} title="First Item" left={() => <List.Icon icon="folder" />} />*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderBottomLeftRadius:15,borderBottomRightRadius:20}}*/}
                    {/*        title="Second Item"*/}
                    {/*        left={() => <List.Icon color="#000" icon="folder" />}*/}
                    {/*    />*/}
                    {/*</List.Section>*/}
                    {/*<List.Section>*/}
                    {/*    <List.Subheader style={{padding:1}}>ㄴ</List.Subheader>*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderTopLeftRadius:15,borderTopRightRadius:15}} title="First Item" left={() => <List.Icon icon="folder" />} />*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2'}}*/}
                    {/*               title="Second Item"*/}
                    {/*               left={() => <List.Icon color="#000" icon="folder" />}*/}
                    {/*    />*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2'}}*/}
                    {/*               title="Second Item"*/}
                    {/*               left={() => <List.Icon color="#000" icon="folder" />}*/}
                    {/*    />*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2'}}*/}
                    {/*               title="Second Item"*/}
                    {/*               left={() => <List.Icon color="#000" icon="folder" />}*/}
                    {/*    />*/}
                    {/*    <List.Item style={{padding:1,borderWidth:1,backgroundColor:'#f2f2f2', borderColor:'#f2f2f2',borderBottomLeftRadius:15,borderBottomRightRadius:20}}*/}
                    {/*               title="Second Item"*/}
                    {/*               left={() => <List.Icon color="#000" icon="folder" />}*/}
                    {/*    />*/}
                    {/*</List.Section>*/}
                    {/*<List.AccordionGroup>*/}
                    {/*    /!*<List.Subheader>Some title222</List.Subheader>*!/*/}
                    {/*    <List.Accordion id={2} title={"bbbb"} expanded={true}>*/}
                    {/*        <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />*/}
                    {/*        <List.Item*/}
                    {/*            title="Second Item"*/}
                    {/*            left={() => <List.Icon color="#000" icon="folder" />}*/}
                    {/*        />*/}
                    {/*    </List.Accordion>*/}
                    {/*</List.AccordionGroup>*/}
                </ScrollView>
            </View>

            {/*<ScrollView style={{flex:1,backgroundColor:'blue'}}>*/}
            {/*    {userDate.map((item) => (*/}
            {/*        <View>*/}
            {/*            <Text>{item.name}</Text>*/}
            {/*        </View>*/}

            {/*    ))}*/}
            {/*</ScrollView>*/}
        </View>
    );
};

export default ContactScreen;
