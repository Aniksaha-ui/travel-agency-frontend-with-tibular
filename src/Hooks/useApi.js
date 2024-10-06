import useAxios from "./useAxios";

const useApi = () => {
  const axiosClient = useAxios();

  /** get localstorage value */
  const getLocalStorageValue = () => {
    return {
      token: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null,
      email: localStorage.getItem("email")
        ? localStorage.getItem("email")
        : null,
      role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
    };
  };

  /** calling login api */

  const login = async (data) => {
    const response = await axiosClient.apiClient("POST", "login", data);
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const fetchRoutes = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/routes?page=${page}${query}`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const fetchRouteDropDownList = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      `admin/routes/dropdown`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const addRoute = async (route) => {
    const response = await axiosClient.apiClient("POST", "admin/routes", route);
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
    console.log(response.data);
  };

  const deleteRoute = async (id) => {
    const response = await axiosClient.apiClient("DELETE", `admin/routes/${id}`);
    if (response?.data.data === 1) {
      return response.data.isExecute;
    }
    console.log(response.isExecute);
  };

  /****************************************************Users Api ***********************************/
  const fetchUsers = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/users?page=${page}${query}`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  /****************************************************Users Api ***********************************/


  /***************************************vehicles api *********************************/

  const fetchVehicle = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/vehicles?page=${page}${query}`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };


  const fetchVehicleDropDownList = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      `admin/vehicles/dropdown`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const addVehicle = async (route) => {
    const response = await axiosClient.apiClient("POST", "admin/vehicles", route);
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
    console.log(response.data);
  };

  const deleteVehicle = async (id) => {
    const response = await axiosClient.apiClient("DELETE", `admin/vehicles/${id}`);
    if (response?.data.data === 1) {
      return response.data.isExecute;
    }
    console.log(response.isExecute);
  };

  /***************************************vehicles api *********************************/


  /***************************************Seats Api*********************************/
  const fetchSeats = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/seat?page=${page}${query}`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const addSeat = async (seat) => {
    const response = await axiosClient.apiClient("POST", "admin/seat", seat);
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
    console.log(response.data);
  };

  const deleteSeat = async (id) => {
    const response = await axiosClient.apiClient("DELETE", `admin/seat/${id}`);
    if (response?.data.data === 1) {
      return response.data.isExecute;
    }
    console.log(response.isExecute);
  };


  /***************************************Seats Api*********************************/


  /**************************************Report Api*********************************/
  const vehicleWiseSeatReport = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/vehiclewisetotalseat?page=${page}${query}`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const vehicleWiseAllSeat = async(id)=>{
    const response = await axiosClient.apiClient(
      "GET",
      `admin/vehiclewiseseat/${id}`
    );
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  
  }

  /**************************************Report Api*********************************/



  return {
    getLocalStorageValue,
    login,
    fetchRoutes,
    fetchRouteDropDownList,
    fetchUsers,
    addRoute,
    deleteRoute,
    fetchVehicle,
    fetchVehicleDropDownList,
    addVehicle,
    deleteVehicle,
    fetchSeats,
    addSeat,
    deleteSeat,
    vehicleWiseSeatReport,
    vehicleWiseAllSeat
  };
};

export default useApi;
