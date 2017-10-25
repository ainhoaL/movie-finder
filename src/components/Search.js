import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

const api_key;

export class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            results: []
        };

        this.getMovies = this.getMovies.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({searchString: event.target.value});
    }

    getMovies() {
        return fetchJsonp('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&language=en-US&query=' + this.state.searchString + '&include_adult=false').then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({ results: json.results });
        });
    }

    render() {
        let movies = this.state.results.map(result => <div>{result.original_title}</div>);
        return (
            <div>
                <input type="search" placeholder="Enter movie tile" value={this.state.searchString} onChange={this.handleChange} />
                <button onClick={this.getMovies}>Find movie</button>
                <div class="results">
                    {movies}
                </div>
            </div>
        );
    }
}