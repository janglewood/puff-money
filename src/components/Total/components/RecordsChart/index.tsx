import React, {FC, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {VictoryPie, VictoryLabel, VictoryContainer} from 'victory-native';

interface IProps {
  data: {x: string; y: number}[];
  total: number;
}
const colorScale = [
  '#003f5c',
  '#a05195',
  '#ff7c43',
  '#f95d6a',
  '#665191',
  '#2f4b7c',
  '#ffa600',
  '#d45087',
  // '#ffd3cc',
  // '#fed9df',
  // '#ffb289',
  // '#fcd8e9',
  // '#fcd9e5',
  // '#f97316',
  // '#ffbd9d',
  // '#ffc6af',
  // '#ffcebf',
  // '#ffa672',
  // '#ff9759',
  // '#ffd7d7',
  // '#fe863c',
  // '#fbcfe8',
  // '#fbd4ea',
];

export const RecordsChart: FC<IProps> = ({data, total}) => {
  const {width} = Dimensions.get('window');
  const [initialData, setInitialData] = useState(
    data.map(({x}, index, arr) => ({x, y: index === arr.length - 1 ? 100 : 0})),
  );
  const [info, setInfo] = useState();

  useEffect(() => {
    setInitialData(data);
  }, [data]);

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <VictoryContainer width={width - 24 * 2} height={280}>
        <VictoryPie
          colorScale={colorScale}
          data={initialData}
          style={{
            labels: {
              display: 'none',
            },
          }}
          padding={{top: 0, left: 0, bottom: 0, right: 0}}
          standalone={false}
          animate={{easing: 'exp'}}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'data',
                      mutation: ({data, index}) => {
                        const {x, y} = data[index];
                        setInfo({x, y});
                      },
                    },
                  ];
                },
              },
            },
          ]}
          height={280}
          width={width - 24 * 2}
          innerRadius={100}
        />
        <VictoryLabel
          style={{
            fontSize: 16,
          }}
          x={(width - 24 * 2) / 2}
          y={140}
          textAnchor="middle"
          text={
            info
              ? `${info.x}\n ${(Math.abs(info.y / total) * 100).toFixed(
                  2,
                )}% (${Number(info.y).toFixed(2)})`
              : 'Click on chart\nto see category info'
          }
        />
      </VictoryContainer>
    </Animated.View>
  );
};
