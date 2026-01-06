import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {

    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async (req, res) => {
        try{
            axios.defaults.withCredentials = true;
            
            if(!selectedUser) return;

            const res = await axios.get(`http://localhost:5000/api/message/${selectedUser?._id}`);
            dispatch(setMessages(res.data));
        }catch(error){
            console.log(error);
        }
    }

    fetchMessages();
  }, [selectedUser?._id])
}

export default useGetMessages
