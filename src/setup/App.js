import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar, AsyncStorage} from 'react-native';
import AppRouter from '../navigation/AppRouter';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ContextProvider } from '../redux/ContextProvider';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { CharacterFavReducer } from '../redux/reducers/CharacterFavReducer';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
/**
 * ************************** REDUX **************************
 */

//Root reducer of redux store
const rootReducer = combineReducers({
  CharacterFavReducer: CharacterFavReducer,
});

//Create persistConfig for which reducer store in AsyncStorage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['CharacterFavReducer'], // whitelist defines the parts of the state you wish to persist.
};

//Create persistReducer for pass persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Passing persistedReducer to main Store and middleware of thunk
const store = createStore(persistedReducer, applyMiddleware(thunk));

//Export persistedStore to clear data when logout or somthing else.
export const persistedStore = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ContextProvider>
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor={'black'}
              translucent={false}
            />
            <AppRouter />
          </SafeAreaView>
        </ContextProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default App;
