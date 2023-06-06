import React, {FC, ReactNode} from 'react';
import {Dimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  children: ReactNode;
}

export const Layout: FC<IProps> = ({children}) => {
  const {height} = Dimensions.get('window');

  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex flex-1 flex-col bg-orange-100"
      style={{
        // height,
        paddingTop: 24,
        // paddingBottom: insets.bottom + 16,
      }}>
      {children}
    </View>
  );
};
