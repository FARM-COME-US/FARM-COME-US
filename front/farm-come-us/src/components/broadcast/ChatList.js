import React, { Fragment } from "react";

import classes from "./style/ChatList.module.scss";

import { IoChatbubbleEllipses } from "react-icons/io5";

const ChatList = (props) => {
  return (
    <Fragment>
      <ul className={classes.chatList}>
        {props.chatList.map((chatItem, idx) => (
          <li key={idx}>{`${chatItem.sender} : ${chatItem.msg}`}</li>
        ))}
      </ul>
      <IoChatbubbleEllipses className={classes.btnChatToggle} />
    </Fragment>
  );
};

export default ChatList;
