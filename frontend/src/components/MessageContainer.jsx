import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, []);

  return (
    <>
    {
      selectedUser !== null ? (
      <div className="md:min-w-[450px] flex flex-col">
        <div className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 mb-2">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src={selectedUser?.profilePhoto} alt="userProfilePicture" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2">
              <p> {selectedUser?.fullName} </p>
            </div>
          </div>
        </div>
        <Messages />
        <SendInput />
      </div>
      ) : (<h1> Let's start a conversation </h1>)
    }
    </>
  );
};

export default MessageContainer;
