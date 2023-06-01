import {Controls} from 'components/Controls';
import React from 'react';
import {View} from 'react-native';

export const Footer = () => {
  return (
    <View className="relative flex flex-row w-full justify-between h-[50px] bg-orange-200">
      <Controls />
    </View>
  );
};
