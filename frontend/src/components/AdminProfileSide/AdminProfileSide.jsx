import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './AdminProfileSide.css'
import AdminLogo from '../AdminLogo/AdminLogo'
import AdminProfileCard from '../AdminProfileCard/AdminProfileCard'


const AdminProfileSide = () => {
  return (
    <div className="AdminProfileSide">
        <AdminLogo/>
        <AdminProfileCard/>
    </div>
    )
}

export default AdminProfileSide