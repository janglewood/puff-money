import {Typography} from 'components/Typography';
import React from 'react';
import {View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

export const Modal = ({onClose, closeOnSwipe = true, children, title}) => {
  return (
    <ReactNativeModal
      isVisible={true}
      //   transparent={true}
      style={{margin: 0}}
      propagateSwipe
      hideModalContentWhileAnimating
      // useNativeDriver
      swipeDirection={closeOnSwipe ? 'down' : []}
      onSwipeComplete={onClose}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={0}
      backdropColor="#5a5572cf"
      backdropOpacity={1}
      animationIn="slideInUp"
      animationOut="slideInUp"
      panResponderThreshold={400}>
      <View className="flex justify-end items-center w-full h-full">
        <View className="relative w-full h-[90%] bg-slate-50 p-4 rounded-2xl">
          <View className="flex w-full items-start">
            <Typography type="title2">{title}</Typography>
          </View>
          {children}
        </View>
      </View>
    </ReactNativeModal>
  );
};
