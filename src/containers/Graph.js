import React, { Component } from 'react';
import { connect } from "react-redux";
import vis from 'vis';
import { bindActionCreators } from "redux";
import { fetchSameGenresMovies, fetchRecommendedMovies, fetchCredits } from "../actions/index";
import { ACTORS, GENRES, RECOMMENDED, DIRECTOR, SCREENPLAY, NOVEL } from '../reducers/GraphReducer';

export class Graph extends Component {

    componentDidUpdate() {
        var options = {
            interaction: {
                selectable: true
            }
        };
        var network = new vis.Network(document.getElementById('mynetwork'), this.props.graphData, options);

        network.on('click', (params) => {
            if (params.nodes[0] === ACTORS || params.nodes[0] === DIRECTOR || params.nodes[0] === SCREENPLAY || params.nodes[0] === NOVEL) {
                return this.props.fetchCredits(this.props.activeMovie, params.nodes[0], this.props.baseUrl);
            } else if ( params.nodes[0] === GENRES) {
                return this.props.fetchSameGenresMovies(this.props.activeMovie, this.props.baseUrl);
            } else if (params.nodes[0] === RECOMMENDED) {
                return this.props.fetchRecommendedMovies(this.props.activeMovie, this.props.baseUrl);
            }
        });
    }

    render() {
        return (
            <div id="mynetwork" className="col-8"></div>
        );
    }
}

function mapStateToProps({ graphData, activeMovie }) {
  return { graphData, activeMovie };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSameGenresMovies, fetchRecommendedMovies, fetchCredits }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);