import axios from 'axios';
import { Address } from "../pages/Home"


export const fetchAddress = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/address`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  };

export const createAddress = async (data: Address[])=>{
    await axios.post(`http://localhost:4000/address`, data);
    
}

