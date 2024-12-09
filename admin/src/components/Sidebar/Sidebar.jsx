import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import assets from "../../assets/image"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink to='/add' className={({ isActive }) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <img src={assets.add_icon} alt="" />
          <p>Add Itmes</p>
        </NavLink>

        <NavLink to='/list' className={({ isActive }) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <i className="fa-solid fa-list list_icon"></i>
          <p>List Itmes</p>
        </NavLink>

        <NavLink to='/orders' className={({ isActive }) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar