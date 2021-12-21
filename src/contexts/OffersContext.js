import axios from 'axios';
import useArray from 'hooks/useArray';
import useToggle from 'hooks/useToggle';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch, API_BASE_URL } from 'utils/makeReq';
import { AuthContext, LOCALSTORAGE_TOKEN_KEY } from './AuthContext';

export const OffersContext = React.createContext();

export const OffersProvider = ({ children }) => {
  // let history = useHistory();
  const { user } = useContext(AuthContext);

  const [loading, toggleLoading] = useToggle(true);
  const [
    offers,
    setOffers,
    pushOffer,
    filterOffers,
    updateOffers,
    removeOffers,
    clearOffers,
  ] = useArray([], '_id');

  const fetchOffers = async () => {
    try {
      const res = await makeReq(`/offers/me`);
      console.log(`res`, res);
      setOffers(res.data.offers);
    } catch (err) {
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    if (!user) return;

    // * Fetch user's Dev requests if he logged in
    fetchOffers();
  }, [user]);

  const getOfferById = (id) => {
    console.log(`offers`, offers);
    return offers?.find((el) => el._id === id);
  };

  // * CRUD Operations
  const createOffer = async (devRequestId, request, callBack) => {
    try {
      const resData = await makeReq(
        `/devRequests/${devRequestId}/offers`,
        {
          body: { ...request },
        },
        'POST'
      );

      console.log(`resData`, resData);
      callBack?.();
    } catch (err) {
      handleCatch(err);
    } finally {
    }
  };

  return (
    <OffersContext.Provider
      displayName='Offers Context'
      value={{
        offers,
        loading,
        createOffer,
        getOfferById,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
