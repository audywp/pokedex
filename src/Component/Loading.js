import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';

export default function Loading() {
  return (
    <View style={LoadingStyle.container}>
      <ActivityIndicator color="blue" size={moderateScale(40)} />
    </View>
  );
}

const LoadingStyle = StyleSheet.create({
  container: {
    height: heightPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
