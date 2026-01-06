import React from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { useDispatch } from "react-redux"; 
import {setOtherUsers} from "../redux/userSlice";

const useGetOtherUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async (req, res) => {
            try{
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:5000/api/user/`);
                dispatch(setOtherUsers(res.data));
            }
            catch(error){
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers;
