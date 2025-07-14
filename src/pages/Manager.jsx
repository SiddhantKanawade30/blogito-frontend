import React from 'react'
import SideNavbar from '../components/SideNavbar'
import Feed from '../components/Feed'
import CreateBlog from '../components/Create'
import UserProfile from '../components/UserProfile'
import Settings from '../components/Settings'
import { BrowserRouter, Routes, Route} from 'react-router-dom'


const Manager = () => {
  return (
    <div>
      <SideNavbar />
   
      <Routes>
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="create" element={<CreateBlog />} />
        <Route path="feed" element={<Feed />} />
      </Routes>
  
      
      <Feed />
    </div>
  )
}

export default Manager
