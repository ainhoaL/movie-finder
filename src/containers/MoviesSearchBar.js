import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovies } from "../actions/index";

class MoviesSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchString: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ searchString: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchMovies(this.state.searchString);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input type="search" placeholder="Enter movie tile" className="form-control" value={this.state.searchString} onChange={this.onInputChange} />
        <button type="submit" className="btn btn-primary">Find movie</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovies }, dispatch);
}

export default connect(null, mapDispatchToProps)(MoviesSearchBar);