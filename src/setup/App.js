import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AppRouter from '../navigation/AppRouter';

const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle='light-content'
        hidden={false}
        backgroundColor={'black'}
        translucent={false}
      />
      <AppRouter />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default App;