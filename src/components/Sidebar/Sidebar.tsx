
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="desktop-sidebar">

      <div className="sidebar-logo">
       <img
  src="/logo.png"
  alt="PropNex"
  className="site-logo"
/>
      </div>

      <div className="sidebar-menu">

        <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Home
</NavLink>


<NavLink
  to="/listings"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  My Listings
</NavLink>
       


<NavLink
  to="/collections"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Collections
</NavLink>

        
<NavLink
  to="/add-listing"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Add Listing
</NavLink>



<NavLink
  to="/agency"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Agency
</NavLink>

        
<NavLink
  to="/pricing"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Buy Listings
</NavLink>

        
<NavLink
  to="/profile"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
Profile
</NavLink>

        

      </div>

    </div>
  );
};

export default Sidebar;