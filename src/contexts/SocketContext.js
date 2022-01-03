import { createContext, useContext, useEffect, useState } from 'react';

import socketIo from 'socket.io-client';
import { API_BASE_ORIGIN, makeReq } from 'utils/makeReq';
import { v4 } from 'uuid';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
  const { user, token } = useContext(AuthContext);

  const [loadingChatId, setLoadingChatId] = useState(null);

  const [chats, setChats] = useState([]);

  //* socket connection
  useEffect(() => {
    // socket = socketIo.connect('https://mern-chats-project.herokuapp.com', {
    const newSocket = socketIo.connect(API_BASE_ORIGIN, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
    if (!newSocket) return;
    newSocket.on('connect', () => {
      console.log(`Hurrah Socket ${newSocket.id} Connected`);
    });
  }, []);

  const fetchMyChats = async () => {
    const resData = await makeReq(`/chats/me`);

    setChats(resData.chats);
  };

  useEffect(() => {
    if (token && user) fetchMyChats();
  }, [token, user]);

  useEffect(() => {
    if (!socket) return;
    if (!user) return;

    socket.on('newMessage', ({ chatId, message, receiver }) => {
      console.log(`newMessage received :`, message);
      console.log(`chatId :`, chatId);
      console.log(`receiver :`, receiver);
      console.log(`user._id)`, user._id);
      // * Push New Message to that chats
      if (message.sender._id === user._id) {
        setLoadingChatId(false);
      }
      if (message.isOffer) {
        setChats((st) =>
          st.map((el) => {
            console.log(`el._id === chatId`, el._id === chatId);
            console.log(`{ ...el, messages: [...el.messages, message] }`, {
              ...el,
              messages: [...el.messages, message],
            });
            return el._id === chatId
              ? { ...el, messages: [...el.messages, message] }
              : el;
          })
        );
      } else if (receiver === user._id)
        setChats((st) =>
          st.map((el) => {
            console.log(`el._id === chatId`, el._id === chatId);
            console.log(`{ ...el, messages: [...el.messages, message] }`, {
              ...el,
              messages: [...el.messages, message],
            });
            return el._id === chatId
              ? { ...el, messages: [...el.messages, message] }
              : el;
          })
        );
    });

    // * Only for updatation of agreement/offer message
    socket.on('updatedMessage', ({ chatId, message, receiver }) => {
      console.log(`updatedMessage received :`, message);
      console.log(`chatId :`, chatId);
      console.log(`receiver :`, receiver);
      console.log(`user._id)`, user._id);
      // * Update Message in chats
      setChats((st) =>
        st.map((el) => {
          console.log(`el._id === chatId`, el._id === chatId);
          console.log(`{ ...el, messages: [...el.messages, message] }`, {
            ...el,
            messages: el.messages.map((msg) =>
              msg._id === message._id ? message : msg
            ),
          });
          return el._id === chatId
            ? {
                ...el,
                messages: el.messages.map((msg) =>
                  msg._id === message._id ? message : msg
                ),
              }
            : el;
        })
      );
    });
  }, [socket, user]);

  const addNewChat = (data) => {
    setChats((el) => [...el, data]);
  };

  const sendNewMessage = (text, chatId) => {
    // console.log(`text`, text);
    // console.log(`chatId`, chatId);
    console.log('emitting newMessage with', {
      text: text,
      token: token,
      chatId,
    });
    socket.emit('newMessage', { text: text, token: token, chatId });

    setChats((st) =>
      st.map((el) =>
        el._id === chatId
          ? {
              ...el,
              messages: [
                ...el.messages,
                {
                  text: text,
                  _id: v4(),
                  sender: user,
                  createdAt: new Date(),
                },
              ],
            }
          : el
      )
    );
  };

  const updateOfferMessage = (
    offer,
    chatId,
    userId,
    status,
    messageId,
    gameId
  ) => {
    // console.log(`text`, text);
    console.log(`chatId`, chatId);
    console.log(`offer`, offer);
    console.log(`userId`, userId);
    console.log(`status`, status);

    setChats((st) =>
      st.map((el) => {
        console.log(`{ ...el, messages: [...el.messages, message] }`, {
          ...el,
          messages: el.messages.map((msg) =>
            msg._id === messageId ? { ...msg, status: status } : msg
          ),
        });
        return el._id === chatId
          ? {
              ...el,
              messages: el.messages.map((msg) =>
                msg._id === messageId ? { ...msg, status: status } : msg
              ),
            }
          : el;
      })
    );
    console.log(`body`, {
      token: token,
      chatId,
      offerId: offer._id,
      userId: userId,
      status,
      messageId: messageId,
    });
    socket.emit('handleOffer', {
      token: token,
      chatId,
      offerId: offer._id,
      userId: userId,
      status,
      messageId: messageId,
    });
  };

  const sendNewOffer = (offer, chatId, userId) => {
    // console.log(`text`, text);
    console.log(`chatId`, chatId);
    console.log(`offer`, offer);
    console.log(`userId`, userId);

    socket.emit('newOffer', {
      token: token,
      chatId,
      offer: { ...offer },
      userId: userId,
    });
    setLoadingChatId(chatId);
  };

  return (
    <SocketContext.Provider
      displayName='Socket Context'
      value={{
        socket,
        sendNewMessage,
        chats,
        sendNewOffer,
        updateOfferMessage,
        loadingChatId,
        fetchMyChats,
        addNewChat,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
