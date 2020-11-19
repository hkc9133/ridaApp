import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomText from '../component/common/CustomText';

const DetailsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <CustomText>Details Screen</CustomText>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Details")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
