import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View} from 'react-native';
import groupBy from 'lodash.groupby';
import SwitchSelector from 'react-native-switch-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RecordRealmContext} from 'src/db';
import {Record} from 'src/db/models/Record';

import {Typography} from 'components/Typography';
import {RecordModal} from 'components/RecordModal';
import {RecordsList} from './components/RecordsList';

import ArrowIcon from 'assets/icons/arrow.svg';
import ListIcon from 'assets/icons/list-ul.svg';
import ChartIcon from 'assets/icons/pie-chart.svg';
import {RecordsChart} from './components/RecordsChart';
import {categoriesConfig} from 'components/Controls/components/Categories';

interface IProps {
  selectedDate: Date;
}

interface SwitchOption {
  label: string;
  value: 'list' | 'chart';
  customIcon: ReactNode;
}
const viewSwitchOptions: SwitchOption[] = [
  {
    label: '',
    value: 'list',
    customIcon: <ListIcon width={24} color="rgb(71 85 105)" />,
  },
  {
    label: '',
    value: 'chart',
    customIcon: <ChartIcon width={24} color="rgb(71 85 105)" />,
  },
];

const getRecordsView = async () => await AsyncStorage.getItem('recordsView');

export const Total: FC<IProps> = ({selectedDate}) => {
  const [editingItemId, setEditingItemId] = useState<null | string>(null);
  const [recordsView, setRecordsView] = useState<SwitchOption['value']>();

  useEffect(() => {
    (async () => {
      const view = await getRecordsView();
      if (!view) {
        setRecordsView(viewSwitchOptions[1].value);
        AsyncStorage.setItem('recordsView', viewSwitchOptions[1].value);
      } else {
        setRecordsView(view as SwitchOption['value']);
      }
    })();
  }, []);

  const {useQuery} = RecordRealmContext;
  const result = useQuery(Record).sorted('date', true);

  const monthResults = useMemo(
    () =>
      result.filter(
        ({date}) =>
          new Date(date).getMonth() === new Date(selectedDate).getMonth(),
      ),
    [selectedDate, result],
  );

  const recordsByCategories = groupBy(monthResults, 'categoryId');

  const income = monthResults
    .filter(({amount}) => amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const outcome = monthResults
    .filter(({amount}) => amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const editingItem = useMemo(
    () => monthResults.find(({_id}) => _id === editingItemId),
    [editingItemId, monthResults],
  );

  const chartData = useMemo(() => {
    const data = [];
    categoriesConfig.forEach(({id, value}) => {
      if (recordsByCategories[id]?.length) {
        data.push({
          x: value,
          y: recordsByCategories[id]
            ? recordsByCategories[id].reduce(
                (acc, curr) => acc + Math.abs(curr.amount),
                0,
              )
            : 0,
        });
      }
    });
    return data;
  }, [recordsByCategories]);

  const handleSwitch = useCallback((value: SwitchOption['value']) => {
    setRecordsView(value);
    AsyncStorage.setItem('recordsView', value);
  }, []);

  return (
    <>
      <View className="flex justify-center w-full px-8">
        <View className="flex items-center w-full p-6 rounded-lg bg-gray-700">
          <View className="flex w-full justify-start mb-3">
            <Typography type="caption1" variant="label" classname="mb-2">
              Current balance
            </Typography>
            <Typography type="title1" variant="secondary">
              {(income + outcome).toFixed(2)}
            </Typography>
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-col">
              <Typography type="caption1" variant="label">
                Income
              </Typography>
              <View className="flex flex-row items-center mt-2">
                <View className="flex bg-slate-100 rounded p-2 mr-2 w-fit">
                  <View className="flex items-center justify-center rotate-[225deg]">
                    <ArrowIcon width={16} height={16} color="#4d7c0f" />
                  </View>
                </View>
                <Typography type="title3" variant="secondary">
                  {income.toFixed(2)}
                </Typography>
              </View>
            </View>
            <View className="flex flex-col">
              <Typography type="caption1" variant="label">
                Outcome
              </Typography>
              <View className="flex flex-row items-center mt-2">
                <View className="flex bg-slate-100 rounded p-2 mr-2 w-fit">
                  <View className="flex items-center justify-center rotate-[45deg]">
                    <ArrowIcon width={16} height={16} color="#dc2626" />
                  </View>
                </View>
                <Typography type="title3" variant="secondary">
                  {outcome.toFixed(2)}
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-end items-center py-4 px-4">
        <Typography type="body2" classname="mr-2">
          View:
        </Typography>
        {recordsView && (
          <SwitchSelector
            options={viewSwitchOptions}
            buttonColor="rgb(251 146 60)"
            animationDuration={300}
            style={{width: 100}}
            hasPadding
            borderColor="transparent"
            valuePadding={1}
            height={35}
            initial={viewSwitchOptions.findIndex(
              ({value}) => value === recordsView,
            )}
            onPress={handleSwitch}
          />
        )}
      </View>
      {Object.keys(recordsByCategories).length ? (
        <View className="px-6 my-4">
          {recordsView === 'list' ? (
            <RecordsList
              data={recordsByCategories}
              setEditingItemId={setEditingItemId}
            />
          ) : (
            <RecordsChart data={chartData} total={outcome} />
          )}
        </View>
      ) : (
        <View className="items-center my-8">
          <Typography type="title3">No Records for this month</Typography>
        </View>
      )}
      {editingItem && (
        <RecordModal
          onClose={() => setEditingItemId(null)}
          recordType={editingItem.amount > 0 ? 'income' : 'outcome'}
          setRecordType={() => {}}
          editingItem={editingItem}
        />
      )}
    </>
  );
};
