import axios from 'axios';
import { BACKEND_URL } from '../constants';

const getToken = () => {
    return localStorage.getItem('id_token');
}

export const getGoogleURL = async () => {
    try {
        const url = `${BACKEND_URL}`;
        const res = await axios.get(url);
        if (res.status !== 200) {
            return null;
        } else {
            return res.data.googleOAuthLink;
        }
    } catch (err) {
        console.log(err);
    }
}


export const getUserPassDetails = async () => {
    try {
        const url = `${BACKEND_URL}user/pass`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}