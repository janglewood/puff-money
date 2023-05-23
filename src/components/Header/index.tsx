import React from 'react';

import {View} from 'react-native';
import Logo from 'assets/icons/logo.svg';
import Menu from 'assets/icons/menu.svg';

export const Header = () => {
  return (
    <>
      <View className="absolute top-[-75%] left-[-50vw] flex w-[200vw] h-[200vw] rounded-full bg-orange-300" />
      <View className="flex flex-row items-center justify-between w-full px-2">
        <Logo width={96} height={96} />
        <Menu width={32} height={32} color="#000" />
      </View>
    </>
  );
};
