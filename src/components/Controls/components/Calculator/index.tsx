import React, {FC, useMemo} from 'react';
import {FlatList} from 'react-native';

import {GridButton} from '../GridButton';
import {IGridButton} from 'components/Controls';

interface ICalculatorProps {
  inputOperator: (operator: '/' | '+' | '-' | '*') => void;
  inputNumTotal: (num: number) => void;
  setDecimal: (val: boolean) => void;
  equal: () => void;
}

export const Calculator: FC<ICalculatorProps> = ({
  inputOperator,
  inputNumTotal,
  setDecimal,
  equal,
}) => {
  const config: IGridButton[] = useMemo(
    () => [
      {id: '0', value: '/', onPress: () => inputOperator('/'), isAction: true},
      {id: '1', value: 7, onPress: () => inputNumTotal(7)},
      {id: '2', value: 8, onPress: () => inputNumTotal(8)},
      {id: '3', value: 9, onPress: () => inputNumTotal(9)},
      {id: '4', value: '*', onPress: () => inputOperator('*'), isAction: true},
      {id: '5', value: 4, onPress: () => inputNumTotal(4)},
      {id: '6', value: 5, onPress: () => inputNumTotal(5)},
      {id: '7', value: 6, onPress: () => inputNumTotal(6)},
      {id: '8', value: '-', onPress: () => inputOperator('-'), isAction: true},
      {id: '9', value: 1, onPress: () => inputNumTotal(1)},
      {id: '10', value: 2, onPress: () => inputNumTotal(2)},
      {id: '11', value: 3, onPress: () => inputNumTotal(3)},
      {id: '12', value: '+', onPress: () => inputOperator('+'), isAction: true},
      {id: '13', value: 0, onPress: () => inputNumTotal(0)},
      {id: '14', value: '.', onPress: () => setDecimal(true), isAction: true},
      {id: '15', value: '=', onPress: equal, isAction: true},
    ],
    [equal, inputNumTotal, inputOperator, setDecimal],
  );

  return (
    <FlatList<IGridButton>
      data={config}
      numColumns={4}
      renderItem={item => <GridButton {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
