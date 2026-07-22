import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

import "./BrokerProfile.css";

const getMediaUrl = (url: string) => {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `https://prop-nex-backend.vercel.app${url}`;
};

const BrokerProfile = () => {

  const { name } = useParams();

  const [broker, setBroker] = useState<any>(null);

  const [listings, setListings] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchData();

  }, [name]);

  const fetchData = async () => {

    try {

      const [brokerRes, listingRes] = await Promise.all([

        fetch(
          `https://prop-nex-backend.vercel.app/api/auth/broker/${name}`
        ),

        fetch(
          `https://prop-nex-backend.vercel.app/api/listings/broker/${name}`
        ),

      ]);

      const brokerData = await brokerRes.json();

      const listingData = await listingRes.json();

      setBroker(brokerData);

      setListings(
        Array.isArray(listingData)
          ? listingData
          : []
      );

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return <div className="loading">Loading...</div>;

  }

  if (!broker) {

    return <div className="loading">Broker Not Found</div>;

  }

  return (

    <div className="broker-page">

      <div className="hero-section">

        <div className="hero-banner"></div>

        <div className="profile-card">

          <div className="profile-top">

            <img
              src={
                broker.photo
                  ? getMediaUrl(broker.photo)
                  : "https://via.placeholder.com/180"
              }
              className="broker-photo"
              alt=""
            />

            <div className="verify-icon">
              <FaCheckCircle />
            </div>

          </div>

          <h1>{broker.name}</h1>

          <h3>
            {broker.agencyName || "Property Consultant"}
          </h3>

          <div className="broker-location">

            <FaMapMarkerAlt />

            <span>

              {broker.city || "Jaipur"}

            </span>

          </div>

          <div className="stats">            <div className="stat-card">
              <h2>{listings.length}</h2>
              <p>Listings</p>
            </div>

            <div className="stat-card">
              <h2>{broker.experience || 0}</h2>
              <p>Years</p>
            </div>

            <div className="stat-card">
              <h2>{broker.dealsClosed || 0}</h2>
              <p>Deals</p>
            </div>

            <div className="stat-card">
              <h2>4.9★</h2>
              <p>Rating</p>
            </div>

          </div>

          <div className="action-buttons">

            <a
              href={`tel:${broker.phone}`}
              className="call-btn"
            >
              <FaPhoneAlt />
              <span>Call Now</span>
            </a>

            <a
              href={`https://wa.me/${broker.whatsapp || broker.phone}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>

          </div>

        </div>

      </div>

      {/* ==========================
          PROPERTIES
      ========================== */}

      <div className="properties-header">

        <h2>Featured Properties</h2>

        <p>
          {listings.length} Active Listings
        </p>

      </div>

      <div className="property-grid">        {
          listings.length === 0 ? (

            <div className="empty-card">

              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt=""
              />

              <h2>No Properties Found</h2>

              <p>
                This broker hasn't uploaded any property yet.
              </p>

            </div>

          ) : (

            listings.map((item: any) => (

              <Link
                key={item._id}
                to={`/property/${item._id}`}
                className="property-card"
              >

                <div className="image-wrapper">

                  <img
                    src={
                      item.images?.length
                        ? getMediaUrl(item.images[0])
                        : "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={item.title}
                  />

                  <span className="property-type">
                    {item.propertyType || "Property"}
                  </span>

                </div>

                <div className="property-content">

                  <h2 className="price">
                    ₹ {Number(item.price || 0).toLocaleString("en-IN")}
                  </h2>

                  <h3>
                    {item.title || "Property"}
                  </h3>

                  <p className="property-location">

                    <FaMapMarkerAlt />

                    <span>
                      {item.location || item.city || "Jaipur"}
                    </span>

                  </p>

                  <div className="view-property-btn">
                    View Details
                  </div>

                </div>

              </Link>

            ))

          )
        }

      </div>      {/* ==========================
          ABOUT BROKER
      ========================== */}

      <div className="about-section">

        <div className="about-card">

          <h2>About Broker</h2>

          <p>
            {
              broker.bio ||
              "Experienced real estate consultant helping buyers and sellers find the perfect property with trusted guidance and transparent deals."
            }
          </p>

        </div>

        <div className="info-card">

          <h2>Professional Details</h2>

          <div className="info-row">
            <span>Experience</span>
            <strong>{broker.experience || 0} Years</strong>
          </div>

          <div className="info-row">
            <span>Deals Closed</span>
            <strong>{broker.dealsClosed || 0}</strong>
          </div>

          <div className="info-row">
            <span>Response Time</span>
            <strong>{broker.responseTime || "Within 30 Min"}</strong>
          </div>

          <div className="info-row">
            <span>RERA</span>
            <strong>{broker.reraNumber || "Verified"}</strong>
          </div>

        </div>

      </div>

      {/* ==========================
          CONTACT
      ========================== */}

      <div className="contact-card">

        <h2>Contact Broker</h2>

        <div className="contact-grid">

          <a
            href={`tel:${broker.phone}`}
            className="contact-box"
          >
            <FaPhoneAlt />
            <span>Call Now</span>
          </a>

          <a
            href={`https://wa.me/${broker.whatsapp || broker.phone}`}
            target="_blank"
            rel="noreferrer"
            className="contact-box whatsapp"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>

        </div>

      </div>

      {/* ==========================
          FOOTER
      ========================== */}

      <div className="broker-footer">

        <h3>
          Powered by <span>PropNex</span>
        </h3>

        <p>
          Buy • Sell • Rent Properties
        </p>

      </div>

    </div>

  );

};

export default BrokerProfile;