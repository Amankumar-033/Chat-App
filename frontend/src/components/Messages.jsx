import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const Messages = () => {
  useGetMessages();

  const { messages } = useSelector((store) => store.message);
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages)
    return <div className="px-4 flex-1 overflow-auto">Loading...</div>;

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages?.map((message) => {
        return (
          <div key={message?._id} ref={scroll}>
            <Message message={message} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
