import { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import images from "../../assets/image";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="navbar">
      <Link to="/">
        <img src={images.footer} alt="" className="logo"/>
      </Link>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => setMenu("Contact-us")}
          className={menu === "Contact-us" ? "active" : ""}
        >
          <a href="#footer">Contact us</a>
        </li>
      </ul>

      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!isLoggedIn ? (
          <button className="signin"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <i className="fa-solid fa-user"></i>
            <ul className="nav-profile-dropdown">
              <li className="orders" onClick={() => navigate("/myorders")}>
                <i className="fa-solid fa-bag-shopping"></i>
                <p>Orders</p>
              </li>
              <hr />
              <li className="logout" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        <i className="fa-solid fa-bars hamburger-menu" onClick={toggleMenu}></i>

        {isMenuOpen && (
          <ul className="navbar-dropdown">
            <li
              onClick={() => {
                setMenu("Home");
                toggleMenu();
              }}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={() => {
                setMenu("About");
                toggleMenu();
              }}
            >
              <a href="#footer">About</a>
            </li>
            <li
              onClick={() => {
                setMenu("Contact-us");
                toggleMenu();
              }}
            >
              <a href="#footer">Contact us</a>
            </li>
            {!isLoggedIn ? (
              <li
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
              >
                Login
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;