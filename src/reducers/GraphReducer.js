import vis from 'vis';

import { SELECT_MOVIE, FETCH_ACTORS, FETCH_DIRECTOR, FETCH_SCREENPLAY, FETCH_NOVEL } from '../actions/index';

export default function(state = {}, action) {
    switch(action.type) {
        case SELECT_MOVIE:
            return newMovieGraph(action.payload);
        case FETCH_ACTORS:
            return addCast(state, action.payload.cast, action.meta.imageBaseUrl); //action.payload.id movie id
        case FETCH_DIRECTOR:
            return addRole(state, action.payload.crew, 'Director', action.meta.imageBaseUrl);
        case FETCH_SCREENPLAY:
            return addRole(state, action.payload.crew, 'Screenplay', action.meta.imageBaseUrl);
        case FETCH_NOVEL:
            return addRole(state, action.payload.crew, 'Novel', action.meta.imageBaseUrl);
        default:
            return state;
    }
}

function newMovieGraph(movie) {
    let nodes = [
        { id: movie.id, label: movie.original_title },
        { id: 'Actors', label: 'Actors' },
        { id: 'Genres', label: 'Genres' },
        { id: 'Director', label: 'Director' },
        { id: 'Screenplay', label: 'Screenplay' },
        { id: 'Novel', label: 'Book by' },
    ];

    // create an array with edges
    let edges = [
        { from: movie.id, to: 'Actors' },
        { from: movie.id, to: 'Genres' },
        { from: movie.id, to: 'Director' },
        { from: movie.id, to: 'Screenplay' },
        { from: movie.id, to: 'Novel' }
    ];

    return createGraphData(nodes, edges);
}

function addCast(graphData, cast, imageBaseUrl) {
    let nodes = graphData.nodes.get();
    let edges = graphData.edges.get();
    let nodesLookup = datasetLookup(nodes);

    let castNodes = [];
    let castEdges = [];
    let i = 0;
    while( i < 6 && i < cast.length) {
        if(!nodesLookup[cast[i].id]) {
            castNodes.push({ id: cast[i].id, label: cast[i].name, shape: 'circularImage', image: imageBaseUrl + 'w45' + cast[i].profile_path});
        }
        castEdges.push({ from: 'Actors', to: cast[i].id});
        i++;
    }

    let newNodes = [...nodes, ...castNodes];
    let newEdges = [...edges, ...castEdges];

    return createGraphData(newNodes, newEdges);
}

function addRole(graphData, crew, role, imageBaseUrl) {
    let nodes = graphData.nodes.get();
    let edges = graphData.edges.get();
    let nodesLookup = datasetLookup(nodes);

    let roleNodes = [];
    let roleEdges = [];
    for(let i = 0; i < crew.length; i++) {
        if (crew[i].job === role) {
            if(!nodesLookup[crew[i].id]) {
                roleNodes.push({ id: crew[i].id, label: crew[i].name, shape: 'circularImage', image: imageBaseUrl + 'w45' + crew[i].profile_path});
            }
            roleEdges.push({ from: role, to: crew[i].id});
        }
    }

    let newNodes = [...nodes, ...roleNodes];
    let newEdges = [...edges, ...roleEdges];

    return createGraphData(newNodes, newEdges);
}

function createGraphData(nodes, edges) {
    let visNodes = new vis.DataSet(nodes);
    let visEdges = new vis.DataSet(edges);

    let data = { nodes: visNodes, edges: visEdges};
    return data;
}

function datasetLookup(items) {
    let lookUp = {};
    for(let i = 0; i < items.length; i++) {
        lookUp[items[i].id] = items[i];
    }

    return lookUp;
}