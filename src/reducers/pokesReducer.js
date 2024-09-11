const initialState = {
  pokes: [],
  loading: false,
  error: null,
};

const pokesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POKES_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_POKES_SUCCESS':
      return { ...state, pokes: action.payload, loading: false };
    case 'FETCH_POKES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default pokesReducer;
