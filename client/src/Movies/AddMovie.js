import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const AddMovie = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    director: "",
    metascore: "",
    actors: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      ...formData,
      stars: formData.actors.split(",")
    };

    try {
      const res = await axios.post("http://localhost:5000/api/movies", payload);
      history.push(`/movies/${res.data.length - 1}`);
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
        <button className="button">add movie</button>
      </form>
    </div>
  );
};
