import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {Persistor, Store} from './src/Store/Store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Screen/Home/Home';
import Detail from './src/Screen/Detail/Detail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Detail"
              component={Detail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
