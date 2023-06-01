import React, {Dispatch, FC, SetStateAction, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

import {Record} from 'src/db/models/Record';
import {RecordRealmContext} from 'src/db';

import {Typography} from 'components/Typography';
import {Modal} from 'components/Modal';

import CaretIcon from 'assets/icons/caret-down.svg';
import Logo from 'assets/icons/logo.svg';

dayjs.extend(customParseFormat);

interface IProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const getPickerDates = (startDate: Date) => {
  const ed = dayjs(new Date()).set('date', 30);
  const sd = dayjs(startDate).set('date', 1);

  const diff = dayjs(ed).diff(sd, 'M');
  const dates = [];

  for (let i = 0; i < diff + 1; i++) {
    dates.push(dayjs(sd.add(i, 'month')).format('MMM YYYY'));
  }

  return dates;
};

export const Header: FC<IProps> = ({setSelectedDate, selectedDate}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [date, setDate] = useState(dayjs(selectedDate).format('MMM YYYY'));
  const {useQuery} = RecordRealmContext;
  const results = useQuery(Record).sorted('date', true);

  const pickerDates = useMemo(
    () => getPickerDates(results[results.length - 1].date),
    [results],
  );

  return (
    <>
      <View className="absolute top-[-150vw] left-[-50vw] flex w-[200vw] h-[200vw] rounded-full bg-orange-300" />
      <View className="flex flex-row items-center justify-between w-full px-2">
        <Logo width={96} height={96} />
        <TouchableOpacity onPress={() => setIsModalOpened(true)}>
          <View className="flex flex-row items-center justify-start">
            <Typography type="body2">
              {dayjs(selectedDate).format('MMM YYYY')}
            </Typography>
            <CaretIcon width={16} height={16} color="rgb(71 85 105)" />
          </View>
        </TouchableOpacity>
      </View>
      {isModalOpened && (
        <Modal
          onClose={() => setIsModalOpened(false)}
          closeOnSwipe={false}
          title="Select period"
          wrapperClassName="h-[40%]"
          HeaderIconComponent={
            <TouchableOpacity
              onPress={() => {
                setSelectedDate(dayjs(date, 'MMM YYYY'));
                setIsModalOpened(false);
              }}
              className="self-start">
              <Typography type="button1" classname="text-blue-500 font-medium">
                Save
              </Typography>
            </TouchableOpacity>
          }>
          <View>
            <Picker
              selectedValue={date}
              mode="dropdown"
              onValueChange={value => setDate(value)}>
              {pickerDates.map(date => (
                <Picker.Item key={date} label={date} value={date} />
              ))}
            </Picker>
          </View>
        </Modal>
      )}
    </>
  );
};
