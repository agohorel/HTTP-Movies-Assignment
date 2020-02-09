import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export const EditMovie = ({ movieToEdit }) => {
  const id = useParams().id;
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: movieToEdit.title,
    director: movieToEdit.director,
    metascore: movieToEdit.metascore,
    actors: movieToEdit.stars
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let stars;

    // this handles when you don't update the actors
    if (formData.actors instanceof Array) {
      stars = formData.actors;
    } else {
      // this handles when you do
      stars = formData.actors.split(",");
    }

    const payload = {
      ...formData,
      id,
      stars
    };

    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, payload);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          onChange={handleChange}
          value={formData.title}
          className="form-input"
        />
        <label htmlFor="director" className="form-label">
          Director
        </label>
        <input
          type="text"
          id="director"
          onChange={handleChange}
          value={formData.director}
          className="form-input"
        />
        <label htmlFor="metascore" className="form-label">
          Metacritic Score
        </label>
        <input
          type="text"
          id="metascore"
          onChange={handleChange}
          value={formData.metascore}
          className="form-input"
        />
        <label htmlFor="actors" className="form-label">
          Actors
        </label>
        <input
          type="textarea"
          id="actors"
          onChange={handleChange}
          value={formData.actors}
          className="form-input"
        />
        <button className="button">update</button>
      </form>
    </div>
  );
};
