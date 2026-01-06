import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {

  const {selectedUser} = useSelector(store=>store.user);

  return (
      <div className="md:min-w-[450px] flex flex-col">
        <div className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 mb-2">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img
                src={selectedUser?.profilePhoto}
                alt="userProfilePicture"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2">
              <p> {selectedUser?.fullName} </p>
            </div>
          </div>
        </div>
        <Messages/>
        <SendInput/>
      </div>
  );
};

export default MessageContainer;
