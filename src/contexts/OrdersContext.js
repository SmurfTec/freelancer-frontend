import axios from 'axios';
import useArray from 'hooks/useArray';
import useToggle from 'hooks/useToggle';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch, API_BASE_URL } from 'utils/makeReq';
import { AuthContext } from './AuthContext';

export const OrdersContext = React.createContext();

export const OrdersProvider = ({ children }) => {
  // let history = useHistory();
  const { user } = useContext(AuthContext);

  const [
    orders,
    setOrders,
    pushOrder,
    filterOrders,
    updateOrder,
    removeOrder,
    clearAllOrders,
  ] = useArray([], '_id');

  const [loading, toggleLoading] = useToggle(false);

  const fetchOrders = async () => {
    toggleLoading();

    try {
      const resData = await makeReq(`/orders/me`);
      // console.log(`resData`, resData);
      setOrders(resData.orders);
    } catch (err) {
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const getOrderById = (id) => {
    console.log(`orders`, orders);
    return orders?.find((el) => el._id === id);
  };

  const submitOrder = async (orderId, url, callBack) => {
    try {
      const resData = await makeReq(
        `/orders/deliverorder/${orderId}`,
        {
          body: { submission: url },
        },
        'PATCH'
      );
      callBack?.();
      updateOrder(orderId, resData.order);
    } catch (err) {
    } finally {
    }
  };

  const manageOrder = async (orderId, status, review, callBack) => {
    try {
      const resData = await makeReq(
        `/orders/manageorder/${orderId}`,
        {
          body: {
            status: status,
            rating: review?.rating,
            review: review?.review,
          },
        },
        'PATCH'
      );
      callBack?.();
      updateOrder(orderId, resData.order);
    } catch (err) {
    } finally {
    }
  };

  return (
    <OrdersContext.Provider
      displayName='Orders Context'
      value={{
        orders,
        getOrderById,
        loading,
        submitOrder,
        manageOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
