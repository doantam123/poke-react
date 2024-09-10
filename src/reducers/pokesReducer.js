const initialState = {
  loading: false,
  pokes: [],
  error: '',
};

const pokesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POKES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_POKES_SUCCESS':
      return { loading: false, pokes: action.payload.results, error: '' };
    case 'FETCH_POKES_FAILURE':
      return { loading: false, pokes: [], error: action.payload };
    default:
      return state;
  }
};

export default pokesReducer;
