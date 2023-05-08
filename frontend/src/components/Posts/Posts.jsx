import React, { useEffect, useState } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { getAllUser } from "../../api/UserRequests";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  let { posts, loading } = useSelector((state) => state.postReducer);

  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await (getAllUser());
      setPersons(data.filter((element)=>{
        if(user.following.includes(element._id)){
          return element
        }
      }));
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  
  if(!posts) return 'No Posts';
  console.log(posts,user._id)
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  if(!params.id) posts = posts.filter((post)=> {
    if(post.userId!== user._id && !post.ishide ){
      return post
    }
  })
  return (
    <div className="Posts">
      {
        loading
        ? "Fetching posts...."
        :posts.map((post, id) => {
             return <Post data={post} key={id} userdata={persons} />;
          })}
    </div>
  );
};

export default Posts;