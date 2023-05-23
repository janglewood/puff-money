/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from 'components/Button';
import {Header} from 'components/Header';
import {Layout} from 'components/Layout';
import {Total} from 'components/Total';
import {Controls} from 'components/Controls';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);

  const increase = useCallback(
    (value: number) => setIncome(prev => prev + value),
    [setIncome],
  );
  const decrease = useCallback(
    (value: number) => setOutcome(prev => prev + value),
    [setOutcome],
  );

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: 'transparent',
    flex: 1,
    bottom: 0,
    padding: 0,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['right', 'left']}>
        <StatusBar
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'transparent'}
        />
        <ScrollView style={{backgroundColor: '#ffedd5'}}>
          <Layout>
            <Header />
            <Total income={income} outcome={outcome} />
            <Controls increase={increase} decrease={decrease} />
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
