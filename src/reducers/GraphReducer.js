import vis from 'vis';

import { SELECT_MOVIE, FETCH_GENRE_MOVIES, FETCH_RECOMMENDED_MOVIES, FETCH_CREDITS } from '../actions/index';

export const ACTORS = 'Actors';
export const GENRES = 'Genres';
export const RECOMMENDED = 'Recommended';
export const DIRECTOR = 'Director';
export const SCREENPLAY = 'Screenplay';
export const NOVEL = 'Novel';

export default function(state = {}, action) {
    switch(action.type) {
        case SELECT_MOVIE:
            return newMovieGraph(action.payload);
        case FETCH_CREDITS:
            return addCredits(state, action.payload, action.meta.creditType, action.meta.imageBaseUrl);
        case FETCH_GENRE_MOVIES:
            return addMovies(state, action.payload.results, 'Genres', action.meta.imageBaseUrl);
        case FETCH_RECOMMENDED_MOVIES:
            return addMovies(state, action.payload.results, 'Recommended', action.meta.imageBaseUrl);
        default:
            return state;
    }
}

function newMovieGraph(movie) {
    let nodes = [
        { id: movie.id, label: movie.original_title },
        { id: ACTORS, label: 'Actors' },
        { id: GENRES, label: 'Same Genres' },
        { id: RECOMMENDED, label: 'Recommended' },
        { id: DIRECTOR, label: 'Director' },
        { id: SCREENPLAY, label: 'Screenplay' },
        { id: NOVEL, label: 'Book by' },
    ];

    // create an array with edges
    let edges = [
        { from: movie.id, to: ACTORS },
        { from: movie.id, to: GENRES },
        { from: movie.id, to: RECOMMENDED },
        { from: movie.id, to: DIRECTOR },
        { from: movie.id, to: SCREENPLAY },
        { from: movie.id, to: NOVEL }
    ];

    return createGraphData(nodes, edges);
}

function addCredits(graphData, data, creditType, imageBaseUrl) {
    let nodes = graphData.nodes.get();
    let edges = graphData.edges.get();
    let nodesLookup = datasetLookup(nodes);

    let creditsGraphData;
    if (creditType === ACTORS) {
        creditsGraphData = addCast(nodesLookup, data.cast, imageBaseUrl);
    } else {
        creditsGraphData = addRole(nodesLookup, data.crew, creditType, imageBaseUrl);
    }

    let newNodes = [...nodes, ...creditsGraphData.nodes];
    let newEdges = [...edges, ...creditsGraphData.edges];

    return createGraphData(newNodes, newEdges);
}

function addCast(nodesLookup, cast, imageBaseUrl) {
    let castNodes = [];
    let castEdges = [];
    let i = 0;
    while( i < 6 && i < cast.length) {
        if(!nodesLookup[cast[i].id]) {
            castNodes.push({ id: cast[i].id, label: cast[i].name, shape: 'circularImage', image: imageBaseUrl + 'w45' + cast[i].profile_path});
        }
        castEdges.push({ from: ACTORS, to: cast[i].id});
        i++;
    }

    return { nodes: castNodes, edges: castEdges };
}

function addRole(nodesLookup, crew, role, imageBaseUrl) {
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

    return { nodes: roleNodes, edges: roleEdges };
}

function addMovies(graphData, movies, originalNodeId, imageBaseUrl) {
    let nodes = graphData.nodes.get();
    let edges = graphData.edges.get();
    let nodesLookup = datasetLookup(nodes);

    let movieNodes = [];
    let movieEdges = [];
    let i = 0;
    while( i < 10 && i < movies.length) {
        if(!nodesLookup[movies[i].id]) {
            movieNodes.push({ id: movies[i].id, label: movies[i].original_title, shape: 'circularImage', image: imageBaseUrl + 'w45' + movies[i].poster_path});
        }
        movieEdges.push({ from: originalNodeId, to: movies[i].id});
        i++;
    }

    let newNodes = [...nodes, ...movieNodes];
    let newEdges = [...edges, ...movieEdges];

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