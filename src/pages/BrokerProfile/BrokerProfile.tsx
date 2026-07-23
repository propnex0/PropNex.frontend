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
    loadBroker();
  }, [name]);

  const loadBroker = async () => {

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
    return (
      <div className="bp-loading">
        Loading...
      </div>
    );
  }

  if (!broker) {
    return (
      <div className="bp-loading">
        Broker Not Found
      </div>
    );
  }

  return (

    <div className="bp-page">

      <section className="bp-hero">

        <div className="bp-banner"></div>

        <div className="bp-profile">

          <div className="bp-photo-box">

            <img
              src={
                broker.photo
                  ? getMediaUrl(broker.photo)
                  : "https://via.placeholder.com/220"
              }
              alt={broker.name}
              className="bp-photo"
            />

            <div className="bp-verify">
              <FaCheckCircle />
            </div>

          </div>

          <h1 className="bp-name">
            {broker.name}
          </h1>

          <p className="bp-company">
            {broker.agencyName || "Property Consultant"}
          </p>

          <div className="bp-location">

            <FaMapMarkerAlt />

            <span>
              {broker.city || "Jaipur"}
            </span>

          </div>

          <div className="bp-stats">          <div className="bp-stat">
            <h2>{listings.length}</h2>
            <p>Properties</p>
          </div>

          <div className="bp-stat">
            <h2>{broker.experience || 0}</h2>
            <p>Years</p>
          </div>

          <div className="bp-stat">
            <h2>{broker.dealsClosed || 0}</h2>
            <p>Deals</p>
          </div>

          <div className="bp-stat">
            <h2>4.9★</h2>
            <p>Rating</p>
          </div>

        </div>

        <div className="bp-buttons">

          <a
            href={`tel:${broker.phone}`}
            className="bp-call-btn"
          >
            <FaPhoneAlt />
            <span>Call Now</span>
          </a>

          <a
            href={`https://wa.me/${broker.whatsapp || broker.phone}`}
            target="_blank"
            rel="noreferrer"
            className="bp-whatsapp-btn"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>

        </div>

      </div>

    </section>

    {/* ==========================
        PROPERTIES
    ========================== */}

    <div className="bp-property-header">

      <h2>Featured Properties</h2>

      <p>
        {listings.length} Active Listings
      </p>

    </div>

    <div className="bp-property-grid">{
  listings.length === 0 ? (

    <div className="bp-empty">

      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
        alt="No Property"
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
        className="bp-card"
      >

        <div className="bp-card-image">

          <img
            src={
              item.images?.length
                ? getMediaUrl(item.images[0])
                : "https://via.placeholder.com/700x450?text=No+Image"
            }
            alt={item.title}
          />

          <span className="bp-card-tag">
            {item.propertyType || "Property"}
          </span>

        </div>

        <div className="bp-card-body">

          <h2 className="bp-card-price">
            ₹ {Number(item.price || 0).toLocaleString("en-IN")}
          </h2>

          <h3 className="bp-card-title">
            {item.title || "Property"}
          </h3>

          <p className="bp-card-location">

            <FaMapMarkerAlt />

            <span>
              {item.location || item.city || "Jaipur"}
            </span>

          </p>

          <div className="bp-card-button">

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

      <section className="bp-about">

        <div className="bp-about-card">

          <h2>About Broker</h2>

          <p>
            {
              broker.bio ||
              "Experienced property consultant helping buyers and sellers with trusted guidance, transparent deals and premium real estate services."
            }
          </p>

        </div>

        <div className="bp-info-card">

          <h2>Professional Details</h2>

          <div className="bp-info-row">
            <span>Experience</span>
            <strong>{broker.experience || 0} Years</strong>
          </div>

          <div className="bp-info-row">
            <span>Deals Closed</span>
            <strong>{broker.dealsClosed || 0}</strong>
          </div>

          <div className="bp-info-row">
            <span>Response Time</span>
            <strong>{broker.responseTime || "Within 30 Minutes"}</strong>
          </div>

          <div className="bp-info-row">
            <span>RERA</span>
            <strong>{broker.reraNumber || "Verified"}</strong>
          </div>

        </div>

      </section>

      {/* ==========================
          CONTACT
      ========================== */}

      <section className="bp-contact">

        <h2>Contact Broker</h2>

        <div className="bp-contact-grid">

          <a
            href={`tel:${broker.phone}`}
            className="bp-contact-btn"
          >
            <FaPhoneAlt />
            <span>Call Now</span>
          </a>

          <a
            href={`https://wa.me/${broker.whatsapp || broker.phone}`}
            target="_blank"
            rel="noreferrer"
            className="bp-contact-btn bp-contact-whatsapp"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>

        </div>

      </section>

      {/* ==========================
          FOOTER
      ========================== */}

      <footer className="bp-footer">

        <h3>
          Powered by <span>PropNex</span>
        </h3>

        <p>
          Buy • Sell • Rent • Commercial • Plots
        </p>

      </footer>

    </div>

  );

};

export default BrokerProfile;