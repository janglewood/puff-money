/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {ScrollView, StatusBar, useColorScheme} from 'react-native';

import {Header} from 'components/Header';
import {Layout} from 'components/Layout';
import {Total} from 'components/Total';
import {Controls} from 'components/Controls';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {RecordRealmContext} from 'src/db';

function App(): JSX.Element {
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

  const {RealmProvider} = RecordRealmContext;

  return (
    <RealmProvider>
      <SafeAreaProvider>
        <SafeAreaView edges={['right', 'left']}>
          <StatusBar backgroundColor={'transparent'} />
          <ScrollView style={{backgroundColor: '#ffedd5'}}>
            <Layout>
              <Header />
              <Total />
              <Controls />
            </Layout>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </RealmProvider>
  );
}

export default App;
