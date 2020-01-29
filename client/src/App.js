import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import { EditMovie } from "./Movies/EditMovie";
import { AddMovie } from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState({});

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <Router>
        <SavedList list={savedList} />
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
        <Route path="/update-movie/:id">
          <EditMovie movieToEdit={movieToEdit}></EditMovie>
        </Route>

        <Route path="/add-movie">
          <AddMovie></AddMovie>
        </Route>
      </Router>
    </>
  );
};

export default App;
