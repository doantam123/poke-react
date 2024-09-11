const initialState = {
    loading: false,
    pokemon: null,
    error: '',
  };
  
  const pokeDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_POKE_DETAIL_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_POKE_DETAIL_SUCCESS':
        return { loading: false, pokemon: action.payload, error: '' };
      case 'FETCH_POKE_DETAIL_FAILURE':
        return { loading: false, pokemon: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default pokeDetailReducer;
  