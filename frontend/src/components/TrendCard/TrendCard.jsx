import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.js'
const TrendCard = () => {
  return (
   <div className="TrendCard">
       <h3 className='title'>Categories</h3>

        <div className='cards'>
        {TrendData.map((trend, id)=>{
            return(
                <div className="trend" key={id} onClick={()=>{alert("Hello")}}>
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