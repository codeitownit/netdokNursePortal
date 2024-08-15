import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import AppContext from "../Provider/Context";

const BASEURL = "https://firebasedata.herokuapp.com/api/v1";

function useaxios() {
  const {
    // setUser,
    token,
    setToken,
    setIsLoading,
    setLoadingTxt,
    setErrorMessage,
    setShowErrorTimeout,
    setShowErrorModal,
  } = useContext(AppContext);
  const navigate = useNavigate();


  const request = async ({
    method = "GET",
    url = "",
    headers = {},
    data = {},
    params = {},
    auth = true, //remember to set it to true post development
    showLoader = true,
    showError = true,
  }) => {
    try {
      if (showLoader) {
        setLoadingTxt(" ...Loading");
        setIsLoading(true);
      }

      const newHeaders = {};

      if (auth) {
        if (!token) {
          // navigate("/")

          return;
        }

        newHeaders["Authorization"] = `Bearer ${token}`;
      }

      const res = await axios({
        method,
        url: `${BASEURL}/${url}`,
        headers: { ...newHeaders, ...headers },
        data: data,
        params,
      });

      return res.data;
    } catch (e) {
      if (!showError) {
        return "error";
      }

      if (e.message === "Network Error") {
        setErrorMessage("Check your internet connection");
        setShowErrorTimeout(30000);
        setShowErrorModal(true);
        return "error";
      }

      if (e.response.status.toString() === "401") {
        navigate("/");
        setErrorMessage("Unauthorized !!");
        setShowErrorTimeout(5000);
        setShowErrorModal(true);
        return "error";
      }

      if (e.response.status.toString() === "400") {
        setErrorMessage(
          e?.response?.data?.message || "Huh .. this is embarasing try again"
        );
        setShowErrorTimeout(30000);
        setShowErrorModal(true);
        return "error";
      }

      if (e.response.status.toString() === "500") {
        setErrorMessage("Contact system admin.");
        setShowErrorTimeout(30000);
        setShowErrorModal(true);
        return "error";
      }

      setErrorMessage("Try Again.");
      setShowErrorTimeout(30000);
      setShowErrorModal(true);

      return "error";
    } finally {
      if (showLoader) {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    }
  };

  return request;
}

export default useaxios;
