import React, {useEffect} from 'react';
import {FC, useState} from 'react';
import {Animated, Pressable} from 'react-native';

import {Typography} from 'components/Typography';
import {RecordModal} from 'components/RecordModal';

export interface IGridButton {
  id: string;
  value: number | string;
  onPress: () => void;
  isAction?: boolean;
  Icon?: FC;
  empty?: boolean;
}

export const Controls = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [recordType, setRecordType] = useState<'income' | 'outcome'>('outcome');
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    scaleValue.setValue(1);
  }, [scaleValue]);

  const handleOnPress = () => {
    setIsModalOpened(true);
    scaleValue.setValue(0.9);
    Animated.spring(scaleValue, {
      toValue: 1,
      bounciness: 16,
      speed: 16,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={[{transform: [{scale: scaleValue}]}]}
        className="absolute top-[-30px] flex flex-1 flex-row items-end justify-center w-full px-6">
        <Pressable
          className="flex items-center justify-center w-[80px] h-[80px] bg-orange-600 rounded-full border border-4 border-slate-100"
          onPress={handleOnPress}>
          <Typography
            type="title1"
            classname="text-orange-100 text-[50px] leading-[70px] text-center">
            $
          </Typography>
        </Pressable>
      </Animated.View>
      {isModalOpened && (
        <RecordModal
          onClose={() => setIsModalOpened(false)}
          recordType={recordType}
          setRecordType={setRecordType}
        />
      )}
    </>
  );
};
