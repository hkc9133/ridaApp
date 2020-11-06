import React, {useEffect, useState,useLayoutEffect} from 'react';
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
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {SliderBox} from 'react-native-image-slider-box';
import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';


import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';

import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import ScheduleCalendars from '../component/home/ScheduleCalendars';


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

    const {colors} = useTheme();

    const [topSlideImage, setTopSlideImage] = useState(null);
    const [slideIdx, setSlideIdx] = useState(1);
    const [isAgreeLocation, setIsAgreeLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [key, setKey] = useState(10);

    const markerRef = React.createRef();
    const markerPointRef = React.createRef();

    useEffect(() => {

        setTopSlideImage(
            [require('../asset/image/top_slide_01.jpg'), require('../asset/image/top_slide_01.jpg'), require('../asset/image/top_slide_01.jpg')],
        );

        // askPermission().then(result => {
        //     console.log(result)
        // });

        reloadLocation();

    }, []);

    const theme = useTheme();

    useEffect(() => {
        reloadLocation();

    },[key])

    useLayoutEffect(() => {

        if (Platform.OS === 'ios') {
            if (markerPointRef.current) {
                markerPointRef.current.setNativeProps({
                    strokeColor:"#fff",
                    fillColor:"rgba(71,153, 235, 1)"
                })
            }
            if (markerRef.current) {
                markerRef.current.setNativeProps({
                    strokeColor:"rgba(71,153, 235, 1)",
                    fillColor:"rgba(71,153, 235, 0.4)"
                })
            }
            // setTimeout(() => {
            //     if (markerRef.current) {
            //         markerRef.current.setNativeProps({
            //             strokeColor:"rgba(71,153, 235, 1)",
            //             fillColor:"rgba(71,153, 235, 0.4)"
            //         })
            //     }
            //     if (markerPointRef.current) {
            //         markerPointRef.current.setNativeProps({
            //             strokeColor:"#fff",
            //             fillColor:"rgba(71,153, 235, 1)"
            //         })
            //     }
            // }, 0)
        }
    }, [markerRef,markerPointRef])

    const reloadLocation = () => {
        requestPermission().then(result => {
            if (result === 'granted') {
                Geolocation.getCurrentPosition(pos => {
                    setIsAgreeLocation(true);
                    setLocation(pos.coords);
                }, error => {
                    console.log(error)

                }, {enableHighAccuracy: true, timeout: 10000, maximumAge: 3600});
            } else {
                setIsAgreeLocation(false);
            }
        });
    }

    return (
        <Animatable.View animation="fadeInUp" style={{flex: 1}}>
            {/*<StatusBar translucent backgroundColor='transparent' />*/}
            <ScrollView contentInsetAdjustmentBehavior="never">
                {topSlideImage != null && (
                    <View style={{width: wp('100%')}}>
                        <SliderBox
                            ImageComponent={FastImage}
                            autoplay={true}  //자동 슬라이드 넘김
                            autoplayInterval={10000}
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode={FastImage.resizeMode.cover}  // 이미지 사이즈 조절값
                            images={topSlideImage} // 이미지 주소 리스트
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            imageLoadingColor='#0ec269'
                            // ImageComponentStyle={{ width: wp('100%'), height: hp('30%') }} // 이미지 Style 적용
                            currentImageEmitter={(index) => { // 이미지가 바뀔때 어떤 동작을 할지 설정
                                setSlideIdx(index + 1);
                            }}
                            // ImageComponentStyle={{borderRadius: 15, width: '100%', marginTop: 5}}
                        />
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
                            <Text style={{fontSize: 10, color: '#ffffff'}}>
                                {slideIdx}/{topSlideImage.length}
                            </Text>
                        </View>
                    </View>
                )}
                <View style={{height: wp('100%'),flex:1}}>
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
                                    key = {location.latitude+"Marker"}
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
                                    key = {location.latitude+"MarkerPoint"}
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
                            <TouchableOpacity style={{
                                position:'absolute',top:'80%',
                                alignSelf: 'center',
                                justifyContent:'flex-end',alignItems:'center',marginBottom:25
                            }} onPress={() => {console.log("Aaa")}}>
                                <View style={{
                                    height:41,
                                    width:170,
                                    backgroundColor: "#013476",
                                    borderWidth: 0,
                                    ios: { padding: 5 },
                                    borderRadius: 19,
                                    justifyContent:'center',alignItems:'center',shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5}}>
                                    <Text style={{color:'#fff',fontWeight:'700',fontSize:15}}>출근하기</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setKey(key+1)}} style={{
                                position:'absolute',top:'60%',
                                alignSelf: 'flex-end',
                                right:15,
                                justifyContent:'flex-end',alignItems:'center',marginBottom:25,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5
                            }}>
                                <View style={{width:44,height:44,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:22}}>
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

                <ScheduleCalendars/>
            </ScrollView>
        </Animatable.View>


    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
