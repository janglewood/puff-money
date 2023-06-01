import React, {Dispatch, FC, SetStateAction} from 'react';

import {Controls} from 'components/Controls';
import {Header} from 'components/Header';
import {Total} from 'components/Total';
import {Footer} from 'components/Footer';
import {View} from 'react-native';

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
      {/* <Controls /> */}
    </View>
  );
};
