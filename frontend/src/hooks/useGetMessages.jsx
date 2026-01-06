import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useGetMessages = () => {

    const {selectedUser} = useSelector(store=>store.user);

  useEffect(() => {
    const fetchMessages = async (req, res) => {
        try{
            axios.defaults.withCredentials = true;
            
            if(!selectedUser) return;
            
            const res = await axios.get(`http://localhost:5000/api/message/${selectedUser?._id}`);
        }catch(error){
            console.log(error);
        }
    }

    fetchMessages();
  }, [selectedUser?._id])
}

export default useGetMessages
