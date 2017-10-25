import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectMovie } from "../actions/index";

class MovieList extends Component {
    selectMovie(movie) {
        this.props.selectMovie(movie);
    }

    render() {
        let movieList = this.props.movies.map((movie) => {
            let image;
            if (movie.poster_path) {
                image = <img src={this.props.baseUrl + 'w92' + movie.poster_path} />
            }
            return (
                <li className="list-group-item" onClick={() => { this.selectMovie(movie)}}>
                    {image}
                    {movie.original_title}
                    {movie.release_date}
                    {movie.vote_average}
                </li>
            );
        });
        return (
            <ul className="list-group">
                {movieList}
            </ul>
        );
  }
}

function mapStateToProps({ movies }) {
  return { movies };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectMovie }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);