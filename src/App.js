import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchJsonp from 'fetch-jsonp';

import MoviesSearchBar from './containers/MoviesSearchBar';
import MovieList from './containers/MovieList';
import Graph from './containers/Graph';

const api_key;

class App extends Component {
  constructor() {
    super();

    this.state = {
      baseUrl: ''
    };
  }

  componentDidMount() {
    fetchJsonp('https://api.themoviedb.org/3/configuration?api_key=' + api_key).then((response) => {
        return response.json();
    }).then((configuration) => {
        this.setState({ baseUrl: configuration.images.base_url});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="container-fluid">
        <div className="row">
          <Graph />
          <div className="col">
            <MoviesSearchBar />
            <MovieList baseUrl={this.state.baseUrl} />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
