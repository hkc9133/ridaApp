import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Animated
} from 'react-native';
import {useTheme} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {SliderBox} from 'react-native-image-slider-box';
// import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';

import moment from 'moment';

import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import ScheduleCalendars from '../component/home/ScheduleCalendars';
import {useDispatch, useSelector} from 'react-redux';
import {getCommuteStatus, workOut, workIn, initializeForm} from '../store/commute/commute';
import Dialog from 'react-native-dialog';
import WorkScheduleAddScreen from './WorkScheduleAddScreen';
import { useHeaderHeight } from "@react-navigation/stack";
import CustomText from '../component/common/CustomText';


async function requestPermission() {
    try {

        if (Platform.OS === 'ios') {
            return await Geolocation.requestAuthorization('whenInUse');
        }
        if (Platform.OS === 'android') {
            return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        }


    } catch (e) {
        console.log(e);
    }
}

// const askPermission = async () => {
//     try {
//         // const result = await request(
//         //     Platform.select({
//         //         android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//         //         ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//         //     })
//         // );
//         const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//         console.log(result)
//         if (result === RESULTS.GRANTED) {
//             // do something
//         }
//     } catch (error) {
//         console.log('askPermission', error);
//     }
// };


const HomeScreen = ({navigation}) => {
    const yOffset = React.useRef(new Animated.Value(0)).current;
    const yOffset2= React.useRef(new Animated.Value(0)).current;
    const headerOpacity = yOffset.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });
    const hideButton= yOffset.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const menuButtonImage = yOffset.interpolate({
        inputRange: [0, 100],
        outputRange: [require('../asset/image/menu.png'), require('../asset/image/menu_black.png')],
        extrapolate: "clamp",
    });

    const height = useHeaderHeight();


    const dispatch = useDispatch();
    const {colors} = useTheme();

    const {commute, commuteStatusLoading, workInLoading, workOutLoading} = useSelector(({commute, loading}) => ({
        commute: commute,
        commuteStatusLoading: loading['commute/GET_COMMUTE_STATUS'],
        workInLoading: loading['commute/WORK_IN'],
        workOutLoading: loading['commute/WORK_OUT'],
    }));

    const [topSlideImage, setTopSlideImage] = useState([require('../asset/image/top_slide_01.jpg'), require('../asset/image/top_slide_01.jpg'), require('../asset/image/top_slide_01.jpg')]);
    const [slideIdx, setSlideIdx] = useState(1);
    const [isAgreeLocation, setIsAgreeLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [key, setKey] = useState(10);
    const [scrollPosition, setScrollPosition] = useState(0);

    const [commuteInfo, setCommuteInfo] = useState({
        isShow: false,
        type: '',
    });

    const scrollRef = React.useRef();
    const markerRef = React.createRef();
    const markerPointRef = React.createRef();

    useEffect(() => {
        reloadLocation();
        dispatch(getCommuteStatus());
        return () => {

        }

    }, []);

    useEffect(() => {
        reloadLocation();

    }, [key]);


    useLayoutEffect(() => {
    }, []);

    useEffect(() => {
        if (!workInLoading && !workOutLoading && (commute.workIn.result !== null || commute.workOut.result !== null)) {
            dispatch(getCommuteStatus());
            if (commute.workIn.result === true) {
                setCommuteInfo({
                    ...commuteInfo,
                    isShow: true,
                    type: '출근',
                });
            } else if (commute.workOut.result === true) {
                setCommuteInfo({
                    ...commuteInfo,
                    isShow: true,
                    type: '퇴근',
                });
            }
        }
    }, [commute.workIn, commute.workOut, workInLoading, workOutLoading]);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                opacity: 1,
            },
            headerTitleStyle: {
                opacity: headerOpacity,
                fontSize:30,
                fontWeight:'700',
                color:'black',
                textAlign: 'center',
                alignSelf:'center',
            },
            headerLeft: () => (
                    <>
                        <TouchableOpacity onPress={() => {navigation.openDrawer(); console.log("Aa")}} style={{}}>
                            <Animated.Image source={require('../asset/image/menu_black.png')} style={{opacity:headerOpacity,marginLeft:10,marginTop:8}}/>
                            <Animated.Image source={require('../asset/image/menu.png')} style={{opacity:hideButton,marginLeft:10,marginTop:-17}}/>
                        </TouchableOpacity>
                    </>
            ),
            headerBackground: () => (
                <Animated.View
                    style={{
                        backgroundColor: "white",
                        ...StyleSheet.absoluteFillObject,
                        opacity: headerOpacity,
                    }}
                ></Animated.View>
            ),
            headerTransparent: true,
        });
    }, [headerOpacity,hideButton, navigation]);

    //
    // useLayoutEffect(() => {
    //     // navigation.setOptions({
    //     //     headerShown: false,
    //     // });
    //     if(scrollPosition > 100){
    //         navigation.setOptions({
    //             headerTransparent: false,
    //             transition: 'opacity 2s 1s ease-in',
    //             headerTintColor: '#fff',
    //         });
    //     }else{
    //         navigation.setOptions({
    //             headerTransparent: true,
    //             transition: 'opacity 2s 1s ease'
    //         });
    //     }
    //
    //     console.log(scrollPosition)
    //
    // }, [scrollPosition]);

    useLayoutEffect(() => {

        if (Platform.OS === 'ios') {
            if (markerPointRef.current) {
                markerPointRef.current.setNativeProps({
                    strokeColor: '#fff',
                    fillColor: 'rgba(71,153, 235, 1)',
                });
            }
            if (markerRef.current) {
                markerRef.current.setNativeProps({
                    strokeColor: 'rgba(71,153, 235, 1)',
                    fillColor: 'rgba(71,153, 235, 0.4)',
                });
            }
        }
    }, [markerRef, markerPointRef]);

    const reloadLocation = () => {
        requestPermission().then(result => {
            if (result === 'granted') {
                Geolocation.getCurrentPosition(pos => {
                    setIsAgreeLocation(true);
                    setLocation(pos.coords);
                }, error => {
                    console.log(error);

                }, {enableHighAccuracy: true, timeout: 10000, maximumAge: 3600});
            } else {
                setIsAgreeLocation(false);
            }
        });
    };

    const handleWorkIn = () => {
        const data = {
            workInLat: location.latitude,
            workInLon: location.longitude,
        };
        dispatch(workIn(data));
        dispatch(initializeForm('workIn'));
    };

    const handleWorkOut = () => {
        const data = {
            commuteIdx: commute.commuteStatus.commuteInfo.commuteIdx,
            workOutLat: location.latitude,
            workOutLon: location.longitude,
        };

        dispatch(workOut(data));
        dispatch(initializeForm('workOut'));
    };

    const showWorkScheduleModal = () => {
        navigation.push('workScheduleAdd');
        // navigation.push({
        //     component: {
        //         name: WorkScheduleAddScreen,
        //         // passProps: {},
        //         options: {
        //             animations: {
        //                 push: {
        //                     sharedElementTransitions: [
        //                         // {
        //                         //     fromId: `image${item.id}`,
        //                         //     toId: `image${item.id}Dest`,
        //                         // },
        //                     ],
        //                 },
        //             },
        //         },
        //     },
        // });
    };
    const renderItem = ({item, index}) => {
        return (
            <View>
                <FastImage
                    style={{width: wp('100%'), height: 220}}
                    source={item}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" style={{flex: 1, flexDirection: 'row'}}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'}/>
            <Animated.ScrollView ref={scrollRef}
                                 onContentSizeChange={() => {
                                     // 여기다가 어떤 경우에 스크롤을 하면 될지에 대한 조건문을 추가하면 된다.
                                     // scrollRef.current.scrollTo({ y: 0, animated: true, });
                                 }}
                                 contentInsetAdjustmentBehavior="never"
                        contentContainerStyle={{ paddingTop: -height }}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: yOffset,
                                        },
                                    },
                                },
                            ],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
            >
                {topSlideImage != null && (
                    <View style={{width: wp('100%'), height: 220}}>
                        <Carousel
                            layout={'default'}
                            data={topSlideImage}
                            renderItem={renderItem}
                            sliderWidth={wp('100%')}
                            itemWidth={wp('100%')}
                            onSnapToItem={(e) => {
                                setSlideIdx(e + 1);
                            }}
                            inactiveSlideScale={1}
                            autoplay={true}
                            loop={true}
                        />

                        {/*<ScrollView pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={true}*/}
                        {/*            scrollEventThrottle={16} onScroll={(event) => {*/}
                        {/*    handleScroll(event);*/}
                        {/*}} style={{backgroundColor: 'red', height: 220}}>*/}
                        {/*    /!*{*!/*/}
                        {/*    /!*    topSlideImage.map((image,index) => {*!/*/}
                        {/*    /!*        <FastImage*!/*/}
                        {/*    /!*            style={{ width:wp("100%"), height: 400 }}*!/*/}
                        {/*    /!*            source={image}*!/*/}
                        {/*    /!*            resizeMode={FastImage.resizeMode.contain}*!/*/}
                        {/*    /!*        />*!/*/}
                        {/*    /!*    })*!/*/}
                        {/*    /!*}*!/*/}
                        {/*    <FastImage*/}
                        {/*        style={{width: wp('100%'), height: 220}}*/}
                        {/*        source={topSlideImage[0]}*/}
                        {/*        resizeMode={FastImage.resizeMode.stretch}*/}
                        {/*    />*/}
                        {/*    <FastImage*/}
                        {/*        style={{width: wp('100%'), height: 220}}*/}
                        {/*        source={topSlideImage[0]}*/}
                        {/*        resizeMode={FastImage.resizeMode.stretch}*/}
                        {/*    />*/}
                        {/*    <FastImage*/}
                        {/*        style={{width: wp('100%'), height: 220}}*/}
                        {/*        source={topSlideImage[0]}*/}
                        {/*        resizeMode={FastImage.resizeMode.stretch}*/}
                        {/*    />*/}

                        {/*</ScrollView>*/}

                        {/*<SliderBox*/}
                        {/*    ImageComponent={FastImage}*/}
                        {/*    autoplay={true}  //자동 슬라이드 넘김*/}
                        {/*    autoplayInterval={10000}*/}
                        {/*    circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로*/}
                        {/*    resizeMode={FastImage.resizeMode.cover}  // 이미지 사이즈 조절값*/}
                        {/*    images={topSlideImage} // 이미지 주소 리스트*/}
                        {/*    dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림*/}
                        {/*    inactiveDotColor="rgba(0,0,0,0)"*/}
                        {/*    imageLoadingColor='#0ec269'*/}
                        {/*    // ImageComponentStyle={{ width: wp('100%'), height: hp('30%') }} // 이미지 Style 적용*/}
                        {/*    currentImageEmitter={(index) => { // 이미지가 바뀔때 어떤 동작을 할지 설정*/}
                        {/*        setSlideIdx(index + 1);*/}
                        {/*    }}*/}
                        {/*    paginationBoxVerticalPadding={0}*/}
                        {/*    ImageComponentStyle={{width: '100%',height:220}}*/}
                        {/*/>*/}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: '5%',
                                right: 20,
                                paddingTop: 4,
                                paddingRight: 10,
                                paddingBottom: 4,
                                paddingLeft: 10,
                                borderRadius: 14,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                            }}>
                            <CustomText style={{fontSize: 10, color: '#ffffff'}}>
                                {slideIdx}/{topSlideImage.length}
                            </CustomText>
                        </View>
                    </View>
                )}
                <View style={{height: wp('100%'), flex: 1}}>
                    {location != null && isAgreeLocation === true && (
                        <>
                            <MapView
                                key={key}
                                style={{flex: 1, width: wp('100%'), height: wp('100%')}} provider={PROVIDER_GOOGLE}
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.0015,
                                    longitudeDelta: 0.0015,
                                }}>
                                {/*<Marker*/}
                                {/*    coordinate={{*/}
                                {/*        latitude: location.latitude,*/}
                                {/*        longitude: location.longitude,*/}
                                {/*    }}*/}
                                {/*    title="현재 위치"*/}
                                {/*>*/}
                                {/*</Marker>*/}
                                <MapView.Circle
                                    key={location.latitude + 'Marker'}
                                    ref={markerRef}
                                    center={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    }}
                                    radius={20}
                                    strokeWidth={2}
                                    strokeColor="#3399ff"
                                    fillColor="rgba(71,153, 235, 0.4)"
                                />
                                <MapView.Circle
                                    key={location.latitude + 'MarkerPoint'}
                                    ref={markerPointRef}
                                    center={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    }}
                                    zIndex={1}
                                    radius={3}
                                    strokeWidth={3}
                                    strokeColor="#fff"
                                    fillColor="rgba(71,153, 235, 1)"
                                />
                            </MapView>
                            {!commuteStatusLoading && commute.commuteStatus.result !== null && (
                                <TouchableOpacity style={{
                                    position: 'absolute', top: '80%',
                                    alignSelf: 'center',
                                    justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25,
                                }} onPress={() => {
                                    commute.commuteStatus.result && commute.commuteStatus.isWorkIn ? handleWorkOut() : handleWorkIn();
                                }}>
                                    <View style={{
                                        height: 41,
                                        minWidth: 170,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        backgroundColor: '#013476',
                                        borderWidth: 0,
                                        ios: {padding: 5},
                                        borderRadius: 19,
                                        justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                    }}>
                                        <CustomText style={{color: '#fff', fontWeight: '700', fontSize: 15}}>
                                            {commute.commuteStatus.result && commute.commuteStatus.isWorkIn ? `${moment(commute.commuteStatus.commuteInfo.clockInDate).format('YYYY.MM.DD (HH:mm:ss)')}   퇴근하기` : '출근하기'}
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => {
                                setKey(key + 1);
                            }} style={{
                                position: 'absolute', top: '60%',
                                alignSelf: 'flex-end',
                                right: 15,
                                justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}>
                                <View style={{
                                    width: 44,
                                    height: 44,
                                    backgroundColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 22,
                                }}>
                                    <Feather
                                        name="refresh-cw"
                                        color='black'
                                        size={20}
                                    />
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                    {isAgreeLocation != null && isAgreeLocation === false && (
                        <Animatable.View animation="fadeInUp">
                            <Card style={{margin: 10}}>
                                <Card.Content>
                                    {/*<Title>Card title</Title>*/}
                                    <Paragraph>지도가 제대로 보이지 않으시거나</Paragraph>
                                    <Paragraph>출퇴근이 정상적으로 작동하지 않으신가요?</Paragraph>
                                    <Paragraph>위치 접근 권한이 부여되지 않았습니다</Paragraph>
                                    <Paragraph>시프티의 위치 정보 접근을 허용 후 이용해주세요</Paragraph>
                                </Card.Content>
                            </Card>
                        </Animatable.View>
                    )}
                </View>

                <ScheduleCalendars scrollRef={scrollRef}/>
                <Dialog.Container visible={commuteInfo.isShow}>
                    <Dialog.Title>{`${commuteInfo.type} 완료`}</Dialog.Title>
                    <Dialog.Description>
                        {`${commuteInfo.type}처리가 완료되었습니다.`}
                    </Dialog.Description>
                    <Dialog.Button label="확인" onPress={() => {
                        setCommuteInfo({...commuteInfo, isShow: false});
                    }}/>
                </Dialog.Container>
            </Animated.ScrollView>
            {/*<TouchableOpacity onPress={(e) => {navigation.navigate("workScheduleAdd")}}>*/}
            <TouchableOpacity onPress={(e) => {
                showWorkScheduleModal();
            }} style={[styles.plusButton, {zIndex: 9999}]}>
                <View style={[styles.plusButton, {backgroundColor: colors.ridaTheme}]}>
                    <Feather
                        name="plus"
                        color='#fff'
                        size={40}
                    />
                </View>
            </TouchableOpacity>
        </Animatable.View>


    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    plusButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 15,
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

