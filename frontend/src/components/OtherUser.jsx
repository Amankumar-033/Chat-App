import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({user}) => {

    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);

    const selectedUserHandler = () => {
        dispatch(setSelectedUser(user));
    }


  return (
    <>
      <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200' : ''} flex items-center gap-2 hover:bg-zinc-200 rounded cursor-pointer p-2 text-white hover:text-zinc-900`}>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="userProfilePicture"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p> {user?.fullName} </p>
          </div>
        </div>
      </div>

      <div className="divider py-0 my-0 h-1"></div>
    </>
  );
};

export default OtherUser;
