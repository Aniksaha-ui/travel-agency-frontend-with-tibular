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
  VISA_COUNTRY_API_ENDPOINT,
  VISA_COUNTRY_DROPDOWN_API_ENDPOINT,
  VISA_TYPES_API_ENDPOINT,
  HOTEL_API_ENDPOINT,
  LOGIN_API_ENDPOINT,
  MONITORING_API_ENDPOINT,
  MONTH_RUNNING_BALANCE,
  PACKAGE_API_ENDPOINT,
  PACKAGE_PERFORMANCE,
  PACKAGE_SUMMARY_ENDPOINT,
  REFUND_API_ENDPOINT,
  REFUND_DISBURSED_API_ENDPOINT,
  ROUTES_API_ENDPOINT,
  ROUTES_DROPDOWN_API_ENDPOINT,
  SEATS_API_ENDPOINT,
  SINGLE_PACKAGE_DETAILS,
  TICKET_API_ENDPOINT,
  TRANSACTION_API_ENDPOINT,
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
  MENU_API_ENDPOINT,
  MENU_ITEMS_API_ENDPOINT,
  TRIPWISE_BOOKING_USERS_API_ENDPOINT,
  ACCOUNT_HISTORY_SEARCH_API_ENDPOINT,
  MONTHLY_DAILY_BALANCE_REPORT,
  MONTHLY_DAILY_BALANCE_REPORTS,
  OVERALL_SALES_REPORT,
  ROUTE_WISE_SALES_REPORT,
  TICKET_STATUS_REPORT,
  LOW_OCCUPANCY_TRIP_REPORT,
  BLOG_API_ENDPOINT,
  USER_GROWTH_REPORT,
  REFUND_STATUS_REPORT,
  AVERAGE_BOOKING_VALUE_REPORT,
  LOW_PERFORMING_PACKAGES_REPORT,
  HIGH_CANCELLATION_PACKAGES_REPORT,
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

  const monitoring = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        `${MONITORING_API_ENDPOINT}`,
      );
      console.log(response);

      if (
        response &&
        response?.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data;
      } else {
        return { message: response.message, data: [] };
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  const login = async (data) => {
    const response = await axiosClient.apiClient(
      "POST",
      LOGIN_API_ENDPOINT,
      data,
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
      `${ROUTES_API_ENDPOINT}?page=${page}${query}`,
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
      ROUTES_DROPDOWN_API_ENDPOINT,
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
      route,
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
      `${ROUTES_API_ENDPOINT}/${id}`,
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
      `${USER_API_ENDPOINT}?page=${page}${query}`,
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
      `${VEHICLES_API_ENDPOINT}?page=${page}${query}`,
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
      VEHICLES_DROPDOWN_API_ENDPOINT,
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
      route,
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const deleteVehicle = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${VEHICLES_API_ENDPOINT}/${id}`,
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
      `${SEATS_API_ENDPOINT}?page=${page}${query}`,
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
      seat,
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const deleteSeat = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${SEATS_API_ENDPOINT}/${id}`,
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
      `${VEHICLE_WISE_TOTAL_SEAT_REPORT_API_ENDPOINT}?page=${page}${query}`,
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
      `${VEHICLE_WISE_SEAT_API_ENDPOINT}/${id}`,
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
      trip,
    );
    return response;
  };

  /**************************************Report Api*********************************/

  /**************************************Trips Api *********************************/

  const fetchTrips = async (page = "", search = "") => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `${TRIPS_API_ENDPOINT}?page=${page}${query}`,
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
      `${TRIPS_API_ENDPOINT}/dropdown`,
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
      `${TRIP_SINGLE_API_ENDPOINT}/${id}`,
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
      trip,
    );

    console.log(response, "response");

    // if (response?.data.data === true) {
    //   return response.data.isExecute;
    // }
  };

  const markAsCompleted = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${TRIPS_API_ENDPOINT}/${id}`,
    );
    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const fetchTripUsers = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${TRIPWISE_BOOKING_USERS_API_ENDPOINT}/${id}`,
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

  const fetchTourDetailsInformation = async (tourId) => {
    const response = await axiosClient.apiClient(
      "POST",
      TRIP_SUMMERY_API_ENDPOINT,
      {
        trip_id: tourId,
      },
    );
    if (response?.data.data) {
      return response.data.data;
    }
    return [];
  };

  const fetchAccountBalanceReport = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      ACCOUNT_BALANCE_API_ENDPOINT,
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
      `${ACCOUNT_HISTORY_API_ENDPOINT}/${type}`,
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

  const accountHistorySearch = async ({ page, start_date, end_date }) => {
    try {
      const response = await axiosClient.apiClient(
        "POST",
        `${ACCOUNT_HISTORY_SEARCH_API_ENDPOINT}?page=${page}`,
        { start_date, end_date },
      );
      if (response && response.data && response.data.isExecute === "SUCCESS") {
        return response.data;
      }
      return { message: response.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchBookings = async (page = "", search = "") => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `${ADMIN_BOOKING_API_ENDPOINT}?page=${page}${query}`,
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
      `${SINGLE_PACKAGE_DETAILS}/${id}`,
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
      packageData,
    );

    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  const fetchRefunds = async (page, search) => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await axiosClient.apiClient(
      "GET",
      `${REFUND_API_ENDPOINT}?page=${page}${query}`,
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
        { refund_id: refundId },
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
        {},
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
      `${GUIDE_API_ENDPOINT}/dropdown`,
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
      },
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
        `${GUIDE_API_ENDPOINT}?page=${page}${query}`,
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

  const fetchVisaCountries = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${VISA_COUNTRY_API_ENDPOINT}?page=${page}${query}`,
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
      guide,
    );
    console.log(response.data.status, "res");
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const getGuideById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${GUIDE_API_ENDPOINT}/${id}`,
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

  const addVisaCountry = async (country) => {
    const response = await axiosClient.apiClient(
      "POST",
      VISA_COUNTRY_API_ENDPOINT,
      country,
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    }
    return null;
  };

  const getVisaCountryById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${VISA_COUNTRY_API_ENDPOINT}/${id}`,
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

  const updateVisaCountry = async (id, country) => {
    const response = await axiosClient.apiClient(
      "POST",
      `${VISA_COUNTRY_API_ENDPOINT}/update/${id}`,
      country,
    );
    if (response?.data) {
      return response.data;
    }
    return null;
  };

  const fetchVisaTypes = async (page, search, countryId) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";
      const countryQuery = countryId ? `&country_id=${countryId}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${VISA_TYPES_API_ENDPOINT}?page=${page}${query}${countryQuery}`,
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

  const addVisaType = async (visaType) => {
    const response = await axiosClient.apiClient(
      "POST",
      VISA_TYPES_API_ENDPOINT,
      visaType,
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    }
    return null;
  };

  const getVisaTypeById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${VISA_TYPES_API_ENDPOINT}/${id}`,
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

  const updateVisaType = async (id, visaType) => {
    const response = await axiosClient.apiClient(
      "POST",
      `${VISA_TYPES_API_ENDPOINT}/update/${id}`,
      visaType,
    );
    if (response?.data) {
      return response.data;
    }
    return null;
  };

  const fetchVisaCountriesDropdown = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        `${VISA_COUNTRY_DROPDOWN_API_ENDPOINT}?active_only=1`,
      );
      if (response?.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateGuide = async (guide) => {
    const response = await axiosClient.apiClient(
      "POST",
      `/${GUIDE_API_ENDPOINT}/update`,
      guide,
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
        `${TRIP_PERFORMANCE}?page=${page}${query}`,
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
        `${PACKAGE_PERFORMANCE}?page=${page}${query}`,
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
        `${CUSTOMER_VALUE_REPORT}?page=${page}${query}`,
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

  const fetchUserGrowthReport = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        `${USER_GROWTH_REPORT}`,
      );
      if (
        response &&
        response.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data;
      } else {
        return { message: response.data.message, data: [] };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchRefundStatusReport = async () => {
    try {
      const response = await axiosClient.apiClient("GET", REFUND_STATUS_REPORT);
      if (
        response &&
        response.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data;
      }
      return { message: response.data.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchAvgBookingValueReport = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        AVERAGE_BOOKING_VALUE_REPORT,
      );
      if (
        response &&
        response.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data;
      }
      return { message: response.data.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchLowPerformingPackagesReport = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        LOW_PERFORMING_PACKAGES_REPORT,
      );
      if (
        response &&
        response.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data;
      }
      return { message: response.data.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchHighCancellationPackagesReport = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        HIGH_CANCELLATION_PACKAGES_REPORT,
      );
      if (
        response &&
        response.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data;
      }
      return { message: response.data.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const financialReport = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";

      const response = await axiosClient.apiClient(
        "GET",
        `${FINANCIAL_REPORT}?page=${page}${query}`,
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
        `${MONTH_RUNNING_BALANCE}?page=${page}${query}`,
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
        `${HOTEL_API_ENDPOINT}?page=${page}${query}`,
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
        `${HOTEL_API_ENDPOINT}/checkin?page=${page}${query}`,
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

  const fetchMenu = async () => {
    try {
      const response = await axiosClient.apiClient("GET", MENU_API_ENDPOINT);
      if (
        response &&
        response.data &&
        response.data.isExecute === API_SUCCESS
      ) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const markAsCheckInOrOut = async (hotel_booking_id, status) => {
    const response = await axiosClient.apiClient(
      "POST",
      `hotel/update/checkin`,
      { hotel_booking_id: hotel_booking_id, status: status },
    );

    if (response && response.data && response?.data.isExecute === true) {
      return response.data.isExecute;
    }
  };

  const addHotel = async (guide) => {
    const response = await axiosClient.apiClient(
      "POST",
      HOTEL_API_ENDPOINT,
      guide,
    );
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const getHotelById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${USER_HOTEL_API_ENDPOINT}/${id}`,
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
      data,
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
        `guide/myAssignPackage?page=${page}${query}`,
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
        { package_id: packageId },
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
        `admin/guide/costingbypackage/${costId}`,
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
      data,
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
      data,
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
        { package_id: payload },
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
        `${TICKET_API_ENDPOINT}?page=${page}${query}`,
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

  const updateTicketStatus = async (
    ticketId,
    status,
    resolved_status,
    resolved_remarks = null,
  ) => {
    const response = await axiosClient.apiClient(
      "POST",
      `admin/tickets/update/${ticketId}`,
      {
        status: status,
        resolved_status: resolved_status,
        resolved_remarks: resolved_remarks,
      },
    );

    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.status === true
    ) {
      return response.data.data;
    }
  };

  const fetchTransactions = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";
      const response = await axiosClient.apiClient(
        "GET",
        `${TRANSACTION_API_ENDPOINT}?page=${page}${query}`,
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

  const packageSummary = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";
      const response = await axiosClient.apiClient(
        "GET",
        `${PACKAGE_SUMMARY_ENDPOINT}?page=${page}${query}`,
      );
      if (response && response.data) {
        return response.data;
      }
      return { message: response.message, data: [] };
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOnlinePaymentConfig = async (page, search) => {
    try {
      const query = search ? `&search=${encodeURIComponent(search)}` : "";
      const response = await axiosClient.apiClient(
        "GET",
        `admin/online-configure?page=${page}${query}`,
      );
      if (response && response.data) {
        return response.data;
      } else {
        return { message: response.message, data: [] };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addConfigure = async (configure) => {
    const response = await axiosClient.apiClient(
      "POST",
      "admin/online-configure",
      configure,
    );
    console.log(response.data.status, "res");
    if (response.data.status === true) {
      return response.data.status;
    }
  };

  const getConfigureById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `admin/online-configure/${id}`,
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

  const updateConfigure = async (config) => {
    const response = await axiosClient.apiClient(
      "POST",
      `admin/online-configure/update`,
      config,
    );
    console.log(response);

    if (response?.data.data === true) {
      return response.data.isExecute;
    }
  };

  /***************************************Menu API*********************************/
  /***************************************Menu API*********************************/
  const fetchMenuItems = async (page = "", search = "") => {
    const query = search
      ? `?search=${encodeURIComponent(search)}&page=${page}`
      : `?page=${page}`;
    const response = await axiosClient.apiClient(
      "GET",
      `${MENU_ITEMS_API_ENDPOINT}${query}`,
    );
    return response.data;
  };

  const addMenuItem = async (menuItem) => {
    const response = await axiosClient.apiClient(
      "POST",
      MENU_ITEMS_API_ENDPOINT,
      menuItem,
    );
    return response?.data;
  };

  const getMenuItemById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${MENU_ITEMS_API_ENDPOINT}/${id}`,
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

  const updateMenuItem = async (id, menuItem) => {
    const response = await axiosClient.apiClient(
      "POST",
      `${MENU_ITEMS_API_ENDPOINT}/update/${id}`,
      menuItem,
    );
    return response?.data;
  };

  const deleteMenuItem = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${MENU_ITEMS_API_ENDPOINT}/${id}`,
    );
    return response?.data;
  };
  /***************************************Menu API*********************************/

  const fetchMonthlyDailyBalanceReport = async (page = 1) => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        `${MONTHLY_DAILY_BALANCE_REPORT}?page=${page}`,
      );
      if (response && response.data && response.data.status === "SUCCESS") {
        return response.data;
      }
      return { message: response.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchMonthlyDailyBalanceReports = async (page = 1) => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        `${MONTHLY_DAILY_BALANCE_REPORTS}?page=${page}`,
      );
      if (response && response.data) {
        // Handle both wrapped and unwrapped (direct pagination) responses
        return response.data;
      }
      return { data: [], total: 0 };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchOverallSalesSummary = async () => {
    try {
      const response = await axiosClient.apiClient("GET", OVERALL_SALES_REPORT);
      if (response && response.data && response.data.isExecute === "SUCCESS") {
        return response.data;
      }
      return { message: response.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchRouteWiseSalesSummary = async () => {
    try {
      const response = await axiosClient.apiClient(
        "GET",
        ROUTE_WISE_SALES_REPORT,
      );
      if (response && response.data && response.data.isExecute === "SUCCESS") {
        return response.data;
      }
      return { message: response.message, data: [] };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchBlogs = async (page = 1, search = "") => {
    const query = search ? `&search=${encodeURIComponent(search)}` : "";
    const response = await axiosClient.apiClient(
      "GET",
      `${BLOG_API_ENDPOINT}?page=${page}${query}`,
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    }
    return null;
  };

  const getBlogById = async (id) => {
    const response = await axiosClient.apiClient(
      "GET",
      `${BLOG_API_ENDPOINT}/${id}`,
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    }
    return null;
  };

  const addBlog = async (data) => {
    const response = await axiosClient.apiClient(
      "POST",
      BLOG_API_ENDPOINT,
      data,
    );
    return response?.data;
  };

  const updateBlog = async (id, data) => {
    const response = await axiosClient.apiClient(
      "POST",
      `${BLOG_API_ENDPOINT}/update/${id}`,
      data,
    );
    return response?.data;
  };

  const deleteBlog = async (id) => {
    const response = await axiosClient.apiClient(
      "DELETE",
      `${BLOG_API_ENDPOINT}/${id}`,
    );
    return response?.data;
  };

  const fetchTicketStatusReport = async () => {
    const response = await axiosClient.apiClient("GET", TICKET_STATUS_REPORT);
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    } else {
      toast(response.data.message);
      return { message: response.message, data: [] };
    }
  };

  const fetchLowOccupancyTripReport = async () => {
    const response = await axiosClient.apiClient(
      "GET",
      LOW_OCCUPANCY_TRIP_REPORT,
    );
    if (response && response.data && response.data.isExecute === API_SUCCESS) {
      return response.data;
    } else {
      toast(response.data.message);
      return { message: response.message, data: [] };
    }
  };

  return {
    getLocalStorageValue,
    login,
    dashboardInformation,
    monitoring,
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
    fetchVisaCountries,
    addGuide,
    addVisaCountry,
    getGuideById,
    getVisaCountryById,
    updateGuide,
    updateVisaCountry,
    fetchVisaTypes,
    addVisaType,
    getVisaTypeById,
    updateVisaType,
    fetchVisaCountriesDropdown,
    tripPerformanceReport,
    packagePerformanceReport,
    customerValueReport,
    fetchUserGrowthReport,
    fetchRefundStatusReport,
    fetchAvgBookingValueReport,
    fetchLowPerformingPackagesReport,
    fetchHighCancellationPackagesReport,
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
    fetchTransactions,
    packageSummary,
    fetchOnlinePaymentConfig,
    addConfigure,
    getConfigureById,
    updateConfigure,
    fetchMenu,
    fetchMenuItems,
    addMenuItem,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    fetchTripUsers,
    accountHistorySearch,
    fetchMonthlyDailyBalanceReport,
    fetchMonthlyDailyBalanceReports,
    fetchOverallSalesSummary,
    fetchRouteWiseSalesSummary,
    fetchTicketStatusReport,
    fetchLowOccupancyTripReport,
    fetchBlogs,
    getBlogById,
    addBlog,
    updateBlog,
    deleteBlog,
  };
};

export default useApi;
