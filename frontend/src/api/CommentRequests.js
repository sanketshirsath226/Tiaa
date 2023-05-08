import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getComments = (id) => API.get(`post/getComment/${id}`);

export const addComments = (id, data) => API.put(`/post/${id}/addComment/`, data);