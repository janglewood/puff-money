import React, {FC, useMemo, useState} from 'react';
import {View} from 'react-native';
import groupBy from 'lodash.groupby';

import {RecordRealmContext} from 'src/db';
import {Record} from 'src/db/models/Record';

import {Typography} from 'components/Typography';
import {RecordModal} from 'components/RecordModal';

import ArrowIcon from 'assets/icons/arrow.svg';
import {RecordsList} from './components/RecordsList';

interface IProps {
  selectedDate: Date;
}

export const Total: FC<IProps> = ({selectedDate}) => {
  const [editingItemId, setEditingItemId] = useState<null | string>(null);

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
      <View className="px-6 my-4">
        <RecordsList
          data={recordsByCategories}
          setEditingItemId={setEditingItemId}
        />
        {/* <FlatList
          data={Object.keys(recordsByCategories)}
          renderItem={({item}) => {
            const recordsAmount = recordsByCategories[item].length;
            return (
              <View className="flex flex-row w-full items-center">
                <View className="flex flex-row w-[24px] h-[24px]">
                  <ChevronIcon
                    width="100%"
                    height="100%"
                    color="rgb(71 85 105)"
                  />
                </View>
                <Typography type="title3">{`${item} (${recordsAmount})`}</Typography>
                <View className="flex-1 w-full justify-end items-end">
                  <Typography type="body1">
                    {recordsByCategories[item]
                      .reduce((acc, curr) => acc + Math.abs(curr.amount), 0)
                      .toFixed(2)}
                  </Typography>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item}
        /> */}
      </View>
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
