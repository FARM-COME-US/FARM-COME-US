import React from "react";

const ChatForm = (props) => {
  return (
    // <form onSubmit={props.onSubmit}>
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        onChange={props.onTextChange}
        value={props.msg}
        onEnter={props.onSubmit}
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default ChatForm;
