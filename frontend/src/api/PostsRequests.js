import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/post/${id}/timeline`);
export const getCategoryPosts= (id,category)=> API.get(`/post/${id}/${category}`);
export const likePost=(id, userId)=>API.put(`post/${id}/like`, {userId: userId})
export const reportPost = (id)=>API.put(`/admin/${id}/report`)
export const getAllPost = ()=>API.get(`/post/`)
export const hidePost = (id,data)=>API.put(`admin/${id}/hide`,data)
