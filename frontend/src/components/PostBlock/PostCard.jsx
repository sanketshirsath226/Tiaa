import { useEffect, useState } from "react";
import { blockUser } from "../../api/UserRequests";
import { hidePost } from "../../api/PostsRequests";

const PostCard = ({post,postUser}) => {
    const [tags,setTags] = useState(null);
    const [desc,setDesc] = useState(null);
    useEffect(()=>{
        if(post){
        const message = post.desc.split("#");
        setTags(message[1]);
        setDesc(message[0]);
        }
    },[post])
    return(
        <div className={`post-card ${post.isReported? "reported":""}`}>
            <div className="profile">
                <p>@{(postUser)?postUser.username:""}</p>
            </div>
            <div className="desc"> 
                <p>{(desc)?desc:""}</p>
            </div>
            <div className="buttons">
                <button className="button" onClick={()=>{
                    const block = postUser.block;
                    blockUser(post.userId,{block:block})
                }}>{(postUser && postUser.block)?"UnBlock":"Block"}</button>
                <button className="button"
                    onClick= {()=>{
                        const hide = post.ishide;
                        hidePost(post.userId,{hide : hide})
                    }}
                >{post.ishide?"UnHide":"Hide"}</button>
                <input value={(tags?tags:"")}>
                </input>
            </div>
        </div>
    )   
}
export default PostCard;