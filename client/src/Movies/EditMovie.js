import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export const EditMovie = () => {
  const id = useParams().id;
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    director: "",
    metascore: "",
    actors: []
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      id,
      stars: formData.actors.split(",")
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/movies/${id}`,
        payload
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }

    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={handleChange} />
        <label htmlFor="director">Director</label>
        <input type="text" id="director" onChange={handleChange} />
        <label htmlFor="metascore">Metacritic Score</label>
        <input type="text" id="metascore" onChange={handleChange} />
        <label htmlFor="actors">Actors</label>
        <input type="textarea" id="actors" onChange={handleChange} />
        <button>update</button>
      </form>
    </div>
  );
};
