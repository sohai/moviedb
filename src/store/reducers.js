import {FETCH_MOVIES, FETCH_MOVIES_ERROR, FETCH_MOVIES_SUCCESS} from "./actions";

const initialState = {
  pending: false,
  movies: {
    results: []
  }
};

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        pending: true
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        pending: false
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false
      };
    default:
      return state;
  }
};

export const getMovies = (state) => state.movies;
export const isPending = (state) => state.pending;
