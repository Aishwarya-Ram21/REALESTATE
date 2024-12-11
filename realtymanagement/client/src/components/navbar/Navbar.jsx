import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import {useNotificationStore} from "../../lib/notificationStore.js";
import logo from "./LOGO1.png";
import menu from "./menu.png";
import noavatar from "./noavatar.jpg";

function Navbar() {
  const [open, setOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();
  return (
    <nav>
      <div className="left">
        <Link  to="/" className="logo">
          <img src={logo} alt="" style={{height:'60px',width:'max-content',borderRadius:'30%'}} />
         </Link>
       <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/list">Lists</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || noavatar} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src={menu}
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/list">Lists</Link>
        <Link to="/login">Sign in</Link>
        <Link to="/register">Sign up</Link>
        
        </div>
      </div>
    </nav>
  );
}

export default Navbar;