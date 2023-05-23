import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {GridButton} from '../GridButton';
import {IGridButton} from 'components/Controls';

interface ICalculatorProps {
  config: IGridButton[];
}

export const Calculator: FC<ICalculatorProps> = ({config}) => {
  return (
    <FlatList<IGridButton>
      data={config}
      numColumns={4}
      renderItem={item => <GridButton {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
