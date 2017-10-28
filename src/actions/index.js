import fetchJsonp from 'fetch-jsonp';

const api_key;

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const FETCH_ACTORS = 'FETCH_ACTORS';
export const FETCH_DIRECTOR = 'FETCH_DIRECTOR';
export const FETCH_SCREENPLAY = 'FETCH_SCREENPLAY';
export const FETCH_NOVEL = 'FETCH_NOVEL';

export function fetchMovies(searchString) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&language=en-US&query=' + searchString + '&include_adult=false').then((response) => {
            return response.json();
        });

    return {
        type: FETCH_MOVIES,
        payload: requestPromise
    };
}

export function selectMovie(movie) {
    return {
        type: SELECT_MOVIE,
        payload: movie
    };
}

export function fetchActors(movie, baseUrl) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + api_key).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_ACTORS,
        payload: requestPromise,
        meta: {
            imageBaseUrl: baseUrl
        }
    };
}

export function fetchDirector(movie, baseUrl) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + api_key).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_DIRECTOR,
        payload: requestPromise,
        meta: {
            imageBaseUrl: baseUrl
        }
    };
}

export function fetchScreenplay(movie, baseUrl) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + api_key).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_SCREENPLAY,
        payload: requestPromise,
        meta: {
            imageBaseUrl: baseUrl
        }
    };
}

export function fetchNovel(movie, baseUrl) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + api_key).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_NOVEL,
        payload: requestPromise,
        meta: {
            imageBaseUrl: baseUrl
        }
    };
}