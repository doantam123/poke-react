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

//Search
export const fetchSearchRequest = () => ({
  type: 'FETCH_SEARCH_REQUEST',
});

export const fetchSearchSuccess = (data) => ({
  type: 'FETCH_SEARCH_SUCCESS',
  payload: data,
});

export const fetchSearchFailure = (error) => ({
  type: 'FETCH_SEARCH_FAILURE',
  payload: error,
});

export const fetchPokes = (offset, limit, searchTerm = '') => async (dispatch) => {
  dispatch({ type: 'FETCH_POKES_REQUEST' });

  try {
    const response = await fetch(`${process.env.REACT_APP_API_POKEMON_V2}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    // Nếu có từ khóa tìm kiếm, lọc kết quả
    const filteredResults = searchTerm
      ? data.results.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()))
      : data.results;

    dispatch({
      type: 'FETCH_POKES_SUCCESS',
      payload: filteredResults,
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

// Thunk action creator for search
export const fetchSearch = (searchTerm) => {
  return async (dispatch) => {
    dispatch(fetchSearchRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_POKEMON_V2}/pokemon/${searchTerm.toLowerCase()}`);
      dispatch(fetchSearchSuccess(response.data));
    } catch (error) {
      dispatch(fetchSearchFailure('Pokemon not found'));
    }
  };
};

