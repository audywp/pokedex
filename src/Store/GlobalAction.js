export const SET_LOADING = 'SET_LOADING';
export const SET_SCREEN_MODE = 'SET_SCREEN_MODE';

export const Loading = payload => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const changeScreenMode = payload => {
  return {
    type: SET_SCREEN_MODE,
    payload,
  };
};
