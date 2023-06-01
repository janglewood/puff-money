import React, {FC, useMemo} from 'react';
import {FlatList} from 'react-native';

import {Record} from 'src/db/models/Record';

import {GridButton} from '../GridButton';
import {IGridButton} from 'components/Controls';

import BasketIcon from 'assets/icons/basket.svg';
import BasketballIcon from 'assets/icons/basketball.svg';
import CarIcon from 'assets/icons/car.svg';
import GiftIcon from 'assets/icons/gift.svg';
import HomeIcon from 'assets/icons/home.svg';
import ReceiptIcon from 'assets/icons/receipt.svg';
import RestaurantIcon from 'assets/icons/restaurant.svg';
import TShirtIcon from 'assets/icons/t-shirt.svg';
import TaxiIcon from 'assets/icons/taxi.svg';
import TreeIcon from 'assets/icons/tree.svg';
import BusIcon from 'assets/icons/bus.svg';

interface ICategoriesProps {
  handleAddRecord: (
    categoryId: Record['categoryId'],
    note?: Record['note'],
  ) => void;
  selectedCategoryId?: Record['categoryId'];
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

export const categoriesConfig = [
  {
    id: 'food',
    value: 'Food',
    Icon: BasketIcon,
  },
  {
    id: 'home',
    value: 'Home',
    Icon: HomeIcon,
  },
  {
    id: 'cafe',
    value: 'Cafe',
    Icon: RestaurantIcon,
  },
  {
    id: 'car',
    value: 'Car',
    Icon: CarIcon,
  },
  {
    id: 'clothes',
    value: 'Clothes',
    Icon: TShirtIcon,
  },
  {
    id: 'vacation',
    value: 'Vacation',
    Icon: TreeIcon,
  },
  {
    id: 'gifts',
    value: 'Gifts',
    Icon: GiftIcon,
  },
  {
    id: 'bills',
    value: 'Bills',
    Icon: ReceiptIcon,
  },
  {
    id: 'sport',
    value: 'Sport',
    Icon: BasketballIcon,
  },
  {
    id: 'taxi',
    value: 'Taxi',
    Icon: TaxiIcon,
  },
  {
    id: 'transport',
    value: 'Transportasdasd',
    Icon: BusIcon,
  },
];

export const Categories: FC<ICategoriesProps> = ({
  handleAddRecord,
  selectedCategoryId,
}) => {
  const config: IGridButton[] = useMemo(
    () =>
      categoriesConfig.map(item => ({
        ...item,
        onPress: () => handleAddRecord(item.id),
      })),
    [handleAddRecord],
  );

  return (
    <FlatList<IGridButton>
      data={formatData(config, 4)}
      numColumns={4}
      renderItem={item => (
        <GridButton {...item} selected={selectedCategoryId === item.item.id} />
      )}
      keyExtractor={item => item.id}
    />
  );
};
