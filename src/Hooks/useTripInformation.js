import React, { useEffect, useState } from "react";
import useApi from "./useApi";

const useTripsInformation = () => {
  const [trips, setTrips] = useState([]);
  const api = useApi();
  useEffect(() => {
    fetchTripInformation();
  }, []);

  const fetchTripInformation = async () => {
    const response = await api.fetchTrips();
    setTrips(response.data.data);
  };
  return [trips, setTrips];
};

export default useTripsInformation;
