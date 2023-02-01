import React from "react";

const ChatList = (props) => {
  return (
    <ul>
      {props.chatList.map((chatItem, idx) => (
        <li key={idx}>{`${chatItem.sender} : ${chatItem.msg}`}</li>
      ))}
    </ul>
  );
};

export default ChatList;
