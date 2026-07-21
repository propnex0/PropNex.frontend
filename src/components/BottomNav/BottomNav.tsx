import {
  FiHome,
  FiFileText,
  FiPlus,
  FiFolder,
  FiUsers
} from "react-icons/fi";

import {
  Link,
  useLocation
} from "react-router-dom";

import "./BottomNav.css";

const BottomNav = () => {

  const location = useLocation();

  return (
    <div className="bottom-nav">

      <Link
        to="/dashboard"
        className={`nav-item ${
          location.pathname === "/dashboard"
            ? "active"
            : ""
        }`}
      >
        <FiHome />
        <span>Home</span>
      </Link>

      <Link
        to="/listings"
        className={`nav-item ${
          location.pathname === "/listings"
            ? "active"
            : ""
        }`}
      >
        <FiFileText />
        <span>Listings</span>
      </Link>

      <Link
        to="/add-listing"
        className="nav-center"
        
      >
        <FiPlus />
      </Link>

      <Link
        to="/collections"
        className={`nav-item ${
          location.pathname === "/collections"
            ? "active"
            : ""
        }`}
      >
        <FiFolder />
        <span>Sets</span>
      </Link>

      <Link
        to="/agency"
        className={`nav-item ${
          location.pathname === "/agency"
            ? "active"
            : ""
        }`}
      >
        <FiUsers />
        <span>Agency</span>
      </Link>

    </div>
  );
};

export default BottomNav;