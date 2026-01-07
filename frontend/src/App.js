import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUsers } from "./redux/userSlice.js";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  }
])



function App() {
  const {authUser} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(authUser){
        const socket = io('http://localhost:5000/', {
        query:{
          userId:authUser._id
      }
      });
        dispatch(setSocket(socket));
        socket.on('getOnlineUsers', (onlineUser) => {
            dispatch(setOnlineUsers(onlineUser));
        });
    }
    else(socket){
        socket.close();
        dispatch(setSocket(null));
    }
  },[authUser])

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
