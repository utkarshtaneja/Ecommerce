import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import image from '../../assets/image';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
          <img src={image.footer} alt="" className='logo' />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, hic dignissimos amet fuga nostrum consequuntur saepe atque at totam quod.</p>
          <div className="footer-social-icons">
            <Link to='https://www.linkedin.com/in/utkarshtaneja/'><i className="fa-brands fa-linkedin"></i></Link>
            <Link to='https://x.com/utkarshtaneja4'><i className="fa-brands fa-twitter"></i></Link>
            <Link to='https://www.instagram.com/utkarsh_taneja_/'><i className="fa-brands fa-instagram"></i></Link>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 987-654-3210</li>
            <li>contact@us.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © BlinkCart.com  - All Right Reserved.</p>
    </div>
  )
}

export default Footer