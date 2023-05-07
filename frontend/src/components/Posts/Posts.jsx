import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  
  useEffect(()=>{
    console.log(posts)
  },[posts])
  
  if(!posts) return 'No Posts';
  console.log(posts,user._id)
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  if(!params.id) posts = posts.filter((post)=> post.userId!== user._id)
  return (
    <div className="Posts">
      {
        loading
        ? "Fetching posts...."
        :posts.map((post, id) => {
             return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;