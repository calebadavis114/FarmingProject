import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllAnimals = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/animals/");
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
      setError("Error fetching animals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAnimals();
    console.log(animals)
  }, []);

  return (
    <>
      <h1>Animals Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {animals.map((animal, index) => (
            <li key={index}><Link to={animal.name}>{animal.name}</Link></li>
          ))}
        </ul>
      )}
    </>
  );
}