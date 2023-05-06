import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.js';
import { useSelector,useDispatch } from "react-redux";
import { getCategoryPosts } from '../../actions/PostsAction';

const TrendCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();
    const handleClick = (name) => {
        dispatch(getCategoryPosts(user._id,name))
    };
  return (
   <div className="TrendCard">
       <h3 className='title'>Categories</h3>

        <div className='cards'>
        {TrendData.map((trend, id)=>{
            return(
                <div className="trend" key={id} onClick={()=>{handleClick(trend.name)}}>
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k posts</span>
                </div>
            )
       })}
        </div>

   </div>
  )
}

export default TrendCard