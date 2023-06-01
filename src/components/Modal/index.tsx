import React, {FC, ReactNode} from 'react';
import ReactNativeModal from 'react-native-modal';
import {View} from 'react-native';

import {Typography} from 'components/Typography';

interface IProps {
  onClose: () => void;
  closeOnSwipe?: boolean;
  children: ReactNode;
  title: string;
  HeaderIconComponent?: ReactNode;
  wrapperClassName?: string;
}

export const Modal: FC<IProps> = ({
  onClose,
  closeOnSwipe = true,
  children,
  title,
  HeaderIconComponent,
  wrapperClassName,
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
      <View
        className="flex justify-end items-center w-full h-full"
        onTouchEnd={() => {
          if (!closeOnSwipe) {
            onClose();
          }
        }}>
        <View
          onStartShouldSetResponder={() => !closeOnSwipe}
          onTouchEnd={e => {
            if (!closeOnSwipe) {
              e.stopPropagation();
            }
          }}
          className={`relative w-full h-[90%] bg-slate-50 p-4 rounded-2xl ${wrapperClassName}`}>
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
