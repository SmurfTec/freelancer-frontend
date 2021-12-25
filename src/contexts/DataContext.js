import axios from 'axios';
import useToggle from 'hooks/useToggle';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch, API_BASE_URL } from 'utils/makeReq';
// import { AuthContext } from './AuthContext';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  // let history = useHistory();
  // const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);

  const [loadingDevRequests, toggleLoadingDevRequests] = useToggle(true);
  const [devRequests, setDevRequests] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_BASE_URL}/categories`);
    // console.log(`res`, res);
    setCategories(res.data.categories);
  };

  const fetchDevRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/devRequests`);
      // console.log(`res`, res);
      setDevRequests(res.data.devRequests);
    } catch (err) {
    } finally {
      toggleLoadingDevRequests();
    }
  };

  const getRequestById = (id) => {
    console.log(`devRequests`, devRequests);
    return devRequests?.find((el) => el._id === id);
  };

  useEffect(() => {
    fetchDevRequests();
    fetchCategories();
  }, []);

  return (
    <DataContext.Provider
      displayName='Data Context'
      value={{
        categories,
        getRequestById,
        loadingDevRequests,
        devRequests,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
