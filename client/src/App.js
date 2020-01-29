import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import { EditMovie } from "./Movies/EditMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState({});

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Router>
        <Route exact path="/" component={MovieList} />
        <Route
          path="/movies/:id"
          render={props => {
            return (
              <Movie
                {...props}
                addToSavedList={addToSavedList}
                setMovieToEdit={setMovieToEdit}
              />
            );
          }}
        />
        <Route exact path="/update-movie/:id">
          <EditMovie movieToEdit={movieToEdit}></EditMovie>
        </Route>
      </Router>
    </>
  );
};

export default App;
