import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import dayjs from 'dayjs';

import {Record} from 'src/db/models/Record';

import {categoriesConfig} from 'components/Controls/components/Categories';
import {Typography} from 'components/Typography';

import ChevronIcon from 'assets/icons/chevron.svg';

interface IProps {
  data: Record[];
  categoryId: Record['categoryId'];
  setEditingItemId: Dispatch<SetStateAction<Record['categoryId']>>;
}

export const ListItem: FC<IProps> = ({data, categoryId, setEditingItemId}) => {
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);
  const [isOpened, setIsOpened] = useState(false);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  const toggle = useCallback(() => {
    if (isOpened) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
      setIsOpened(false);
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
      setIsOpened(true);
    }
  }, [animatedController, isOpened]);

  const category = categoriesConfig.find(({id}) => id === categoryId);
  return (
    <View className="flex w-full">
      <TouchableOpacity
        className="flex flex-row w-full items-center mb-2"
        onPress={toggle}>
        <Animated.View
          className="flex flex-row w-[24px] h-[24px]"
          style={{transform: [{rotateZ: arrowAngle}]}}>
          <ChevronIcon width="100%" height="100%" color="rgb(71 85 105)" />
        </Animated.View>
        {category?.Icon && (
          <View className="mr-2">
            <category.Icon width={32} height={32} color="rgb(71 85 105)" />
          </View>
        )}
        <Typography type="title3">{`${category?.value} (${data.length})`}</Typography>
        <View className="flex-1 w-full justify-end items-end">
          <Typography type="title3">
            {data
              .reduce((acc, curr) => acc + Math.abs(curr.amount), 0)
              .toFixed(2)}
          </Typography>
        </View>
      </TouchableOpacity>
      <Animated.View
        className="flex w-full"
        style={[{height: bodyHeight}, {overflow: 'hidden'}]}>
        <View
          style={{position: 'absolute', bottom: 0, width: '100%'}}
          onLayout={event => {
            setBodySectionHeight(event.nativeEvent.layout.height);
          }}>
          {data.map(({_id, amount, date}) => (
            <TouchableWithoutFeedback
              onPress={() => setEditingItemId(_id)}
              key={_id}>
              <View className="flex flex-row items-center justify-between ml-[24px] mb-2 pb-2">
                <Typography type="body2">{amount.toFixed(2)}</Typography>
                <Typography type="body2">
                  {dayjs(date).format('DD MMM')}
                </Typography>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};
