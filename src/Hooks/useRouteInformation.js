import React, { useEffect, useState } from "react";
import useApi from "./useApi";

const useRoutesInformation = () => {
  const [routes, setRoutes] = useState([]);
  const api = useApi();
  useEffect(() => {
   fetchrouteDropDownInformation();
  }, []);

  const fetchrouteDropDownInformation = async () => {
    const response = await api.fetchRouteDropDownList();
    console.log(response);
   setRoutes(response.data)
  };
  return [routes,setRoutes]
};




export default useRoutesInformation;