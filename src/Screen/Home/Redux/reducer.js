import {
  SET_POKEMON_DETAIL,
  SET_POKEMON_NUMBER,
  RESET_POKEMON_NUMBER,
} from './action';

const initialState = {
  pokemonList: [],
  pages: 0,
  pokemonNumber: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonList: action.payload,
      };
    case SET_POKEMON_NUMBER:
      return {
        ...state,
        pokemonNumber: [...new Set([...state.pokemonNumber, action.number])],
      };

    case RESET_POKEMON_NUMBER:
      return {
        ...state,
        pokemonNumber: [],
      };
    default:
      return state;
  }
};
