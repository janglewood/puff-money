import {IGridButton} from 'components/Controls';
import {Typography} from 'components/Typography';
import React from 'react';
import {ListRenderItem, StyleSheet, TouchableOpacity, View} from 'react-native';

export const GridButton: ListRenderItem<IGridButton> = ({
  item: {isAction, value, onPress, Icon, empty},
  index,
}) => {
  return empty ? (
    <View className="flex flex-1 max-w-[25%] aspect-square bg-transparent" />
  ) : (
    <TouchableOpacity
      className={`flex justify-center flex-1 max-w-[25%] aspect-square rounded bg-pink-200 ${
        (index + 1) % 4 === 0 ? 'mr-0' : 'mr-1'
      } ${index > 11 ? 'mb-0' : 'mb-1'} ${isAction && 'bg-orange-300'}`}
      onPress={onPress}>
      <View className="flex items-center p-1">
        {Icon && <Icon width={32} height={32} color="gray" />}
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
