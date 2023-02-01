import React from "react";

const ChatForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" onChange={props.onTextChange} value={props.msg} />
      <button type="submit">전송</button>
    </form>
  );
};

export default ChatForm;
