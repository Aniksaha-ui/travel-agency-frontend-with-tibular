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
  };

  const deleteRoute = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `admin/routes/${id}`
    );
    if (response?.data.data === 1) {
      return response.data.isExecute;
    }
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
    const response = await axiosClient.apiClient(
      "POST",
      "admin/vehicles",
      route
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const deleteVehicle = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `admin/vehicles/${id}`
    );
    if (response?.data.data === 1) {
      return response.data.isExecute;
    }
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
  };

  const deleteSeat = async (id) => {
    const response = await axiosClient.apiClient("DELETE", `admin/seat/${id}`);
    if (response?.data.data === 1) {
      return response.data.isExecute;
    }
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

  const vehicleWiseAllSeat = async (id) => {
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
  };

  const addVehicleBookingForTrip = async (trip) => {
    const response = await axiosClient.apiClient(
      "POST",
      "admin/trip/vehicle/booking",
      trip
    );
    return response;
  };

  /**************************************Report Api*********************************/

  /**************************************Trips Api *********************************/

  const fetchTrips = async (page = "", search = "") => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/trip?page=${page}${query}`
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

  const fetchTripsDropDown = async () => {
    const response = await axiosClient.apiClient("GET", `admin/trip/dropdown`);
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const getTripById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `admin/single/trip/${id}`
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

  const addTrip = async (trip) => {
    const response = await axiosClient.apiClient("POST", "admin/trip", trip);
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const updateTrip = async (id, trip) => {
    const response = await axiosClient.apiClient(
      "POST",
      `/admin/trip/update/${id}`,
      trip
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const markAsCompleted = async (id) => {
    const response = await axiosClient.apiClient("GET", `admin/trip/${id}`);
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const fetchTourDetailsInformation = async (tourId) => {
    const response = await axiosClient.apiClient("POST", "admin/tripsummery", {
      trip_id: tourId,
    });
    if (response?.data.data) {
      return response.data.data;
    }
    return [];
  };

  const fetchAccountBalanceReport = async () => {
    const response = await axiosClient.apiClient("GET", `admin/accountBalance`);
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const fetchAccountBalanceHistoryReport = async (type) => {
    const response = await axiosClient.apiClient(
      "GET",
      `admin/accountHistory/${type}`
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

  const fetchBookings = async (page = "", search = "") => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/booking?page=${page}${query}`
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

  const fetchPackages = async (page = "", search = "") => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient("POST", `admin/packages`, {
      page: page,
      search: search,
    });
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const fetchPackageDetails = async (id) => {
    const response = await axiosClient.apiClient("GET", `packages/${id}`);
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const addPackage = async (packageData) => {
    const response = await axiosClient.apiClient(
      "POST",
      "admin/packages/create",
      packageData
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const fetchRefunds = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `admin/refund?page=${page}${query}`
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

  const vehicleTrackingReport = async () => {
    try {
      const response = await axiosClient.apiClient(
        "POST",
        "admin/useageOfVehicle",
        {}
      );
      console.log(response.data.data.data, "res");

      if (response.data.data.data.length > 0) {
        return response.data.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGuideDropDown = async () => {
    const response = await axiosClient.apiClient("GET", `admin/guide/dropdown`);
    if (response) {
      if (response?.data) {
        return response.data;
      }
    } else {
      return { message: response.message, data: [] };
    }
    return null;
  };

  const fetchBookingInvoiceByBookingId = async (bookingId) => {
    const response = await axiosClient.apiClient(
      "POST",
      `admin/booking-invoice`,
      {
        bookingId,
      }
    );

    if (response.data) {
      return response.data;
    } else {
      return { message: response.message, data: [] };
    }
  };

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
    vehicleWiseAllSeat,
    fetchTrips,
    fetchTripsDropDown,
    getTripById,
    addTrip,
    updateTrip,
    addVehicleBookingForTrip,
    fetchTourDetailsInformation,
    fetchAccountBalanceReport,
    fetchAccountBalanceHistoryReport,
    fetchBookings,
    markAsCompleted,
    fetchPackages,
    fetchPackageDetails,
    addPackage,
    vehicleTrackingReport,
    fetchRefunds,
    fetchGuideDropDown,
    fetchBookingInvoiceByBookingId,
  };
};

export default useApi;
