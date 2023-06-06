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
    <View
      className="flex flex-1 justify-between"
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;

        console.log('TOTAL HEIGHT:', height);
        // setW(width);
        // setH(height);
      }}>
      <View className="flex-1">
        <Header setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
        <Total selectedDate={selectedDate} />
      </View>
      <Footer />
    </View>
  );
};
