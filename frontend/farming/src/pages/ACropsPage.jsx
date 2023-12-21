import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useOutletContext } from "react-router";

export default function ACrop() {
  const [edit, setEdit] = useState(false)
  const [del, setDelete] = useState(false)
  const [farmCrops, setFarmCrops] = useState([])
  const [crop, setCrop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { inFarm, setInFarm } = useOutletContext()
  const { id } = useParams();
  const [newName, setNewName] = useState(name)
  const [newDescription, setNewDescription] = useState()
  const [newSeason, setNewSeason] = useState()
  const [newGrow, setNewGrow] = useState()
  const [newYield, setNewYield] = useState()
  const [image, setImage] = useState()
  const { tok, setToken } = useOutletContext()
 

  const getACrop = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/crops/${id}`);
      setCrop(response.data);
      setNewName(response.data.name)
      setNewDescription(response.data.description)
      setNewGrow(response.data.grow_time)
      setNewSeason(response.data.plant_season)
      setNewYield(response.data.average_yield)
      setImage(response.data.picture)
      console.log(response.data.picture)
    } catch (error) {
      console.error("Error fetching crops:", error);
      setError("Error fetching crops. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updated = async() => {
    console.log('here')
    const data = {
      id: id,
      name: newName,
      picture: image,
      description: newDescription,
      plant_season: newSeason,
      grow_time: newGrow,
      average_yield: newYield
    }
    const response = await axios.put(`http://127.0.0.1:8000/api/v1/crops/${crop.id}/`, data)
    
    if (response.status === 204) {
      window.location.reload();
      setEdit(false)
      console.log('here')
    }
  }

  const handleCropForm = (e) => {
    e.preventDefault();
    updated();
  }

  const deleteCrop = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/crops/${crop.id}/`);
      console.log(response);
  
      if (response.status === 204) {
        window.location.href = '/crops';
      } else {
        console.error("Delete request was not successful");
      }
    } catch (error) {
      console.error("Error while deleting crop:", error);
    }
  };

  const findCrop = async() => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/farms/1",{
        headers: {
          Authorization: `Token ${tok}`,
        },
      });
     setFarmCrops(response.data.crops)
    } catch (error) {
      console.error("Error fetching farm:", error);
    } 
  }

  const removeFromFarm = async() => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/farms/1/remove_crop/${crop.id}/`);
      console.log(response);
  
      if (response.status === 204) {
        window.location.href = '/crops';
      } else {
        console.error("Delete request was not successful");
      }
    } catch (error) {
      console.error("Error while deleting crop:", error);
    }
    setInFarm(false);
  };
  const addToFarm = async () => {
    let data = {
      crop : {
        id: id
      }
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/farms/1/", data, {
        headers: {
          Authorization: `Token ${tok}`,
        },
      });
      setInFarm(true)
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to farm:", error);
    }
  };

  const removeFarm = (e) => {
    e.preventDefault();
    removeFromFarm();
    setInFarm(false);
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
  
    if (inFarm) {
      removeFromFarm();
    } else {
      addToFarm();
    }
  }
    
  useEffect(() =>
  {
    getACrop();

  }, [])
  
  useEffect(() =>
  {
    findCrop();
    farmCrops.map((crp) => {
        if(crop.name = crp){
          setInFarm(true)
        }
    });
    console.log(image)
  }, [image])
  return (
    <>
     {edit ? 
     <div>
      <form onSubmit={handleCropForm}>
      <input type="text" placeholder={newName}  
      onChange={(e) => setNewName(e.target.value)}/>
     <input type="text" placeholder={image}  
      onChange={(e) => setImage(e.target.value)} required/>
      <input type="text" placeholder={newDescription}  
      onChange={(e) => setNewDescription(e.target.value)}/>
      <input type="text" placeholder={newSeason}  
      onChange={(e) => setNewSeason(e.target.value)}/>
      <input type="number" placeholder={newGrow} 
       onChange={(e) => setNewGrow(e.target.value)}/>
      <input type="text" placeholder={newYield} 
       onChange={(e) => setNewYield(e.target.value)}/>
      <button type='submit'>Update</button>
      </form>
      </div>:
     <div>
    <h1>{crop.name}</h1>
   <img id='crop_image' src={crop.picture}></img>
   <h4>Instructions</h4>
   <p>{newDescription}</p>
   <h4>Seasons</h4>  
   <p>{newSeason}</p>
   <h4>Grow Time</h4>   
   <p>{newGrow} weeks</p>
   <h4>Average Yield</h4>
   <p>{newYield}</p>
   <button onClick={(e) => handleButtonClick(e)}>
   {inFarm ? "Remove" : "Add"}
  </button>
   <button onClick={() => setEdit(true)}>Edit</button> 
   <button onClick={deleteCrop}>Delete</button>
  </div>}
    
 </>
  )
  }