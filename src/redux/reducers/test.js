import { GET_INFO, GET_INFO_ERROR, GET_INFO_SUCCESS, TEST } from "../actions/types";

const initialState = {
  loading: true,
  data: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return { ...state, message: action.message };
    case GET_INFO:
      return { ...state, loading: true };
    case GET_INFO_SUCCESS:
      return { ...state, loading: false, data: action.data };
    case GET_INFO_ERROR:
      return { ...state, loading: false, data: null, error: action.error };
    default:
      return state;
  }
}
