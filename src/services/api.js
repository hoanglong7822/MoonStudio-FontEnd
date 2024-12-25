import axios from 'axios';
export const getApi = async (url) => {
    const response = await axios.get(url);
    return response;
};
export const postApi = async (url, input) => {
    console.log(input);
    const response = await axios.post(url, input);
    return response;
};
