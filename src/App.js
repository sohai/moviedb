import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'
import {fetchMovies} from "./actions";
import {getMovies, isPending} from "./reducers";
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

class App extends Component {

  componentWillMount() {
    const {fetchMovies} = this.props;
    this.unmount$ = new Subject();
    this.keyUp$ = new Subject();

    this.keyUp$
      .map(e => e.target.value)
      .filter(val => val.length > 2)
      .debounceTime(200)
      .takeUntil(this.unmount$)
      .subscribe(val => {
        fetchMovies(val)
      });
  }

  componentWillUnmount() {
    this.unmount$.next();
    this.unmount$.complete();
  }

  render() {
    const {movies} = this.props;
    return (
      <div className="App">
        <input type="text" onKeyUp={(e) => this.keyUp$.next(e)}/>
        <ul>
          {movies.map(movie =>
            <li>{movie.original_title}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({movies: getMovies(state), isPending: isPending(state)}),
  {fetchMovies}
)(App);
