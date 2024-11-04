import axios from 'axios';

const API_URL = 'https://restapi-cortai.onrender.com/api/users';

export const createUser = async (name: string, email:string, phoneContact:string, type:string, password:string) => {
  const response = await axios.post(API_URL, {
    name,
    email,
    phone_contact: phoneContact,
    type,
    password,
  });
  return response.data;
};
