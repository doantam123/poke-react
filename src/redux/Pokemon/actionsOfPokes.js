import axios from 'axios';

export const fetchPokesRequest = () => ({
  type: 'FETCH_POKES_REQUEST',
});

export const fetchPokesSuccess = (data) => ({
  type: 'FETCH_POKES_SUCCESS',
  payload: data,
});

export const fetchPokesFailure = (error) => ({
  type: 'FETCH_POKES_FAILURE',
  payload: error,
});

// Thunk action creator
export const fetchPokes = (offset = 0, limit = 10) => {
  return async (dispatch) => {
    dispatch(fetchPokesRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_POKEMON_V2}/pokemon?limit=${limit}&offset=${offset}`);
      console.log(response)
      dispatch(fetchPokesSuccess(response.data));
    } catch (error) {
      dispatch(fetchPokesFailure(error.message));
    }
  };
};
