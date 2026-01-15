import { toast } from "react-toastify";
import {
  ACCOUNT_BALANCE_API_ENDPOINT,
  ACCOUNT_HISTORY_API_ENDPOINT,
  ADD_VEHICLE_BOOKING_FOR_TRIP_API_ENDPOINT,
  ADMIN_BOOKING_API_ENDPOINT,
  ADMIN_BOOKING_INVOICE_API_ENDPOINT,
  CUSTOMER_VALUE_REPORT,
  DASHBOARD,
  FINANCIAL_REPORT,
  GUIDE_API_ENDPOINT,
  HOTEL_API_ENDPOINT,
  LOGIN_API_ENDPOINT,
  MONTH_RUNNING_BALANCE,
  PACKAGE_API_ENDPOINT,
  PACKAGE_PERFORMANCE,
  REFUND_API_ENDPOINT,
  REFUND_DISBURSED_API_ENDPOINT,
  ROUTES_API_ENDPOINT,
  ROUTES_DROPDOWN_API_ENDPOINT,
  SEATS_API_ENDPOINT,
  SINGLE_PACKAGE_DETAILS,
  TICKET_API_ENDPOINT,
  TRIP_PERFORMANCE,
  TRIP_SINGLE_API_ENDPOINT,
  TRIP_SUMMERY_API_ENDPOINT,
  TRIPS_API_ENDPOINT,
  USER_API_ENDPOINT,
  USER_HOTEL_API_ENDPOINT,
  VEHICLE_API_ENDPOINT,
  VEHICLE_WISE_SEAT_API_ENDPOINT,
  VEHICLE_WISE_TOTAL_SEAT_REPORT_API_ENDPOINT,
  VEHICLES_API_ENDPOINT,
  VEHICLES_DROPDOWN_API_ENDPOINT,
} from "../Utils/Constants/api";
import { API_SUCCESS } from "../Utils/Constants/common";
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

  const dashboardInformation = async () => {
    try {
      const response = await axiosClient.apiClient("GET", `${DASHBOARD}`);
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (Error) {
      console.log(Error);
    }
  };

  const login = async (data) => {
    const response = await axiosClient.apiClient(
      "POST",
      LOGIN_API_ENDPOINT,
      data
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

  const fetchRoutes = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `${ROUTES_API_ENDPOINT}?page=${page}${query}`
    );

    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      if (response?.data) {
        return response.data;
      }
    } else {
      toast(response.data.message);
    }

    return null;
  };

  const fetchRouteDropDownList = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      ROUTES_DROPDOWN_API_ENDPOINT
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      if (response?.data) {
        return response.data;
      }
    } else {
      toast(response.data.message);
      return { message: response.message, data: [] };
    }
    return null;
  };

  const addRoute = async (route) => {
    const response = await axiosClient.apiClient(
      "POST",
      ROUTES_API_ENDPOINT,
      route
    );

    console.log(response.data.isExecute);

    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    } else {
      toast(response.data.message);
    }
  };

  const deleteRoute = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${ROUTES_API_ENDPOINT}/${id}`
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    } else {
      toast(response.data.message);
    }
  };

  /****************************************************Users Api ***********************************/
  const fetchUsers = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `${USER_API_ENDPOINT}?page=${page}${query}`
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
      `${VEHICLES_API_ENDPOINT}?page=${page}${query}`
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
      VEHICLES_DROPDOWN_API_ENDPOINT
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
      VEHICLES_API_ENDPOINT,
      route
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const deleteVehicle = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${VEHICLES_API_ENDPOINT}/${id}`
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
      `${SEATS_API_ENDPOINT}?page=${page}${query}`
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
    const response = await axiosClient.apiClient(
      "POST",
      SEATS_API_ENDPOINT,
      seat
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const deleteSeat = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${SEATS_API_ENDPOINT}/${id}`
    );
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
      `${VEHICLE_WISE_TOTAL_SEAT_REPORT_API_ENDPOINT}?page=${page}${query}`
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
      `${VEHICLE_WISE_SEAT_API_ENDPOINT}/${id}`
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
      ADD_VEHICLE_BOOKING_FOR_TRIP_API_ENDPOINT,
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
      `${TRIPS_API_ENDPOINT}?page=${page}${query}`
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
    const response = await axiosClient.apiClient(
      "GET",
      `${TRIPS_API_ENDPOINT}/dropdown`
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

  const getTripById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${TRIP_SINGLE_API_ENDPOINT}/${id}`
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
    console.log(response.data.isExecute, "response");

    if (response.data) {
      return response.data;
    }
  };

  const updateTrip = async (id, trip) => {
    const response = await axiosClient.apiClient(
      "POST",
      `/${TRIPS_API_ENDPOINT}/update/${id}`,
      trip
    );

    console.log(response, "response");

    // if (response?.data.data === true) {
    //   return response.data.isExecute;
    // }
  };

  const markAsCompleted = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${TRIPS_API_ENDPOINT}/${id}`
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const fetchTourDetailsInformation = async (tourId) => {
    const response = await axiosClient.apiClient(
      "POST",
      TRIP_SUMMERY_API_ENDPOINT,
      {
        trip_id: tourId,
      }
    );
    if (response?.data.data) {
      return response.data.data;
    }
    return [];
  };

  const fetchAccountBalanceReport = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      ACCOUNT_BALANCE_API_ENDPOINT
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

  const fetchAccountBalanceHistoryReport = async (type) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${ACCOUNT_HISTORY_API_ENDPOINT}/${type}`
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
      `${ADMIN_BOOKING_API_ENDPOINT}?page=${page}${query}`
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

    const response = await axiosClient.apiClient("POST", PACKAGE_API_ENDPOINT, {
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
    const response = await axiosClient.apiClient(
      "GET",
      `${SINGLE_PACKAGE_DETAILS}/${id}`
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

  const addPackage = async (packageData) => {
    const response = await axiosClient.apiClient(
      "POST",
      `${PACKAGE_API_ENDPOINT}/create`,
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
      `${REFUND_API_ENDPOINT}?page=${page}${query}`
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

  const refundDisbursed = async (refundId) => {
    try {
      const response = await axiosClient.apiClient(
        "POST",
        REFUND_DISBURSED_API_ENDPOINT,
        { refund_id: refundId }
      );

      if (response && response?.data) {
        return response.data;
      }
      return { message: response.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const vehicleTrackingReport = async () => {
    try {
      const response = await axiosClient.apiClient(
        "POST",
        VEHICLE_API_ENDPOINT,
        {}
      );

      if (response.data.data.data.length > 0) {
        return response.data.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGuideDropDown = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      `${GUIDE_API_ENDPOINT}/dropdown`
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

  const fetchBookingInvoiceByBookingId = async (bookingId) => {
    const response = await axiosClient.apiClient(
      "POST",
      ADMIN_BOOKING_INVOICE_API_ENDPOINT,
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

  const fetchGuideInformation = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${GUIDE_API_ENDPOINT}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const addGuide = async (guide) => {
    const response = await axiosClient.apiClient(
      "POST",
      GUIDE_API_ENDPOINT,
      guide
    );
    console.log(response.data.status, "res");
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const getGuideById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${GUIDE_API_ENDPOINT}/${id}`
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

  const updateGuide = async (guide) => {
    const response = await axiosClient.apiClient(
      "POST",
      `/${GUIDE_API_ENDPOINT}/update`,
      guide
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const tripPerformanceReport = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${TRIP_PERFORMANCE}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const packagePerformanceReport = async (page, search) => {
    try {
      console.log("hitted");

      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${PACKAGE_PERFORMANCE}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const customerValueReport = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${CUSTOMER_VALUE_REPORT}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const financialReport = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${FINANCIAL_REPORT}?page=${page}${query}`
      );
      if (response) {
        if (response && response?.data && response?.data?.data) {
          return response;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const monthlyRunningBalance = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${MONTH_RUNNING_BALANCE}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHotelInformation = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${HOTEL_API_ENDPOINT}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHotelCheckIn = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${HOTEL_API_ENDPOINT}/checkin?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const markAsCheckInOrOut = async (hotel_booking_id, status) => {
    const response = await axiosClient.apiClient(
      "POST",
      `hotel/update/checkin`,
      { hotel_booking_id: hotel_booking_id, status: status }
    );

    if (response && response.data && response?.data.isExecute === true) {
      return response.data.isExecute;
    }
  };

  const addHotel = async (guide) => {
    const response = await axiosClient.apiClient(
      "POST",
      HOTEL_API_ENDPOINT,
      guide
    );
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const getHotelById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${USER_HOTEL_API_ENDPOINT}/${id}`
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

  const updateHotel = async (id, data) => {
    const response = await axiosClient.apiClient(
      "POST",
      `/${HOTEL_API_ENDPOINT}/update/${id}`,
      data
    );

    if (response && response?.data && response?.data?.isExecute === true) {
      return response.data.isExecute;
    }
  };

  const fetchGuidePackages = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "POST",
        `guide/myAssignPackage?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGuidePackagesCosting = async (packageId, page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "POST",
        `guide/costingByPackageList?page=${page}${query}`,
        { package_id: packageId }
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getPackageCosting = async (costId) => {
    try {
      const response = await axiosClient.apiClient(
        "POST",
        `admin/guide/costingbypackage/${costId}`
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const addPackageCostingByPackage = async (data) => {
    const response = await axiosClient.apiClient(
      "POST",
      "admin/guide/costingbypackage",
      data
    );
    console.log(response.data.status, "res");
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const updatePackageCostingByPackage = async (data) => {
    const response = await axiosClient.apiClient(
      "POST",
      "admin/guide/costingbypackage/update",
      data
    );
    console.log(response.data.status, "res");
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const fetchGuideFeedBack = async (page, search, payload) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";
      console.log(payload, "payload");

      const response = await axiosClient.apiClient(
        "POST",
        `guide/myFeedBackByPackage?page=${page}${query}`,
        { package_id: payload }
      );
      if (response) {
        if (response?.data) {
          return response.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTickets = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${TICKET_API_ENDPOINT}?page=${page}${query}`
      );
      if (response) {
        if (response?.data) {
          return response.data.data;
        }
      } else {
        return { message: response.message, data: [] };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    const response = await axiosClient.apiClient(
      "POST",
      `admin/tickets/update/${ticketId}`,
      { status: status }
    );


    if (response && response.data && response.data.data && response.data.data.status === true) {
      return response.data.data;
    }
  };

  return {
    getLocalStorageValue,
    login,
    dashboardInformation,
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
    monthlyRunningBalance,
    fetchBookings,
    markAsCompleted,
    fetchPackages,
    fetchPackageDetails,
    addPackage,
    vehicleTrackingReport,
    fetchRefunds,
    refundDisbursed,
    fetchGuideDropDown,
    fetchBookingInvoiceByBookingId,
    fetchGuideInformation,
    addGuide,
    getGuideById,
    updateGuide,
    tripPerformanceReport,
    packagePerformanceReport,
    customerValueReport,
    financialReport,
    fetchHotelInformation,
    fetchHotelCheckIn,
    markAsCheckInOrOut,
    addHotel,
    getHotelById,
    updateHotel,
    fetchGuidePackages,
    fetchGuideFeedBack,
    fetchGuidePackagesCosting,
    addPackageCostingByPackage,
    updatePackageCostingByPackage,
    getPackageCosting,
    fetchTickets,
    updateTicketStatus,
  };
};

export default useApi;
