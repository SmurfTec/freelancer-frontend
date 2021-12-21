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

  const [loading, toggleLoading] = useToggle(true);
  const [
    devRequests,
    setDevRequests,
    pushDevRequest,
    filterDevRequests,
    updateDevRequests,
    removeDevRequests,
    clearDevRequests,
  ] = useArray([], '_id');

  const fetchDevRequests = async () => {
    try {
      const res = await makeReq(`/devRequests/me`);
      console.log(`res`, res);
      setDevRequests(res.data.devRequests);
    } catch (err) {
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    if (!user) return;

    // * Fetch user's Dev requests if he logged in
    fetchDevRequests();
  }, [user]);

  const getRequestById = (id) => {
    console.log(`devRequests`, devRequests);
    return devRequests?.find((el) => el._id === id);
  };

  // * CRUD Operations
  const createDevRequest = async (request, callBack) => {
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
        pushDevRequest(resData.devRequest);
        callBack?.();
      } else {
        handleCatch(resData);
      }
      // callBack?.();
    });
  };

  return (
    <DevRequestsContext.Provider
      displayName='DevRequests Context'
      value={{
        devRequests,
        loading,
        createDevRequest,
        getRequestById,
      }}
    >
      {children}
    </DevRequestsContext.Provider>
  );
};
