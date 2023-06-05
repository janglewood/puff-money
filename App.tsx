/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {ScrollView, StatusBar, View, useColorScheme} from 'react-native';

import {Header} from 'components/Header';
import {Layout} from 'components/Layout';
import {Total} from 'components/Total';
import {Controls} from 'components/Controls';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {RecordRealmContext} from 'src/db';
import {Main} from 'src/screens/main';

function App(): JSX.Element {
  const {RealmProvider} = RecordRealmContext;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <RealmProvider>
      <SafeAreaProvider>
        <SafeAreaView edges={['right', 'left']}>
          <StatusBar backgroundColor={'transparent'} />
          <View className="h-full">
            <Layout>
              <Main
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </Layout>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </RealmProvider>
  );
}

export default App;
