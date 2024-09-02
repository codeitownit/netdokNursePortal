import { useState } from "react";

import AppContext from "./Context";

import LoadingModal from "../Components/Modals/LoadingModal";

import ErrorModal from "../Components/Modals/ErrorModal";

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userPermission, setUserPermission] = useState(null);
  const [token, setToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingTxt, setLoadingTxt] = useState("... Loading");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("...Error");
  const [showErrorTimeout, setShowErrorTimeout] = useState(3000);
  const [open, setOpen] = useState(true);

    const toggleOpen = () => {
        setOpen(prevOpen => !prevOpen);
    };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  }

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        user,
        setUser,
        userPermission,
        setUserPermission,
        token,
        setToken,
        isLoading,
        setIsLoading,
        loadingTxt,
        setLoadingTxt,
        showErrorModal,
        setShowErrorModal,
        showErrorTimeout,
        setShowErrorTimeout,
        errorMessage,
        setErrorMessage,
        setOpen,
        toggleOpen,
        open
      }}
    >
      {children}

  <LoadingModal showModal={isLoading} loadingText={loadingTxt} />
  <ErrorModal
    showErrorModal={showErrorModal}
    setShowErrorModal={setShowErrorModal}
    modal_message={errorMessage}
    t={showErrorTimeout}
  />
</AppContext.Provider>
  );
}

export default AppProvider;
