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

export const Categories: FC<ICategoriesProps> = ({
  handleAddRecord,
  selectedCategoryId,
}) => {
  const config: IGridButton[] = useMemo(
    () => [
      {
        id: 'food',
        value: 'Food',
        onPress: () => handleAddRecord('food'),
        Icon: BasketIcon,
      },
      {
        id: 'home',
        value: 'Home',
        onPress: () => handleAddRecord('home'),
        Icon: HomeIcon,
      },
      {
        id: 'cafe',
        value: 'Cafe',
        onPress: () => handleAddRecord('cafe'),
        Icon: RestaurantIcon,
      },
      {
        id: 'car',
        value: 'Car',
        onPress: () => handleAddRecord('car'),
        Icon: CarIcon,
      },
      {
        id: 'clothes',
        value: 'Clothes',
        onPress: () => handleAddRecord('clothes'),
        Icon: TShirtIcon,
      },
      {
        id: 'vacation',
        value: 'Vacation',
        onPress: () => handleAddRecord('vacation'),
        Icon: TreeIcon,
      },
      {
        id: 'gifts',
        value: 'Gifts',
        onPress: () => handleAddRecord('gifts'),
        Icon: GiftIcon,
      },
      {
        id: 'bills',
        value: 'Bills',
        onPress: () => handleAddRecord('bills'),
        Icon: ReceiptIcon,
      },
      {
        id: 'sport',
        value: 'Sport',
        onPress: () => handleAddRecord('sport'),
        Icon: BasketballIcon,
      },
      {
        id: 'taxi',
        value: 'Taxi',
        onPress: () => handleAddRecord('taxi'),
        Icon: TaxiIcon,
      },
      {
        id: 'transport',
        value: 'Transportasdasd',
        onPress: () => handleAddRecord('transport'),
        Icon: BusIcon,
      },
    ],
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
