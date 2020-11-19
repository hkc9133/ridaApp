import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomText from '../component/common/CustomText';

const SettingsScreen = () => {
    return (
      <View style={styles.container}>
        <CustomText>Settings Screen</CustomText>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
