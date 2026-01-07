import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { OtherUsers: allUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [searchedUsers, setSearchedUsers] = useState(null);

  const logoutHandler = async (req, res) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`http://localhost:5000/api/user/logout`);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    if (!search) {
      setSearchedUsers(null);
      return;
    }
    alert(search);
    const conversationUser = allUsers?.filter(
      (user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.userName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationUser) {
      setSearchedUsers(conversationUser);
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="border-r border-slate-500 flex flex-col p-4">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-500 text-white">
          {" "}
          <BiSearchAlt2 className="w-6 h-6 outline-none" />{" "}
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers users={searchedUsers ? searchedUsers : allUsers} />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
