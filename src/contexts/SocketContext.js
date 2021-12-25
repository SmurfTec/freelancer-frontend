import { createContext, useContext, useEffect, useState } from 'react';

import socketIo from 'socket.io-client';
import { API_BASE_ORIGIN } from 'utils/makeReq';
import Axios from 'axios';
import { v4 } from 'uuid';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
  const { user, token } = useContext(AuthContext);

  const [loadingChatId, setLoadingChatId] = useState(null);

  const [chats, setChats] = useState();

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

  useEffect(() => {
    if (!socket) return;
    if (!user) return;

    socket.on('newMessage', ({ chatId, message, receiver }) => {
      console.log(`newMessage received :`, message);
      console.log(`chatId :`, chatId);
      console.log(`receiver :`, receiver);
      console.log(`user.user._id)`, user.user._id);
      // * Push New Message to that chats
      if (message.sender._id === user.user._id) {
        setLoadingChatId(false);
      }
      if (message.isAgreement) {
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
      } else if (receiver === user.user._id)
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

    socket.on('updatedMessage', ({ chatId, message, receiver }) => {
      console.log(`updatedMessage received :`, message);
      console.log(`chatId :`, chatId);
      console.log(`receiver :`, receiver);
      console.log(`user.user._id)`, user.user._id);
      // * Push New Message to that chats
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

  useEffect(() => {
    if (!token) return;
    (async () => {
      const { data } = await Axios.get(`/api/chats/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChats(data.chats);
    })();
  }, [user]); //! need to be change so that chats do not get fetched everytime user is updated

  const sendNewMessage = (text, chatId) => {
    // console.log(`text`, text);
    // console.log(`chatId`, chatId);
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
                  sender: user.user,
                  createdAt: new Date(),
                },
              ],
            }
          : el
      )
    );
    socket.emit('newMessage', { text: text, token: token, chatId });
  };

  const updateAgreementMessage = (
    agreement,
    chatId,
    userId,
    status,
    messageId,
    gameId
  ) => {
    // console.log(`text`, text);
    console.log(`chatId`, chatId);
    console.log(`agreement`, agreement);
    console.log(`userId`, userId);

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
      token: user.token,
      chatId,
      agreementId: agreement._id,
      userId: userId,
      status,
      messageId: messageId,
      gameId,
    });
    socket.emit('handleAgreement', {
      token: user.token,
      chatId,
      agreementId: agreement._id,
      userId: userId,
      status,
      messageId: messageId,
      gameId,
    });
  };

  const sendNewAgreement = (agreement, chatId, userId) => {
    // console.log(`text`, text);
    console.log(`chatId`, chatId);
    console.log(`agreement`, agreement);
    console.log(`userId`, userId);

    const agreementId = v4();
    // setChats((st) =>
    //   st.map((el) =>
    //     el._id === chatId
    //       ? {
    //           ...el,
    //           messages: [
    //             ...el.messages,
    //             {
    //               isAgreement: true,
    //               agreement: {
    //                 ...agreement,
    //                 status: 'pending',
    //                 createdAt: new Date(),
    //               },
    //               _id: agreementId,
    //               sender: user.user,
    //               createdAt: new Date(),
    //             },
    //           ],
    //         }
    //       : el
    //   )
    // );
    socket.emit('newAgreement', {
      token: user.token,
      chatId,
      agreement: { ...agreement },
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
        sendNewAgreement,
        updateAgreementMessage,
        loadingChatId,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
