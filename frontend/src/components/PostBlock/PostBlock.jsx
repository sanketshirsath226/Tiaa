import React, { useEffect, useState } from "react";
import "./PostBlock.css";
import { useDispatch } from "react-redux";
import { getAllPost } from "../../api/PostsRequests";
import PostCard from "./PostCard";
import { getAllUser } from "../../api/UserRequests";

const PostBlock = () => {
  const dispatch = useDispatch();
  const [posts,setPosts] = useState(null);
  const [persons,setPersons] = useState(null);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await (getAllUser());
      setPersons(data.filter((element)=>{
        return element
      }));
    };
    fetchPersons();
  }, []);

  useEffect(()=>{
    const fetchPosts = async () => {
      const { data } = await (getAllPost());
      setPosts(data)
    };
    fetchPosts();
  },[])

  useEffect(()=>{
    console.log(persons)
  },[persons])

  useEffect(()=>{
    console.log(posts)
  },[posts])

  const renderedPost = (posts && persons)? posts.map((element)=>{
    const renderpersons = persons.filter((person)=>{
      if(person._id === element.userId){
        return element
      }
    })
    console.log(renderpersons)
    const renderedData = (renderpersons.length !==0)? {
      username : renderpersons[0].username,
      display : renderpersons[0].firstname + renderpersons[0].lastname,
      block : renderpersons[0].isBlock
    }:null

    return <PostCard post={element} postUser={renderedData}>
    </PostCard>
    }) : null
  return (
    <div className="PostBlock">
        <div className="PostBlock">
            {renderedPost}
        </div>
    </div>
  );
};

export default PostBlock;