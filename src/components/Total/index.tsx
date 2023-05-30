import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';

import {RecordRealmContext} from 'src/db';
import {Record} from 'src/db/models/Record';

import {Typography} from 'components/Typography';
import {RecordModal} from 'components/RecordModal';

import ArrowIcon from 'assets/icons/arrow.svg';

export const Total = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [editingItemId, setEditingItemId] = useState<null | string>(null);

  const {useQuery} = RecordRealmContext;
  const result = useQuery(Record).sorted('date', true);

  const income = result
    .filtered('amount > 0')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const outcome = result
    .filtered('amount < 0')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const monthResults = useMemo(
    () => result.filter(({date}) => new Date(date).getMonth() === currentMonth),
    [currentMonth, result],
  );

  const editingItem = useMemo(
    () => result.find(({_id}) => _id === editingItemId),
    [editingItemId, result],
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
      <View>
        {monthResults.map(({_id, amount, date, categoryId}) => {
          return (
            <TouchableOpacity onPress={() => setEditingItemId(_id)}>
              <Typography type="body1" key={_id}>{`${amount} --- ${dayjs(
                date,
              ).format('DD-MM-YYYY')} --- ${categoryId}`}</Typography>
            </TouchableOpacity>
          );
        })}
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
