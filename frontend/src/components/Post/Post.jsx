import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost, reportPost } from "../../api/PostsRequests";
import { useDispatch, useSelector } from "react-redux";
import { Mention, MentionsInput } from "react-mentions";
import { addComments } from "../../api/CommentRequests";
import {MdReportProblem } from "react-icons/md"; 
import { toast } from "react-hot-toast";
const Post = ({ data,userdata }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.uploading);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [comment,setComment] = useState("")
  const [showComment,setShowComment] = useState(false)

  const mentionStyles = {
    backgroundColor: "#cee4e5",

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //post data
    const newPost = {
      comment : comment,
      postId : data._id
    };

    addComments(user._id,newPost);
    resetShare();
  };

  const resetShare = () => {
    setComment("")
  };

  const renderedComments = (data.comments.length !==0)?data.comments.map((commentElement)=>{
    const userComments = (userdata)? [...userdata,user].filter((element)=>{
        if(element._id === commentElement.userId){
          return element
        }
    }):null
    const userInfo =  userComments.map((element)=>{
      return {
        id : element.username,
        display : element.firstname + element.lastname,
      }
    });
    const postInfo = {
      id : (userInfo.length !=0 ) ?userInfo[0].id : "",
      display :  (userInfo.length !=0 )?userInfo[0].display:"",
      comment : (userInfo.length !=0 )?commentElement.comment:""
    }
    return (
     <div>
      <p>
       <b>{"@"+postInfo.id}</b>
      </p>
      <p>
       <b>{postInfo.display}</b>
      </p>
      <p>
       {postInfo.comment}
      </p>
     </div>
    )
   
  }) : null;

  console.log(renderedComments)
  const mentionsInputStyles = {
    control: {
      backgroundColor: '#fff',
      fontSize: 16,
      position : "relative !important",
      // fontWeight: 'normal',
    },
    '&multiLine': {
      control: {
        fontFamily: 'monospace',
        minHeight: 33,
      },
      highlighter: {
        padding: 9,
        border: '1px solid transparent',
      },
      input: {
        padding: 9,
        border: '1px solid silver',
      },
    },
    '&singleLine': {
      display: 'inline-block',
      width: 180,
      highlighter: {
        padding: 1,
        border: '2px inset transparent',
      },
      input: {
        paddingLeft: "10px",
        // border: '2px inset',
      },
    },
    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        fontSize: 16,
        maxHeight : "5.5rem",
        overflow : "auto" 
      },
      item: {
        padding: '5px 15px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        '&focused': {
          backgroundColor: '#cee4e5',
        },
      },
    },
  }
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  const renderedUserInfo  = (userdata)? userdata.filter((element)=>{
    if(element._id === data.userId){
      return element
    }
  }) : []

  const renderedUsers = (userdata)? userdata.map((element)=>{
    return {
      id : element.username,
      display : element.firstname + element.lastname
    }
  }):""

  useEffect(()=>{
    // console.log(userdata)
    console.log(renderedUserInfo)
  },[renderedUserInfo])
  
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="detail">
            <span>
              <b>{(renderedUserInfo.length !=0 )? "@"+renderedUserInfo[0].username+"  ":""}</b>
            </span>
            <br/>
            <span>{data.desc}</span>
          </div>
          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {likes} likes
          </span>
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} style={{ cursor: "pointer" }} onClick={()=>{
          setShowComment(!showComment)
        }}/>
        <MdReportProblem style={{cursor: "pointer",fontSize:"1.5rem"}} onClick={()=>{
          reportPost(data._id)
          toast.success("Post Reported")
        }}/>
      </div>
      {(showComment)?
      <>
      <div className="comment">
     {
      (renderedUsers)?
      <>
      <MentionsInput
        value={comment}
        style={mentionsInputStyles} 
        onChange={(e) => setComment(e.target.value)}
        className="comment-box"
        >

        <Mention
          data={renderedUsers} 
          style={mentionStyles}
          />
      </MentionsInput>
      </>
      
      : ""
     }
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "uploading" : "Comment"}
          </button>
          </div>  
      {renderedComments}
      </>
          : ""
      }
    </div>
  );
};

export default Post;