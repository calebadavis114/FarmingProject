import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext, useParams } from "react-router";

export default function AnAnimal() {
  const { farmAnimals, setFarmAnimals } = useOutletContext()
  const [animal, setAnimal] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [habitat, setHabitat] = useState()
  const [diet, setDiet] = useState()
  const [litter, setLiter] = useState()
  const [lifespan, setLifeSpan] = useState()
  const [skinType, setSkinType] = useState()
  const { name } = useParams();
  const [icon, setIcon] = useState()
  const { inFarm, setInFarm }= useOutletContext()
  const { tok, setToken } = useOutletContext()
  const [animals, setAnimals] = useState([])
  const [id, setId] = useState()

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

  const getAnAnimal = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/animals/${name}`);
      setAnimal(response.data);
      setHabitat(response.data.characteristics.habitat)
      setDiet(response.data.characteristics.main_prey)
      setLiter(response.data.characteristics.average_litter_size)
      setLifeSpan(response.data.characteristics.lifespan)
      setSkinType(response.data.characteristics.skin_type)
    } catch (error) {
      console.error("Error fetching icon:", error);
      setError("Error fetching icon. Please try again later.");
    }
  };

  const removeFromFarm = async() => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/farms/1/remove_animal/${name}/`);
      console.log(response);
  
      if (response.status === 204) {
        window.location.href = '/crops';
      } else {
        console.error("Delete request was not successful");
      }
    } catch (error) {
      console.error("Error while deleting crop:", error);
    }
    // setInFarm(false);
  };


  const findAnimal = async() => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/farms/1",{
        headers: {
          Authorization: `Token ${tok}`,
        },
      });
     setFarmAnimals(response.data.animals)
    } catch (error) {
      console.error("Error fetching farm:", error);
    } 
  }
  const addToFarm = async () => {
    let data = {
      animal : {
        id: id
      }
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/farms/1/", data, {
        headers: {
          Authorization: `Token ${tok}`,
        },
      });
      // setInFarm(true)
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to farm:", error);
    }
  };
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
    findAnimal();
    getAllAnimals();
  }, [])

  useEffect(() => {
    console.log(farmAnimals)
    farmAnimals.map((anm) => {
        if(name == anm){
          console.log('hi')
          setInFarm(true)
        }
    });
  }, [farmAnimals])

  useEffect(() => {
    animals.map((anm, index) => {
      if (name === anm.name) {
        setId(index);
      } else{
        return name;
      }
    });
  }, [animals]);




  const getAnIcon = async () => {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/image/${name}`);
      setIcon(response.data[16].thumbnail_url)
      console.log(response.data[0].thumbnail_url)
    } catch (error) {
      console.error("Error fetching animals:", error);
      setError("Error fetching animals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getAnAnimal();
    getAnIcon();
  }, []);
  return (
    <>
   <h1>{name}</h1>
   <img src={icon}></img>
   <h3>Habitat</h3>
   <p>{habitat}</p>
   <h3>Diet</h3>
   <p>{diet}</p>
   <h3>Litter Size</h3>
   <p>{litter}</p>
   <h3>LifeSpan</h3>
   <p>{lifespan}</p>
   <h3>Skin Type</h3>
   <p>{skinType}</p>

   <button
          onClick={(e) => handleButtonClick(e)}
        >
          {inFarm ? "Remove" : "Add"}
        </button>
    </>
  )
        }