import React from 'react';
import {Text} from 'react-native';

const CustomText = (props) => {
    return (
        <Text {...props} style={[{fontFamily: 'NotoSansKR-Regular'}, props.style]}>{props.children}</Text>
    );
};

export default CustomText;
