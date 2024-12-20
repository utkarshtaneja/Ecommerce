import React from 'react'
import './Navbar.css'
import assets from "../../assets/image"

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <img src={assets.footer} className='logo' />
        <img className='profile' src={assets.profile_image} alt="" />
      </div>
      <div className='admin-panel'>
        <p>Admin Panel</p>
      </div>
    </>
  )
}

export default Navbar