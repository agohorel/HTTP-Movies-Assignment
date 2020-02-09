import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const activeNavStyle = {
  textDecoration: "line-through",
  backgroundColor: "#21934c"
};

export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
        <div className="nav-buttons">
          <div className="home-button">
            <NavLink activeStyle={activeNavStyle} to="/add-movie">
              Add Movie
            </NavLink>
          </div>
          <div className="home-button">
            <NavLink activeStyle={activeNavStyle} exact to="/">
              Home
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
