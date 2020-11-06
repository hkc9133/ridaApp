import React from 'react';
import {
    ActivityIndicator,View,StyleSheet
} from 'react-native';
import {useTheme} from 'react-native-paper';
import { BlurView, VibrancyView } from "@react-native-community/blur";



const Loader = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.blurView}
                  // reducedTransparencyFallbackColor="gray"
                  // blurType="light"
                  // blurAmount={1}
                  // blurRadius={1}
        >
                {/*overlayColor={'gray'}*/}
            <ActivityIndicator size="large" color={colors.ridaTheme}  style={{zIndex:9999}}/>
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurView:{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width:'100%',
        // height:'100%',
        // backgroundColor:'red',
        zIndex: 9998,
        // flexDirection:'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent: 'center',
        opacity: 0.7,
        backgroundColor: 'lightgray'
    }
    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     position:'absolute',
    //     backgroundColor:'rgba(145, 145, 145,1)',
    //     width:'100%',
    //     height:'100%',
    //     zIndex:9998
    // },
    // horizontal: {
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     padding: 10
    // }
});
