import React, {Dispatch, FC, SetStateAction} from 'react';
import {View} from 'react-native';

import {Header} from 'components/Header';
import {Total} from 'components/Total';
import {Footer} from 'components/Footer';

interface IProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

export const Main: FC<IProps> = ({setSelectedDate, selectedDate}) => {
  return (
    <View className="flex flex-1 justify-between">
      <View>
        <Header setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
        <Total selectedDate={selectedDate} />
      </View>
      <Footer />
    </View>
  );
};
