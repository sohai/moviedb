import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/switchMap'
import {FETCH_MOVIES} from "./actions";

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
      return Observable.ajax.getJSON('https://api.themoviedb.org/3/search/movie?api_key=8314509c1ed5f9aa815441dfb0dfcb36&query=titanic', {
        crossDomain: true
      })
    });
};
