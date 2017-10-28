import React, { Component } from 'react';
import { connect } from "react-redux";
import vis from 'vis';
import { bindActionCreators } from "redux";
import { fetchActors, fetchDirector, fetchScreenplay, fetchNovel } from "../actions/index";

export class Graph extends Component {

    componentDidUpdate() {
        var options = {
            interaction: {
                selectable: true
            }
        };
        var network = new vis.Network(document.getElementById('mynetwork'), this.props.graphData, options);

        network.on('click', (params) => {
            switch (params.nodes[0]) {
                case 'Actors':
                    return this.props.fetchActors(this.props.activeMovie, this.props.baseUrl);
                case 'Director':
                    return this.props.fetchDirector(this.props.activeMovie, this.props.baseUrl);
                case 'Screenplay':
                    return this.props.fetchScreenplay(this.props.activeMovie, this.props.baseUrl);
                case 'Novel':
                    return this.props.fetchNovel(this.props.activeMovie, this.props.baseUrl);
                default:
                    return;
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
  return bindActionCreators({ fetchActors, fetchDirector, fetchScreenplay, fetchNovel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);