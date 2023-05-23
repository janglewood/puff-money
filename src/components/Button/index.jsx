import React, {useEffect, useState} from 'react';
import {Animated, Pressable, Text, TouchableOpacity, View} from 'react-native';

export const Button = ({children, onPress, className, disabled}) => {
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    scaleValue.setValue(1);
  }, []);

  const handleOnPress = () => {
    if (disabled) {
      return false;
    }
    onPress();
    scaleValue.setValue(0.9);
    Animated.spring(scaleValue, {
      toValue: 1,
      bounciness: 16,
      speed: 16,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={handleOnPress}>
      <Animated.View
        className={`flex justify-center items-center p-3 rounded-lg border-2 border-solid border-orange-500 ${className} ${
          disabled ? 'opacity-50' : 'opacity-100'
        }`}
        style={[{transform: [{scale: scaleValue}]}]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
