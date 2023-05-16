import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./DashboardNavbar.css";
import { AuthContext } from './AuthContext';
import axios from 'axios';

export default function DashboardNavbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { setAuthHeaders, setUser } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = '';

    setAuthHeaders({});
    setUser(null);

    nav('/');
  };
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        ShareSpace
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
                        <button onClick={handleLogout}>Logout</button>

            {/* <a href="/Logout">Logout</a> */}
          </li>
         
        </ul>
      </div>
    </nav>
  );
}
