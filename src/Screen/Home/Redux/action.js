export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const SET_POKEMON_DETAIL = 'SET_POKEMON_DETAIL';
export const GET_POKEMON_NUMBER = 'GET_POKEMON_NUMBER';
export const SET_POKEMON_NUMBER = 'SET_POKEMON_NUMBER';
export const RESET_POKEMON_NUMBER = 'RESET_POKEMON_NUMBER';

export const getPokemonDetail = id => {
  return {
    type: GET_POKEMON_DETAIL,
    payload: id,
  };
};

export const setPokemonDetail = payload => {
  return {
    type: SET_POKEMON_DETAIL,
    payload,
  };
};

export const getNumberByPokemonName = name => {
  return {
    type: GET_POKEMON_NUMBER,
    name,
  };
};

export const setNumberByPokemonName = number => {
  return {
    type: SET_POKEMON_NUMBER,
    number,
  };
};

export const resetPokemonNumber = () => {
  return {
    type: RESET_POKEMON_NUMBER,
  };
};
