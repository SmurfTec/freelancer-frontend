import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch, API_BASE_URL } from 'utils/makeReq';
// import { AuthContext } from './AuthContext';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  // let history = useHistory();
  // const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_BASE_URL}/categories`);
    console.log(`res`, res);
    setCategories(res.data.categories);
  };

  const fetchSubCategories = async () => {
    const res = await axios.get(`${API_BASE_URL}/subcategories`);
    console.log(`res`, res);
    setCategories(res.data.subCategories);
  };

  useEffect(() => {
    fetchCategories();
    // fetchSubCategories();
  }, []);

  return (
    <DataContext.Provider
      displayName='Data Context'
      value={{
        categories,
        subCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
