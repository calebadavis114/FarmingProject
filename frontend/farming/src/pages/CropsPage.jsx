import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

export default function CropsPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [season, setSeason] = useState()
  const [growTime, setGrowTime] = useState()
  const [averageyield, setYield] = useState()
  const [create, setCreate] = useState(false)
  const [image, setImage] = useState()
  
  const getAllCrops = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/crops/");
      setCrops(response.data);
     console.log(response.data)
    } catch (error) {
      console.error("Error fetching crops:", error);
      setError("Error fetching crops. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

 const createACrop = async(e) => {
    e.preventDefault()
    let data = {
      "name":name,
      "picture": image,
      "plant_season":season,
      "grow_time":growTime,
     "average_yield":averageyield,
      "description":description
    }
    console.log(data)
    let response = await axios
      .post("http://127.0.0.1:8000/api/v1/crops/", data)
      .catch((err)=>{
        alert("could not create Crop")
        console.error(err)
      })
    if (response.status === 201){
      window.location.reload()
    }
  } 

  useEffect(() => {
    getAllCrops();
  }, []);

  return (
    <>
{create ? (
      <div>
          <button onClick={() => setCreate(false)}>
            Stop Creating
          </button>
           <form onSubmit={(e)=>createACrop(e)}>
           <h2>Create a Crop</h2>
           <input
             type="text"
             placeholder="Crop Name"
             onChange={(e) => setName(e.target.value)}
           />
          <input
             type="text"
             placeholder="Crop Image"
             onChange={(e) => setImage(e.target.value)}
           />
           <input
             type="text"
             placeholder="Season"
             onChange={(e) => setSeason(e.target.value)}
           />
           <input
             type="text"
             placeholder="Average Yield"
             onChange={(e) => setYield(e.target.value)}
           />
           <input
             type="number"
             placeholder="Grow Time"
             onChange={(e) => setGrowTime(e.target.value)}
           />
           <textarea
             placeholder="description"
             onChange={(e) => setDescription(e.target.value)}
           ></textarea>
           <input type="submit" value="create" />
         </form>
         </div>)
         :(
          <button onClick={() => setCreate(true)}>Create Crop</button>
         )}

      <h1>Crops Page</h1>
        <div>
        <ul>
          {crops.map((crops, index) => (
            <li key={index}><Link to={`${crops.id}`}>{crops.name}</Link></li>
          ))}
        </ul>
        </div>
    </>
  );
}