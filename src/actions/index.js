import fetchJsonp from 'fetch-jsonp';

const api_key;

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const FETCH_GENRE_MOVIES = 'FETCH_SAME_GENRE_MOVIES';
export const FETCH_RECOMMENDED_MOVIES = 'FETCH_RECOMMENDED_MOVIES';
export const FETCH_CREDITS = 'FETCH_CREDITS';

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

export function fetchCredits(movie, creditType, baseUrl) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + api_key).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_CREDITS,
        payload: requestPromise,
        meta: {
            creditType: creditType,
            imageBaseUrl: baseUrl
        }
    };
}

export function fetchSameGenresMovies(movie, baseUrl) {
    let genres = movie.genre_ids.toString();
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&with_genres=' + genres).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_GENRE_MOVIES,
        payload: requestPromise,
        meta: {
            imageBaseUrl: baseUrl
        }
    };
}

export function fetchRecommendedMovies(movie, baseUrl) {
    let requestPromise = fetchJsonp('https://api.themoviedb.org/3/movie/' + movie.id + '/recommendations?api_key=' + api_key).then((response) => {
            return response.json();
        });

    return {
        type: FETCH_RECOMMENDED_MOVIES,
        payload: requestPromise,
        meta: {
            imageBaseUrl: baseUrl
        }
    };
}