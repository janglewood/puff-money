import {Modal} from 'components/Modal';
import {Typography} from 'components/Typography';
import {FC, ReactNode, SVGProps, useEffect, useState} from 'react';
import {Animated, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Calculator} from './components/Calculator';
import DeleteIcon from 'assets/icons/delete.svg';
import {Button} from 'components/Button';
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
import {Categories} from './components/Categories';

export interface IGridButton {
  id: string;
  value: number | string;
  onPress: () => void;
  isAction?: boolean;
  Icon?: FC;
  empty?: boolean;
}

export const Controls = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [recordType, setRecordType] = useState<'income' | 'outcome'>('outcome');
  const [isCategoryOpened, setIsCategoryOpened] = useState(false);
  const [animatedRecordValue] = useState(new Animated.Value(50));
  const [recordUnderlineWidth, setRecordUnderlineWidth] = useState<number>(0);

  //calculator
  const [monitor, setMonitor] = useState<number>(0);
  const [inputNum, setInputNum] = useState<number>(0);
  const [decimal, setDecimal] = useState<boolean>(false);
  const [decimalcount, setDecimalCount] = useState<number>(1);
  const [operator, setOperator] = useState<string>('');
  const [calculatednum, setCalculatednum] = useState<number>(0);

  useEffect(() => {
    if (recordUnderlineWidth) {
      animatedRecordValue.setValue(recordUnderlineWidth / 2);
    }
  }, [recordUnderlineWidth]);
  useEffect(() => {
    setMonitor(inputNum);
  }, [inputNum, setMonitor]);

  useEffect(() => {
    setMonitor(calculatednum);
  }, [calculatednum, setMonitor]);

  //recieve number from input button
  const inputNumTotal = (num: number) => {
    if (decimal) {
      num = num / Math.pow(10, decimalcount);
      setDecimalCount(decimalcount + 1);
      setInputNum(parseFloat((inputNum + num).toFixed(decimalcount)));
    } else {
      setInputNum(inputNum * 10 + num);
    }
  };

  //receive operator from input button
  const inputOperator = (value: string) => {
    setOperator(value);
    calculate();
    setInputNum(0);
  };

  //calculate
  const calculate = () => {
    setDecimal(false);
    setDecimalCount(1);
    if (operator === '/' && inputNum === 0) {
      setCalculatednum(NaN);
      setInputNum(0);
      return;
    }
    if (calculatednum === 0 && inputNum === 0) {
      return;
    }
    switch (operator) {
      case '+':
        setCalculatednum(calculatednum + inputNum);
        break;
      case '/':
        setCalculatednum(calculatednum / inputNum);
        break;
      case '*':
        setCalculatednum(calculatednum * inputNum);
        break;
      case '-':
        setCalculatednum(calculatednum - inputNum);
        break;
    }
    if (operator === '') {
      setCalculatednum(inputNum);
    } else {
      setInputNum(0);
    }
    return;
  };

  //get equation
  const equal = () => {
    calculate();
    setOperator('');
  };

  //clear all
  const clearall = () => {
    setInputNum(0);
    setCalculatednum(0);
    setMonitor(0);
    setOperator('');
  };

  const calcConfig: IGridButton[] = [
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
  ];

  const categoriesConfig: IGridButton[] = [
    {id: 'food', value: 'Food', onPress: () => {}, Icon: BasketIcon},
    {id: 'home', value: 'Home', onPress: () => {}, Icon: HomeIcon},
    {id: 'cafe', value: 'Cafe', onPress: () => {}, Icon: RestaurantIcon},
    {id: 'car', value: 'Car', onPress: () => {}, Icon: CarIcon},
    {id: 'clothes', value: 'Clothes', onPress: () => {}, Icon: TShirtIcon},
    {id: 'vacation', value: 'Vacation', onPress: () => {}, Icon: TreeIcon},
    {id: 'gifts', value: 'Gifts', onPress: () => {}, Icon: GiftIcon},
    {id: 'bills', value: 'Bills', onPress: () => {}, Icon: ReceiptIcon},
    {id: 'sport', value: 'Sport', onPress: () => {}, Icon: BasketballIcon},
    {id: 'taxi', value: 'Taxi', onPress: () => {}, Icon: TaxiIcon},
    {
      id: 'transport',
      value: 'Transportasdasd',
      onPress: () => {},
      Icon: BusIcon,
    },
  ];

  const handleTypeToggle = (type: 'income' | 'outcome') => {
    Animated.spring(animatedRecordValue, {
      toValue: type === 'income' ? 0 : recordUnderlineWidth / 2,
      bounciness: 8,
      speed: 8,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <View className="flex flex-1 flex-row items-end justify-center w-full px-6">
        <TouchableOpacity
          className="flex items-center justify-center w-[100px] h-[100px] bg-slate-100 rounded-xl p-6 border border-solid border-orange-400 w-fit"
          onPress={() => setIsModalOpened(true)}>
          <View className="flex items-center justify-center">
            <Typography
              type="title1"
              classname="text-[#4d7c0f] text-[60px] leading-[60px]">
              +
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
      {isModalOpened && (
        <Modal onClose={() => setIsModalOpened(false)} title="Add new">
          <View className="flex flex-1 justify-start">
            <View className="flex flex-row justify-between items-center w-full mt-6">
              <TouchableOpacity
                className="flex justify-center items-center w-1/2"
                onPress={() => {
                  handleTypeToggle('income');
                  setRecordType('income');
                }}>
                <Typography
                  type="body1"
                  classname={
                    recordType === 'income' ? 'font-bold' : 'opacity-60'
                  }>
                  Income
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex justify-center items-center w-1/2"
                onPress={() => {
                  handleTypeToggle('outcome');
                  setRecordType('outcome');
                }}>
                <Typography
                  type="body1"
                  classname={
                    recordType === 'outcome' ? 'font-bold' : 'opacity-60'
                  }>
                  Outcome
                </Typography>
              </TouchableOpacity>
            </View>
            <View
              onLayout={event => {
                const {width} = event.nativeEvent.layout;

                setRecordUnderlineWidth(width);
              }}
              className="relative flex w-full h-2 rounded-lg bg-orange-100 overflow-hidden mt-2 transition-all duration-300">
              <Animated.View
                className="absolute w-1/2 h-full rounded-xl bg-orange-300 transition-all duration-300"
                style={{left: animatedRecordValue}}
              />
            </View>

            <View className="flex w-full my-4">
              <View className="flex flex-row justify-end items-center border border-solid border-orange-300 bg-orange-50 rounded p-4">
                <Typography type="title2">{monitor}</Typography>
                <TouchableOpacity
                  onPress={() =>
                    setInputNum(prev => Number(String(prev).slice(0, -1)))
                  }
                  className="stroke-red-100 ml-2 w-8 h-8">
                  <DeleteIcon
                    width="100%"
                    height="100%"
                    color="rgb(252 165 165)"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-1 justify-between w-full my-4">
              {isCategoryOpened ? (
                <Categories config={categoriesConfig} />
              ) : (
                <Calculator config={calcConfig} />
              )}
              <Button
                className="mb-2"
                disabled={!monitor}
                onPress={() => setIsCategoryOpened(true)}>
                <Typography type="button1">Choose category</Typography>
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
