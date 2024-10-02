import  { useEffect, useState } from "react";
import useApi from "./useApi";

const useVehicleInformation = () => {
  const [vehicles, setVehicles] = useState([]);
  const api = useApi();
  useEffect(() => {
   fetchVehicleDropDownInformation();
  }, []);

  const fetchVehicleDropDownInformation = async () => {
    const response = await api.fetchVehicleDropDownList();
    console.log(response);
   setVehicles(response.data)
  };
  return [vehicles,setVehicles]
};




export default useVehicleInformation;