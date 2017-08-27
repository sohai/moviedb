export const FETCH_MOVIES = 'FETCH_MOVIEWS';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';

export const fetchMovies = query => ({ type: FETCH_MOVIES, payload: query });
export const fetchMoviesSuccess = payload => ({ type: FETCH_MOVIES_SUCCESS, payload });
export const fetchMoviesError = payload => ({ type: FETCH_MOVIES_ERROR, payload });
