import { combineReducers } from "redux";
import MoviesReducer from "./MoviesReducer";
import ActiveMovieReducer from "./ActiveMovieReducer";
import GraphReducer from "./GraphReducer";

const rootReducer = combineReducers({
  movies: MoviesReducer,
  activeMovie: ActiveMovieReducer,
  graphData: GraphReducer
});

export default rootReducer;