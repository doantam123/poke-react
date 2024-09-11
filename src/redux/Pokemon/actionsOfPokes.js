import axios from 'axios';

//GetDetailPoke
export const fetchPokeDetailRequest = () => ({
  type: 'FETCH_POKE_DETAIL_REQUEST',
});

export const fetchPokeDetailSuccess = (data) => ({
  type: 'FETCH_POKE_DETAIL_SUCCESS',
  payload: data,
});

export const fetchPokeDetailFailure = (error) => ({
  type: 'FETCH_POKE_DETAIL_FAILURE',
  payload: error,
});

//GetListPoke
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

// Thunk action creator get pokemon
export const fetchPokes = (offset, limit) => async (dispatch) => {
  dispatch({ type: 'FETCH_POKES_REQUEST' });

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    dispatch({
      type: 'FETCH_POKES_SUCCESS',
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_POKES_FAILURE',
      payload: error.message,
    });
  }
};


// Thunk action creator get detail pokemon
export const fetchPokeDetail = (id) => {
  return async (dispatch) => {
    dispatch(fetchPokeDetailRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_POKEMON_V2}/pokemon/${id}`);
      dispatch(fetchPokeDetailSuccess(response.data));
    } catch (error) {
      dispatch(fetchPokeDetailFailure(error.message));
    }
  };
};

