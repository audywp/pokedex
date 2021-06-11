import {SET_LOADING, SET_SCREEN_MODE} from './GlobalAction';

const initialState = {
  loading: false,
  screenMode: 'light',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_SCREEN_MODE:
      return {
        ...state,
        screenMode: action.payload,
      };
    default:
      return state;
  }
};
