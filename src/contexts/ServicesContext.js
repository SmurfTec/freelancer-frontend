import axios from 'axios';
import useArray from 'hooks/useArray';
import useToggle from 'hooks/useToggle';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch, API_BASE_URL } from 'utils/makeReq';
import { AuthContext, LOCALSTORAGE_TOKEN_KEY } from './AuthContext';

export const GigsContext = React.createContext();

export const GigsProvider = ({ children }) => {
  // let history = useHistory();
  const { user } = useContext(AuthContext);

  const [loadingGigs, toggleLoadingReqs] = useToggle(true);
  const [loadingGigs, toggleLoadingMyReqs] = useToggle(true);
  const [Gigs, setGigs] = useState([]);

  const fetchMyGigs = async () => {
    try {
      const resData = await makeReq(`/Gigs/me`);
      console.log(`resData`, resData);
      setMyGigs(resData.Gigs);
    } catch (err) {
    } finally {
      toggleLoadingReqs();
    }
  };
  const fetchGigs = async () => {
    try {
      const resData = await makeReq(`/Gigs`);
      console.log(`resData`, resData);
      setGigs(resData.Gigs);
    } catch (err) {
    } finally {
      toggleLoadingMyReqs();
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchMyGigs();
    // * Fetch user's Dev Gigs if he logged in
  }, [user]);

  const getGigById = (id) => {
    console.log(`Gigs`, Gigs);
    return Gigs?.find((el) => el._id === id);
  };

  // * CRUD Operations
  const createGig = async (Gig, callBack) => {
    // * For Image, we have to send body as FormData
    let formData = new FormData();

    // * Object foreach -Copied from mozilla docs
    for (const [key, value] of Object.entries(Gig)) {
      console.log(`${key}: ${value}`);
      formData.append(key, value);
    }

    console.log(`formData.get(category)`, formData.get('category'));

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    fetch(`${API_BASE_URL}/Gigs`, {
      body: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)}`,
      },
    }).then(async (res) => {
      console.log(`res`, res);
      const resData = await res.json();
      if (res.ok) {
        pushMyGig(resData.Gig);
        callBack?.();
      } else {
        handleCatch(resData);
      }
      // callBack?.();
    });
  };

  return (
    <GigsContext.Provider
      displayName='Gigs Context'
      value={{
        myGigs,
        loadingGigs,
        createGig,
        getGigById,
      }}
    >
      {children}
    </GigsContext.Provider>
  );
};
