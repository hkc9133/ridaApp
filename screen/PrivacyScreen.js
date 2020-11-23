import React, {useState,useEffect} from 'react';
import {Alert, Modal, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {List} from 'react-native-paper';
import CustomText from '../component/common/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadProfileImage} from '../store/company/company';
import {url, port} from '../lib/api/client';
import Dialog from 'react-native-dialog';
import ImageViewer from 'react-native-image-zoom-viewer';


const options = {
    // title: 'Load Photo',
    // storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    // },
    cropping: true,
};


const PrivacyScreen = () => {

    const {colors} = useTheme();
    const dispatch = useDispatch();
    const [isResultShow, setIsResultShow] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const {myInfo} = useSelector(({company, loading}) => ({
        myInfo: company.myInfo,
    }));

    const setRoleText = (role) => {
        switch (role) {
            case 'ROLE_SUPER':
                return '최고 관리자';
                break;
            case 'ROLE_TOTAL':
                return '총괄 관리자';
                break;
            case 'ROLE_BRANCH':
                return '조직 관리자';
                break;
            case 'ROLE_EMPLOYEE':
                return '사원';
                break;
        }
    };

    useEffect(() => {
        if(myInfo.profileImage.result && myInfo.profileImage.image != null){
            setIsResultShow(true);
        }

    },[myInfo.profileImage])


    const showPicker = () => {
        ImagePicker.openPicker({
            // width: 300,
            cropperChooseText: '저장',
            cropperCancelText: '취소',
            cropping: true,
            width: 1000, height: 800, includeBase64: false, compressImageQuality: 1,
            // writeTempFile:false
        }).then(image => {
            dispatch(uploadProfileImage(image));

        });
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.ridaTheme,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    <TouchableOpacity onPress={() => {setShowImage(true)}}>
                        <FastImage
                            style={{width: 80, height: 80, borderRadius: 40}}
                            source={myInfo.profileImage.image != null ? {
                                uri: `${url}:${port}/member/profileImage?profileImage=${myInfo.profileImage.image}`,
                                priority: FastImage.priority.normal,
                            } : require('../asset/image/top_slide_01.jpg')}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: 'absolute', bottom: 0, right: -6}} onPress={() => {
                        showPicker();
                    }}>
                        <View style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: '#ffffff',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Feather
                                name="camera"
                                color={'gray'}
                                size={20}
                                // style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <CustomText style={{
                    color: '#ffffff',
                    fontSize: 16,
                    marginVertical: 3,
                    marginTop: 10,
                }}>{myInfo.memberName}</CustomText>
                <CustomText style={{
                    color: '#ffffff',
                    fontSize: 14,
                    marginVertical: 0,
                }}>{setRoleText(myInfo.memberRole)}</CustomText>
                <CustomText
                    style={{color: '#ffffff', fontSize: 16, marginVertical: 3}}>{myInfo.memberPhone}</CustomText>
            </View>
            <Animatable.View animation="fadeInUpBig" style={{
                flex: 0.6,
                backgroundColor: '#ffffff',
                justifyContent: 'flex-start',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                padding: 20,
            }}>
                <List.AccordionGroup>
                    <List.Item
                        title="프로필"
                        titleStyle={{color: '#4d4d4d', fontWeight: '500', fontSize: 17}}
                        right={props => <List.Icon {...props} icon="chevron-right" color={'#4d4d4d'}/>}
                        onPress={() => {
                            console.log('프로필');
                        }}
                    />
                    <List.Accordion title="비밀번호 및 보안" id="1"
                                    titleStyle={{color: '#4d4d4d', fontSize: 17, fontWeight: '500'}}>
                        <Animatable.View animation="fadeIn">
                            <List.Item title="비밀번호 변경" onPress={() => {
                                console.log('프로필');
                            }}/>
                            <List.Item title="최근활동" onPress={() => {
                                console.log('프로필');
                            }}/>
                            <List.Item title="2단계 인증" onPress={() => {
                                console.log('프로필');
                            }}/>
                        </Animatable.View>
                    </List.Accordion>
                    <List.Item
                        title="개인정보 처리 방침"
                        titleStyle={{color: '#4d4d4d', fontWeight: '500', fontSize: 17}}
                        right={props => <List.Icon {...props} icon="chevron-right" color={'#4d4d4d'}/>}
                        onPress={() => {
                            console.log('프로필');
                        }}
                    />
                    <List.Item
                        title="사업장 정보"
                        titleStyle={{color: '#4d4d4d', fontWeight: '500', fontSize: 17}}
                        right={props => <List.Icon {...props} icon="chevron-right" color={'#4d4d4d'}/>}
                        onPress={() => {
                            console.log('프로필');
                        }}
                    />
                </List.AccordionGroup>
            </Animatable.View>
            <Dialog.Container visible={isResultShow}>
                <Dialog.Title>완료</Dialog.Title>
                <Dialog.Description>
                    {`프로필 변경이 완료되었습니다`}
                </Dialog.Description>
                <Dialog.Button label="확인" onPress={() => {setIsResultShow(false);}} />
            </Dialog.Container>
            <Modal visible={showImage} transparent={true}>
                {/*<View>*/}
                    <ImageViewer imageUrls={[myInfo.profileImage.image != null ? {
                        url: `${url}:${port}/member/profileImage?profileImage=${myInfo.profileImage.image}`
                    } : require('../asset/image/top_slide_01.jpg')]}/>
                    <View style={{alignItems:'center',backgroundColor:'black'}}>
                        <TouchableOpacity onPress={() => {setShowImage(false)}}>
                            <CustomText style={{color:"#ffffff",fontSize:17,fontWeight:'500',marginBottom:50}}>닫기</CustomText>
                        </TouchableOpacity>
                    </View>
                {/*</View>*/}
            </Modal>
        </View>
    );
};

export default PrivacyScreen;
