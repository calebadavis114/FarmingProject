import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FarmsPage() {
    const [farmAnimals, setFarmAnimals] = useState([]);
    const [farmCrops, setFarmCrops] = useState([]);
    const [farm, setFarm] = useState()
    const { tok, setToken } = useOutletContext()
    const { inFarm,setInFarm } = useOutletContext()

    const getFarm = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/farms/1",{
          headers: {
            Authorization: `Token ${tok}`,
          },
        });
        setFarm(response.data);
       console.log(response.data)
       setFarmAnimals(response.data.animals)
       console.log(farmAnimals)
       setFarmCrops(response.data.crops)
      } catch (error) {
        console.error("Error fetching farm:", error);
      } 
    };

    useEffect(() => {
      console.log("Updated FarmAnimals state:", farmAnimals);
    }, [farmAnimals]);
    

    useEffect(() => {
      getFarm();
    }, []); 
  
    return (
      <>
        <h2>Farm</h2>
        <h3>Animals</h3>
        {farmAnimals.map((animal, index) => (
          <li key={index}><a href={`/animals/${animal}`}>{animal}</a></li>
        ))}
        <h3>Crops</h3>
       {farmCrops.map((crop, index) => (
          <li><a href={`/crops/${crop}`} onClick={setInFarm(true)}>{crop}</a></li>
        ))}
      </>
    );
}