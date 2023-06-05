import {categoriesConfig} from 'components/Controls/components/Categories';
import React, {FC, useState} from 'react';
import {Dimensions, LayoutRectangle, View} from 'react-native';
import {
  VictoryPie,
  VictoryLabel,
  VictoryTooltip,
  VictoryContainer,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import {Record} from 'src/db/models/Record';
import {G, Svg} from 'react-native-svg';

interface IProps {
  data: {x: string; y: number}[];
  total: number;
}

const CustomLabel = props => {
  return (
    <G>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        renderInPortal={false}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{fill: 'black'}}
      />
    </G>
  );
};
export const RecordsChart: FC<IProps> = ({data, total}) => {
  const {width, height} = Dimensions.get('window');
  const centerX = width / 2;
  const centerY = 250 / 2;

  const [w, setW] = useState();
  const [h, setH] = useState();

  const [info, setInfo] = useState();
  return (
    <View
      // className="bg-slate-50"
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;

        console.log('test', height, width);
        setW(width);
        setH(height);
      }}>
      <VictoryContainer width={200} height={200} responsive>
        <VictoryPie
          colorScale={[
            '#ffd3cc',
            '#fed9df',
            '#ffb289',
            '#fcd8e9',
            '#fcd9e5',
            '#f97316',
            '#ffbd9d',
            '#ffc6af',
            '#ffcebf',
            '#ffa672',
            '#ff9759',
            '#ffd7d7',
            '#fe863c',
            '#fbcfe8',
            '#fbd4ea',
          ]}
          // containerComponent={
          //   <VictoryContainer responsive width={w} height={h} />
          // }
          data={data}
          // style={{
          //   labels: {
          //     fontSize: 16,
          //   },
          // }}
          //   standalone={false}
          padding={{top: 0, left: 0, bottom: 0, right: 0}}
          standalone={false}
          width={200}
          height={200}
          // innerRadius={100}
          // labelRadius={100}
          // labels={({datum}) =>
          //   `${datum.x} (${(Math.abs(Number(datum.y)) / total) * 100}%)`
          // }
        />
        {/* <VictoryLabel
          //   textAnchor="middle"
          style={{fontSize: 20}}
          x={200}
          y={200}
          text="Pie!"
        /> */}
      </VictoryContainer>
      {/* </Svg> */}
    </View>
  );
};
