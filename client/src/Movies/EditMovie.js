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

    if (formData.actors instanceof Array) {
      stars = formData.actors;
    } else {
      stars = formData.actors.split(",");
    }

    const payload = {
      ...formData,
      id,
      stars
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/movies/${id}`,
        payload
      );
      history.push("/");
    } catch (err) {
      console.error(err);
    }

    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={handleChange}
          value={formData.title}
        />
        <label htmlFor="director">Director</label>
        <input
          type="text"
          id="director"
          onChange={handleChange}
          value={formData.director}
        />
        <label htmlFor="metascore">Metacritic Score</label>
        <input
          type="text"
          id="metascore"
          onChange={handleChange}
          value={formData.metascore}
        />
        <label htmlFor="actors">Actors</label>
        <input
          type="textarea"
          id="actors"
          onChange={handleChange}
          value={formData.actors}
        />
        <button>update</button>
      </form>
    </div>
  );
};
