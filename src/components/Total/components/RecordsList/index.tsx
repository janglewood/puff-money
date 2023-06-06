import React, {Dispatch, FC, SetStateAction} from 'react';
import {ScrollView, View} from 'react-native';

import {Record} from 'src/db/models/Record';

import {ListItem} from './ListItem';
import {Typography} from 'components/Typography';
import Animated, {FadeIn} from 'react-native-reanimated';

interface IProps {
  data: {[key: Record['categoryId']]: Record[]};
  setEditingItemId: Dispatch<SetStateAction<Record['categoryId'] | null>>;
}

export const RecordsList: FC<IProps> = ({data, setEditingItemId}) => (
  <ScrollView>
    <Animated.View entering={FadeIn.duration(300)}>
      <View className="flex-1 h-full">
        {Object.keys(data).length ? (
          Object.keys(data).map(item => (
            <ListItem
              key={item}
              categoryId={item}
              data={data[item]}
              setEditingItemId={setEditingItemId}
            />
          ))
        ) : (
          <View className="items-center my-8">
            <Typography type="title3">No Records for this month</Typography>
          </View>
        )}
      </View>
    </Animated.View>
  </ScrollView>
);
