import axios from "axios";
import {
  BAD_REQUEST_ERROR,
  LOGIN_ERROR,
  NETWORK_ERROR,
} from "../Utils/Constants/Error";
import { Logout } from "../Utils/Functions/common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate();
  const axiosConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
  };
  const api = axios.create(axiosConfig);

  api.interceptors.request.use((axiosConfig) => {
    return axiosConfig;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**declear headers */

  const apiClient = (method, url, body) => {
    const headers = {
      authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
    };
    return api
      .request({ method, url, data: body, headers })
      .then((response) => {
        return response || null;
      })
      .catch((error) => {
        console.log(`${error}`);

      const { status, data } = error.response;
        if (status === 422 || status === 400) {
          toast(data?.message || "Please give valid input");
          return null;
        }
        if (error.message === NETWORK_ERROR) {
          console.log(error);
        } else if (error.message === LOGIN_ERROR) {
          toast("Protected page.Please login with valid user");
          Logout();
          navigate("/login");
        } else if (error.message === BAD_REQUEST_ERROR) {
          toast(error.message ?? "Please give the valid input");
          Logout();
          navigate("/login");
        } else {
          toast(error.message);
        }
        return null;
      });
  };

  return { apiClient };
};

export default useAxios;
