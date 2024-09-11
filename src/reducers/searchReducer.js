const initialState = {
    loading: false,
    pokemon: null,
    error: '',
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SEARCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SEARCH_SUCCESS':
        return { loading: false, pokemon: action.payload, error: '' };
      case 'FETCH_SEARCH_FAILURE':
        return { loading: false, pokemon: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default searchReducer;
  