import React, {FC, useCallback, useEffect, useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';

import {RecordRealmContext} from 'src/db';
import {Record} from 'src/db/models/Record';

import {Modal} from 'components/Modal';
import {Typography} from 'components/Typography';
import {Button} from 'components/Button';
import {Categories} from 'components/Controls/components/Categories';
import {Calculator} from 'components/Controls/components/Calculator';

import DeleteIcon from 'assets/icons/delete.svg';
import TrashIcon from 'assets/icons/trash.svg';

type RecordType = 'income' | 'outcome';

interface IProps {
  onClose: () => void;
  recordType: RecordType;
  setRecordType: (type: RecordType) => void;
  editingItem?: Record;
}

export const RecordModal: FC<IProps> = ({
  onClose,
  recordType,
  setRecordType,
  editingItem,
}) => {
  const [recordUnderlineWidth, setRecordUnderlineWidth] = useState<number>(0);
  const [animatedRecordValue] = useState(new Animated.Value(50));
  const [isCategoryOpened, setIsCategoryOpened] = useState(false);

  const realm = RecordRealmContext.useRealm();

  // Calculator logic
  const [monitor, setMonitor] = useState<number>(
    Math.abs(editingItem?.amount || 0),
  );
  const [inputNum, setInputNum] = useState<number>(
    Math.abs(editingItem?.amount || 0),
  );
  const [decimal, setDecimal] = useState<boolean>(false);
  const [decimalcount, setDecimalCount] = useState<number>(1);
  const [operator, setOperator] = useState<string>('');
  const [calculatednum, setCalculatednum] = useState<number>(
    Math.abs(editingItem?.amount || 0),
  );

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

  //get equation
  const equal = () => {
    calculate();
    setOperator('');
  };

  const calculate = () => {
    setDecimal(false);
    setDecimalCount(1);
    if (operator === '/' && inputNum === 0) {
      setCalculatednum(0);
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
  // ----

  useEffect(() => {
    if (recordUnderlineWidth) {
      animatedRecordValue.setValue(recordUnderlineWidth / 2);
    }
  }, [recordUnderlineWidth, animatedRecordValue]);

  const handleTypeToggle = (type: 'income' | 'outcome') => {
    Animated.spring(animatedRecordValue, {
      toValue: type === 'income' ? 0 : recordUnderlineWidth / 2,
      bounciness: 8,
      speed: 8,
      useNativeDriver: false,
    }).start();
    setRecordType(type);
  };

  const handleAddRecord = useCallback(
    async (categoryId: Record['categoryId'], note: Record['note']) => {
      if (!monitor) {
        return;
      }

      await realm.write(() => {
        return new Record(realm, {
          _id: uuidv4(),
          amount: recordType === 'income' ? monitor : monitor * -1,
          date: new Date(),
          note,
          categoryId,
        });
      });
      onClose();
    },
    [realm, monitor, recordType, onClose],
  );

  const handleUpdateRecord = useCallback(
    async (
      categoryId: Record['categoryId'],
      note: Record['note'],
      date: Record['date'],
    ) => {
      if (!monitor || !editingItem) {
        return;
      }

      await realm.write(() => {
        editingItem.categoryId = categoryId || editingItem.categoryId;
        editingItem.amount = (recordType === 'income' ? 1 : -1) * monitor;
        editingItem.note = note || editingItem.note;
        editingItem.date = date || editingItem.date;
      });
      onClose();
    },
    [realm, monitor, editingItem, recordType, onClose],
  );

  const handleDeleteRecord = useCallback(async () => {
    await realm.write(() => {
      realm.delete(editingItem);
    });
    onClose();
  }, [realm, editingItem, onClose]);

  return (
    <Modal
      onClose={onClose}
      title={editingItem ? 'Edit' : 'Add new'}
      HeaderIconComponent={
        <TouchableOpacity onPress={handleDeleteRecord}>
          <TrashIcon width={32} height={32} color="#eb1b26" />
        </TouchableOpacity>
      }>
      <View className="flex flex-1 justify-start">
        {!editingItem && (
          <>
            <View className="flex flex-row justify-between items-center w-full mt-6">
              <TouchableOpacity
                className="flex justify-center items-center w-1/2"
                onPress={() => {
                  handleTypeToggle('income');
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
          </>
        )}

        <View className="flex w-full my-4">
          <View className="flex flex-row justify-end items-center border border-solid border-orange-300 bg-orange-50 rounded p-4">
            <Typography type="title2">{monitor}</Typography>
            <TouchableOpacity
              onPress={() =>
                setInputNum(prev => Number(String(prev).slice(0, -1)))
              }
              className="stroke-red-100 ml-2 w-8 h-8">
              <DeleteIcon width="100%" height="100%" color="rgb(252 165 165)" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-1 justify-between w-full my-4">
          {isCategoryOpened ? (
            <Categories
              handleAddRecord={
                editingItem ? handleUpdateRecord : handleAddRecord
              }
              selectedCategoryId={editingItem?.categoryId}
            />
          ) : (
            <Calculator
              inputOperator={inputOperator}
              inputNumTotal={inputNumTotal}
              setDecimal={setDecimal}
              equal={equal}
            />
          )}
          <Button
            className="mb-2"
            disabled={!monitor}
            onPress={() => {
              calculate();
              setIsCategoryOpened(true);
            }}>
            <Typography type="button1">Choose category</Typography>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
