import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const predictCrop = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error('Error predicting crop:', error);
    throw error;
  }
};




