import axios from 'axios';

export const makeRequest = async (url: string, method: string, data: any = {}, headers: any = {}) => {
  try {
    const response = await axios({ method, url, data, headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};
