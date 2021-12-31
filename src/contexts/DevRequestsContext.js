import axios from 'axios';
import useArray from 'hooks/useArray';
import useToggle from 'hooks/useToggle';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch, API_BASE_URL } from 'utils/makeReq';
import { AuthContext, LOCALSTORAGE_TOKEN_KEY } from './AuthContext';

export const DevRequestsContext = React.createContext();

export const DevRequestsProvider = ({ children }) => {
  // let history = useHistory();
  const { user } = useContext(AuthContext);

  const [loadingRequests, toggleLoadingReqs] = useToggle(true);
  const [loadingMyRequests, toggleLoadingMyReqs] = useToggle(true);
  const [devRequests, setDevRequests] = useState([]);

  const [
    myDevRequests,
    setMyDevRequests,
    pushMyDevRequest,
    filterMyDevRequests,
    updateMyDevRequests,
    removeMyDevRequests,
    clearMyDevRequests,
  ] = useArray([], '_id');

  const fetchMyDevRequests = async () => {
    try {
      const resData = await makeReq(`/devRequests/me`);
      console.log(`resData`, resData);
      setMyDevRequests(resData.devRequests);
    } catch (err) {
    } finally {
      toggleLoadingReqs();
    }
  };
  const fetchDevRequests = async () => {
    try {
      const resData = await makeReq(`/devRequests`);
      console.log(`resData`, resData);
      setDevRequests(resData.devRequests);
    } catch (err) {
    } finally {
      toggleLoadingMyReqs();
    }
  };

  useEffect(() => {
    fetchDevRequests();
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchMyDevRequests();
    // * Fetch user's Dev requests if he logged in
  }, [user]);

  const getRequestById = (id) => {
    console.log(`devRequests`, devRequests);
    return devRequests?.find((el) => el._id === id);
  };

  // * CRUD Operations
  const createDevRequest = async (request, successCallback, errorCallBack) => {
    // * For Image, we have to send body as FormData
    let formData = new FormData();

    // * Object foreach -Copied from mozilla docs
    for (const [key, value] of Object.entries(request)) {
      console.log(`${key}: ${value}`);
      formData.append(key, value);
    }

    console.log(`formData.get(category)`, formData.get('category'));

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    fetch(`${API_BASE_URL}/devRequests`, {
      body: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)}`,
      },
    }).then(async (res) => {
      console.log(`res`, res);
      const resData = await res.json();
      if (res.ok) {
        pushMyDevRequest(resData.devRequest);
        successCallback?.();
      } else {
        handleCatch(resData);
        errorCallBack?.();
      }
      // callBack?.();
    });
  };

  return (
    <DevRequestsContext.Provider
      displayName='DevRequests Context'
      value={{
        myDevRequests,
        loadingMyRequests,
        createDevRequest,
        getRequestById,
      }}
    >
      {children}
    </DevRequestsContext.Provider>
  );
};
