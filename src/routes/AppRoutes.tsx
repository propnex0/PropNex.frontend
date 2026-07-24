
import { Routes, Route, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";


import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Listings from "../pages/Listings/Listings";
import AddListing from "../pages/AddListing/AddListing";
import Collections from "../pages/Collections/Collections";
import Agency from "../pages/Agency/Agency";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import EditListing from "../pages/EditListing/EditListing";

import BrokerProfile from "../pages/BrokerProfile/BrokerProfile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import CollectionDetails from "../pages/CollectionDetails/CollectionDetails";
import Leads from "../pages/Leads/Leads";
import LeadDetails from "../pages/LeadDetails/LeadDetails";
import AddLead from "../pages/AddLead/AddLead";
import Profile from "../pages/Profile/Profile";



const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route path="/listings" element={<Listings />} />




<Route
  path="/add-listing"
  element={
    <ProtectedRoute>
      <AddListing />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-listing/:id"
  element={<EditListing />}
/>

<Route
  path="/collections"
  element={<Collections />}
/>
<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

<Route
  path="/agency"
  element={<Agency />}
/>
<Route
  path="/pricing"
  element={<Pricing />}
/>

<Route
  path="/property/:id"
  element={<PropertyDetails />}
/>

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/broker/:id"
  element={<BrokerProfile />}
/>

<Route
  path="/edit-profile"
  element={<EditProfile />}
/>

<Route
  path="/collection/:id"
  element={<CollectionDetails />}
/>

<Route
  path="/leads"
  element={<Leads />}
/>

<Route
path="/lead/:id"
element={<LeadDetails />}
/>

<Route
path="/add-lead"
element={<AddLead />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>

    </Routes>
     {
location.pathname !== "/" &&
location.pathname !== "/login" &&
location.pathname !== "/register" && (
  <BottomNav />
)
}
</>
  );
};

export default AppRoutes;