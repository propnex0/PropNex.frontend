import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  useEffect(() => {

    fetchBroker();
    fetchListings();

  }, [name]);

  const fetchBroker = async () => {

    const res = await fetch(
      `https://prop-nex-backend.vercel.app/api/auth/broker/${name}`
    );

    const data = await res.json();

    setBroker(data);

  };

  const fetchListings = async () => {

    const res = await fetch(
      `https://prop-nex-backend.vercel.app/api/listings/broker/${name}`
    );

    const data = await res.json();

    setListings(data);

  };

  if (!broker) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="broker-page">

      <div className="broker-card">

        <img
          src={
            broker.photo
              ? getMediaUrl(broker.photo)
              : "https://via.placeholder.com/120"
          }
          className="broker-photo"
          alt=""
        />

        <h1>{broker.name}</h1>

        <p>{broker.agencyName}</p>

        <p>{broker.city}</p>

        <div className="broker-actions">

          <a href={`tel:${broker.phone}`}>
            <button>Call</button>
          </a>

          <a
            href={`https://wa.me/${broker.whatsapp || broker.phone}`}
            target="_blank"
            rel="noreferrer"
          >
            <button>WhatsApp</button>
          </a>

        </div>

      </div>

      <div className="broker-listings">

        <h2>Properties</h2>

        {
          listings.length === 0 ?

          <p>No Listings</p>

          :

          listings.map((item:any)=>(

            <Link
              key={item._id}
              to={`/property/${item._id}`}
              className="broker-property"
            >

              <img
                src={
                  item.images?.length
                    ? getMediaUrl(item.images[0])
                    : "/no-image.png"
                }
                alt=""
              />

              <h3>{item.title}</h3>

              <p>₹ {item.price}</p>

              <p>{item.city}</p>

            </Link>

          ))

        }

      </div>

    </div>

  );

};

export default BrokerProfile;