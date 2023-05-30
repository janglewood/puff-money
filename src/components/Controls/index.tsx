import React from 'react';
import {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

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

  return (
    <>
      <View className="flex flex-1 flex-row items-end justify-center w-full px-6">
        <TouchableOpacity
          className="flex items-center justify-center w-[100px] h-[100px] bg-slate-100 rounded-xl p-6 border border-solid border-orange-400 w-fit"
          onPress={() => setIsModalOpened(true)}>
          <View className="flex items-center justify-center">
            <Typography
              type="title1"
              classname="text-[#4d7c0f] text-[60px] leading-[60px]">
              +
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
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
