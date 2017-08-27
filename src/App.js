import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchMovies} from "./store/actions";
import {getMovies, isPending} from "./store/reducers";
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import MovieCard from './components/MovieCard';

class App extends Component {

  componentWillMount() {
    const {fetchMovies} = this.props;
    this.unmount$ = new Subject();
    this.queryChange$ = new Subject();

    this.queryChange$
      .map(e => e.target.value)
      .filter(val => val.length > 2)
      .debounceTime(400)
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
        <TextField
          id="query"
          label="Type here..."
          className="SearchInput"
          onChange={e => this.queryChange$.next(e)}
          margin="normal"
        />
        <Grid container spacing={24}>
          {movies.results.map(movie =>
            <Grid item key={movie.id}>
              <MovieCard item={movie}/>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({movies: getMovies(state), isPending: isPending(state)}),
  {fetchMovies}
)(App);
