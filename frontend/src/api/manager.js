import axios from 'axios';
import { BACKEND_URL } from '../constants';

const getToken = () => {
    return localStorage.getItem('id_token');
}

export const getIdDetails = async (id) => {
    const res = await axios.get(`${BACKEND_URL}manager/verify/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return res.data;
}

export const verifyToken = async (id) => {
    const res = await axios.post(`${BACKEND_URL}manager/verify/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return res.data;
}

export const registerUser = async (data) => {
    const res = await axios.post(`${BACKEND_URL}manager/register`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return res.data;
}