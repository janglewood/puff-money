import {Typography} from 'components/Typography';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import ArrowIcon from 'assets/icons/arrow.svg';

export const Total = ({income, outcome}) => {
  const total = useMemo(() => income - outcome, [income, outcome]);
  return (
    <View className="flex justify-center w-full px-8">
      <View className="flex items-center w-full p-6 rounded-lg bg-gray-700">
        <View className="flex w-full justify-start mb-3">
          <Typography type="caption1" variant="label" classname="mb-2">
            Current balance
          </Typography>
          <Typography type="title1" variant="secondary">
            {total.toFixed(2)}
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
  );
};
