import React, { useState, useEffect } from "react";
import { axios, apis } from "../../services";
import EntryHeartLoader from "../EntryLoader/HeartLoader";
import classes from "./ChatBox.module.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const access_token = localStorage.getItem("access_token");

const ChatBox = (props) => {
  let websocket = new W3CWebSocket(
    apis.WEB_SOCKET + "?Authorizer=" + access_token
  );
  const wbReConnect = async () => {
    websocket = new W3CWebSocket(
      apis.WEB_SOCKET + "?Authorizer=" + access_token
    );
  };

  // this messages are old chats
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [isFirstMessage, setIsFirstTime] = useState(false);
  const [messageText, setMessageText] = useState("");

  const getAllChatHandler = async () => {
    setIsMessagesLoading(true);
    try {
      const allChatDetails = await axios.post(apis.FULL_CHAT, {
        userName: props.userName,
      });

      if (allChatDetails?.data?.data?.Items?.length) {
        const chattedDetails = [];
        for (
          let i = allChatDetails?.data?.data?.Items?.length - 1;
          i >= 0;
          i--
        ) {
          chattedDetails.push({
            type: allChatDetails.data.data.Items[i].senderId
              ? "sender"
              : "receiver",
            message: allChatDetails.data.data.Items[i].message,
          });
        }
        setMessages(chattedDetails);
      } else {
        setIsFirstTime(true);
      }
      setIsMessagesLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllChatHandler();
  }, [props.userName]);

  websocket.onopen = (event) => {
    console.log("WebSocket Client Connected", event);
  };

  websocket.onclose = (e) => {
    console.log("WebSocket closed!", e);
    // this heartbest will be used in production
    // wbReConnect();
    // console.log("re connection initiated");
  };

  websocket.onmessage = (message) => {
    if (!message?.data.length) return;
    const oldMessages = [...messages];
    oldMessages.push({ type: "receiver", message: message?.data });
    setMessages(oldMessages);
  };

  const InputOnChange = (value) => {
    setMessageText(value);
  };

  const messageSendHandler = () => {
    if (!messageText.length) return;
    setIsFirstTime(false)
    
    const oldMessages = [...messages];
    oldMessages.push({ type: "sender", message: messageText });
    setMessages(oldMessages);

    console.log("websocket", websocket);
    if (websocket.readyState !== 1) {
      wbReConnect();
      setTimeout(() => {
        websocket.send(
          JSON.stringify({
            message: messageText,
            receiverUserName: props.userName,
          })
        );
      }, 5000);
    } else {
      websocket.send(
        JSON.stringify({
          message: messageText,
          receiverUserName: props.userName,
        })
      );
    }
    setMessageText("");
  };

  return (
    <div>
      {props.userName ? (
        <div className={classes.MainBoxContainer}>
          <div className={classes.MessagesBox}>
            <div className={classes.MessagesBoxContainer}>
              {isMessagesLoading ? (
                <div className={classes.EntryLoader}>
                  <EntryHeartLoader />
                </div>
              ) : isFirstMessage ? (
                <div className={classes.SayHi}>
                  <i className="icon handshake outline"></i>
                  <p>Say Hi to {props.userName}</p>
                </div>
              ) : (
                messages.map((item, i) => {
                  return (
                    <div
                      key={"message-item-" + i}
                      className={
                        item.type === "sender"
                          ? classes.SenderBox
                          : item.type === "receiver"
                          ? classes.ReceiverBox
                          : null
                      }
                    >
                      <p>{item.message}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className={classes.InputContainer}>
            <div className={classes.InsideInputConteainer}>
              <input
                onKeyPress={(event) => {
                  if (event.key === "Enter") return messageSendHandler();
                }}
                onChange={(event) => InputOnChange(event.target.value)}
                value={messageText}
                className={classes.InputField}
              />
              <button
                className={classes.SendButton}
                onClick={() => messageSendHandler()}
              >
                <p>SEND</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.DefaultPage}>
          <i className="icon user secret"></i>
          <p>Please select a Dev to start conversation</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
