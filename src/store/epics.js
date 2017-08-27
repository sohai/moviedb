import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import {FETCH_MOVIES, fetchMoviesError, fetchMoviesSuccess} from "./actions";
import fetchJsonp from 'fetch-jsonp';

const API_KEY = '8314509c1ed5f9aa815441dfb0dfcb36';

/**
 * search movies epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */
export const searchMovies = (action$) => {
  return action$
    .ofType(FETCH_MOVIES)
    .switchMap(action => {
      return Observable
        .fromPromise(fetchJsonp(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${action.payload}`)
          .then(res => res.json()))
        .map(res => fetchMoviesSuccess(res))
        .catch(e => Observable.of(fetchMoviesError(e)))
    });
};
