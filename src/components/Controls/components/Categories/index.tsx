import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {GridButton} from '../GridButton';
import {IGridButton} from 'components/Controls';

interface ICategoriesProps {
  config: IGridButton[];
}

const formatData = (data: IGridButton[], numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      id: `blank-${numberOfElementsLastRow}`,
      empty: true,
      value: '',
      onPress: () => {},
    });
    numberOfElementsLastRow++;
  }

  return data;
};

export const Categories: FC<ICategoriesProps> = ({config}) => {
  return (
    <FlatList<IGridButton>
      data={formatData(config, 4)}
      numColumns={4}
      renderItem={item => <GridButton {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
