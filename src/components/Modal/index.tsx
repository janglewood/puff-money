import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {View} from 'react-native';

import {Typography} from 'components/Typography';

export const Modal = ({
  onClose,
  closeOnSwipe = true,
  children,
  title,
  HeaderIconComponent,
}) => {
  return (
    <ReactNativeModal
      isVisible={true}
      style={{margin: 0}}
      propagateSwipe
      hideModalContentWhileAnimating
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
          <View className="flex flex-row w-full justify-between items-center">
            <Typography type="title2">{title}</Typography>
            {HeaderIconComponent && HeaderIconComponent}
          </View>
          {children}
        </View>
      </View>
    </ReactNativeModal>
  );
};
