import React from 'react';
import {ListRenderItem, TouchableOpacity, View} from 'react-native';

import {IGridButton} from 'components/Controls';
import {Typography} from 'components/Typography';

export const GridButton: ListRenderItem<IGridButton & {selected?: boolean}> = ({
  item: {isAction, value, onPress, Icon, empty},
  selected,
  index,
}) => {
  return empty ? (
    <View className="flex flex-1 max-w-[25%] aspect-square bg-transparent" />
  ) : (
    <TouchableOpacity
      className={`flex justify-center flex-1 max-w-[25%] aspect-square rounded bg-pink-200 ${
        (index + 1) % 4 === 0 ? 'mr-0' : 'mr-1'
      } ${index > 11 ? 'mb-0' : 'mb-1'} ${isAction && 'bg-orange-300'} ${
        selected && 'border border-solid border-black-200'
      }`}
      onPress={onPress}>
      <View className="flex items-center p-1">
        {Icon && <Icon width={32} height={32} color="rgb(71 85 105)" />}
        <Typography
          type={Icon ? 'title4' : 'title2'}
          classname="mt-1 overflow-hidden"
          numberOfLines={1}>
          {value}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};
