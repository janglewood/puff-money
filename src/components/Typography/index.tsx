import React from 'react';
import {FC, ReactNode} from 'react';
import {Text} from 'react-native';

const types = {
  title1: 'font-bold text-4xl font-poppins leading-[auto]',
  title2: 'font-bold text-3xl font-poppins leading-[auto]',
  title3: 'font-medium text-lg font-poppins leading-[auto]',
  title4: 'font-medium text-lg font-satoshi leading-[auto]',
  body1: 'font-medium text-base font-poppins leading-[145%]',
  body2: 'font-bold text-base font-satoshi leading-[145%]',
  body3: 'font-medium text-base font-satoshi leading-[140%]',
  body4: 'font-normal text-base font-poppins leading-[145%]',
  body5: 'font-normal text-sm font-satoshi leading-[145%]',
  button1: 'font-semibold text-xl font-satoshi',
  subtitle1: 'font-semibold text-sm font-poppins leading-[145%]',
  subtitle2: 'font-medium text-sm font-poppins leading-[145%]',
  subtitle3: 'font-normal text-sm font-poppins leading-[145%]',
  subtitle4: 'font-medium text-sm font-poppins leading-[auto]',
  subtitle5: 'font-medium text-sm font-satoshi leading-[auto]',
  subtitle6: 'font-normal text-sm font-satoshi leading-[auto]',
  caption1: 'font-medium text-xs font-poppins leading-[145%]',
  caption2: 'font-normal text-xs font-poppins leading-[auto]',
  caption3: 'font-bold text-base font-satoshi leading-[140%]',
  caption4: 'font-medium text-xs font-satoshi leading-[auto]',
  caption5: 'font-normal text-sm font-satoshi leading-[auto]',
};

const textColors = {
  primary: 'text-slate-600',
  secondary: 'text-slate-100',
  error: 'text-textError',
  label: 'text-slate-400',
  button: 'text-textButton',
};

interface IProps {
  children: ReactNode;
  type: keyof typeof types;
  variant?: keyof typeof textColors;
  classname?: string;
  numberOfLines?: number;
}

export const Typography: FC<IProps> = ({
  children,
  type,
  variant = 'primary',
  classname,
  numberOfLines,
}) => (
  <Text
    className={`${types[type]} ${textColors[variant]} ${classname}`}
    numberOfLines={numberOfLines}>
    {children}
  </Text>
);
