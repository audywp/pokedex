import {Alert} from 'react-native';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

// CONSTANTA
import {GET_POKEMON_DETAIL, GET_POKEMON_NUMBER} from './action';

// ACTION
import {setPokemonDetail, setNumberByPokemonName} from './action';

function* callMe(action) {
  try {
    const res = yield axios.get(
      `https://pokeapi.glitch.me/v1/pokemon/${action.payload}`,
      {
        validateStatus: status => status < 500, // resolve only if the status response is less than 500
      },
    );

    console.log(res);

    if (res.status === 200) {
      yield put(setPokemonDetail(res.data));
    } else {
      Alert.alert('Error', res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function* SagaGetPokemonNumber(action) {
  try {
    const res = yield axios.get(
      `https://pokeapi.glitch.me/v1/pokemon/${action.name}`,
      {
        validateStatus: status => status < 500, // resolve only if the status response is less than 500
      },
    );
    console.log(res, 'number');

    if (res.status === 200) {
      yield put(
        setNumberByPokemonName(`${res.data[0].number},${res.data[0].name}`),
      );
    } else {
      Alert.alert('Error', res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* SagaHome() {
  yield takeEvery(GET_POKEMON_DETAIL, callMe);
  yield takeEvery(GET_POKEMON_NUMBER, SagaGetPokemonNumber);
}
