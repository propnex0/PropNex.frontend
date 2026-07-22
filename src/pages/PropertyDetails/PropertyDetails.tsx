import "./PropertyDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const getMediaUrl = (url: string) => {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `https://prop-nex-backend.vercel.app${url}`;
};
const PropertyDetails = () => {
  const { id } = useParams();
const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [selectedImage, setSelectedImage] =
    useState("");

   

    const [selectedVideo, setSelectedVideo] =
  useState("");

  const [showViewer, setShowViewer] =
  useState(false);

const [shareData, setShareData] = useState({
  open: false,
  message: "",
});

const [, setViewerType] =
  useState("image");

const galleryItems = [
  ...(property?.images || []),
  ...(property?.video ? [property.video] : []),
];

const currentIndex = selectedVideo
  ? galleryItems.indexOf(selectedVideo)
  : galleryItems.indexOf(selectedImage);

const nextImage = () => {
  if (!galleryItems.length) return;

  const next =
    (currentIndex + 1) %
    galleryItems.length;

  const item = galleryItems[next];

  if (item === property.video) {
    setSelectedVideo(item);
    setSelectedImage("");
  } else {
    setSelectedImage(item);
    setSelectedVideo("");
  }
};

const prevImage = () => {
  if (!galleryItems.length) return;

  const prev =
    currentIndex === 0
      ? galleryItems.length - 1
      : currentIndex - 1;

  const item = galleryItems[prev];

  if (item === property.video) {
    setSelectedVideo(item);
    setSelectedImage("");
  } else {
    setSelectedImage(item);
    setSelectedVideo("");
  }
};
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `https://prop-nex-backend.vercel.app/api/listings/${id}`
        );

        const data = await response.json();

        setProperty(data);

        console.log(data);
        console.log("Images =", data.images);
console.log("Agent Photo =", data.agentPhoto);
console.log("Video =", data.video);
console.log("VIDEO =", data.video);
console.log("AGENT PHOTO =", data.agentPhoto);
console.log("BROKER =", data.brokerName);
console.log("AGENCY =", data.agencyName);

        if (data.images?.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="property-details">
      <div className="property-gallery">
        
        <button
  className="gallery-arrow left"
  onClick={prevImage}
>
  ❮
</button>

<button
  className="gallery-arrow right"
  onClick={nextImage}
>
  ❯
</button>
      {selectedVideo ? (
  <video
    controls
    autoPlay
    style={{
      width: "100%",
      borderRadius: "12px",
    }}
  >
    <source
      src={getMediaUrl(selectedVideo)}
      type="video/mp4"
    />
  </video>
) : (
  selectedImage && (
   <img
  src={getMediaUrl(selectedImage)}
  alt={property.title}
  onClick={() => {
    setViewerType("image");
    setShowViewer(true);
  }}
  style={{ cursor: "zoom-in" }}
/>
  )
)}
        <div className="image-badge">
 {(property.images?.length || 0) + (property.video ? 1 : 0)}</div>

        
<div className="thumbnail-container">
  {property.images?.map((img: string, index: number) => (
    <img
      key={index}
      src={getMediaUrl(img)}
      alt=""
      className="thumbnail-img"
onClick={() => {
  setSelectedImage(img);
  setSelectedVideo("");
}}      style={{
        width: "100px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,.15)",
        border:
          selectedImage === img
            ? "3px solid #0d4d3b"
            : "2px solid transparent",
      }}
    />
  ))}

  {property.video && (
   <video
  onClick={() => {
    setSelectedVideo(property.video);
    setSelectedImage("");
  }}
  style={{
    width: "100px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,.15)",
    border:
      selectedVideo === property.video
        ? "3px solid #0d4d3b"
        : "2px solid transparent",
  }}
>
      <source
        src={getMediaUrl(property.video)}
        type="video/mp4"
      />
        <span className="play-icon">▶</span>
    </video>
    
    
  )}
</div>
</div>

      <div className="property-content">
        
        <span className="property-status">
          Available
        </span>

        <h1>{property.title}</h1>

    <div className="price-row">

  <h2 className="property-price">
    ₹ {property.price}
  </h2>

 

</div>

<p className="property-location">
  📍 {property.location}
</p>

<div className="property-features">

  <div className="feature">
    <h3>{property.propertyType}</h3>
    <p>Property Type</p>
  </div>

  <div className="feature">
    <h3>{property.city || "-"}</h3>
    <p>City</p>
  </div>

  <div className="feature">
    <h3>{property.facing || "-"}</h3>
    <p>Facing</p>
  </div>

  <div className="feature">
    <h3>{property.bhk || "-"}</h3>
    <p>BHK</p>
  </div>

  <div className="feature">
    <h3>{property.bathrooms || "-"}</h3>
    <p>Bathrooms</p>
  </div>

  <div className="feature">
  <h3>{property.images?.length || 0}</h3>
  <p>Images</p>
</div>

</div>

<div className="description">
          <h3>Description</h3>

          <p>
            {property.description}
          </p>
        </div>
        <div className="agent-card">

  <img
    src={getMediaUrl(property.agentPhoto)}
    alt=""
    className="agent-photo"
  />

  <div className="agent-info">
    <h3>{property.brokerName}</h3>

    <p>{property.agencyName}</p>

    <span>
      Verified Property Agent
    </span>
  </div>

</div>
<div className="property-details-card">
  <h3>Property Details</h3>

  <div className="property-features">
    <div className="feature">
      <h3>{property.transactionType || "-"}</h3>
      <p>Transaction</p>
    </div>

    <div className="feature">
      <h3>{property.bhk || "-"}</h3>
      <p>BHK</p>
    </div>

    <div className="feature">
      <h3>{property.bathrooms || "-"}</h3>
      <p>Bathrooms</p>
    </div>

    <div className="feature">
      <h3>{property.balconies || "-"}</h3>
      <p>Balconies</p>
    </div>
  </div>

 <div className="details-grid">

  <div className="detail-item">
    <h4>Carpet Area</h4>
    <p>{property.carpetArea} sq ft</p>
  </div>

  <div className="detail-item">
    <h4>Built Up Area</h4>
    <p>{property.builtUpArea} sq ft</p>
  </div>

  <div className="detail-item">
    <h4>Super Built Up Area</h4>
    <p>{property.superBuiltUpArea} sq ft</p>
  </div>

  <div className="detail-item">
    <h4>Floor</h4>
    <p>{property.floor}</p>
  </div>

  <div className="detail-item">
    <h4>Total Floors</h4>
    <p>{property.totalFloors}</p>
  </div>

  <div className="detail-item">
    <h4>Property Age</h4>
    <p>{property.propertyAge}</p>
  </div>

  <div className="detail-item">
    <h4>Facing</h4>
    <p>{property.facing}</p>
  </div>

  <div className="detail-item">
    <h4>Furnishing</h4>
    <p>{property.furnishing}</p>
  </div>

  <div className="detail-item">
    <h4>Car Parking</h4>
    <p>{property.carParking}</p>
  </div>

  <div className="detail-item">
    <h4>Bike Parking</h4>
    <p>{property.bikeParking}</p>
  </div>

  <div className="detail-item">
    <h4>City</h4>
    <p>{property.city}</p>
  </div>

  <div className="detail-item">
    <h4>Pin Code</h4>
    <p>{property.pinCode}</p>
  </div>

  <div className="detail-item">
    <h4>Broker Name</h4>
    <p>{property.brokerName}</p>
  </div>

  <div className="detail-item">
    <h4>Agency Name</h4>
    <p>{property.agencyName}</p>
  </div>


</div>
<div className="amenities">
  <h3>Amenities</h3>

  <div className="amenity-grid">

    <span>
      🏊 Swimming Pool : {property.swimmingPool}
    </span>

    <span>
      🛗 Lift : {property.lift}
    </span>

    <span>
      🏋️ Gym : {property.gym}
    </span>

  </div>
</div>

  {property.googleMapUrl && (
    
    <a
      href={property.googleMapUrl}
      target="_blank"
      rel="noreferrer"
    >
  <button className="map-btn">
  📍 View On Google Maps
</button>
    </a>
  )}
</div>

       <div className="contact-buttons">
        <div className="share-section">
  <button className="premium-share-btn"

 onClick={() => {
  const link = window.location.href;

  const message = `🏠 ${property.title}

💰 ₹${property.price}

📍 ${property.location}

${link}`;

  setShareData({
    open: true,
    message,
  });
}}
>
  🔗 Share
</button>
</div>
<button
className="inquiry-btn"
onClick={() =>
navigate(
`/add-lead?propertyId=${property._id}&title=${encodeURIComponent(property.title)}`
)
}
>
📩 Send Inquiry
</button>
  <a
    href={`https://wa.me/${property.whatsapp}`}
    target="_blank"
    rel="noreferrer"
  >
    <button className="whatsapp-btn">
      WhatsApp
    </button>
  </a>

  <a href={`tel:${property.phone}`}>
    <button className="call-btn">
      Call Agent
    </button>
  </a>

</div>

 <div className="contact-buttons">
  
</div>

{shareData.open && (
<div className="share-popup">

  <div className="share-box">

    <button
      className="share-close"
      onClick={() =>
        setShareData({
          open:false,
          message:""
        })
      }
    >
      ×
    </button>

    <h2>Share Property</h2>

    <p className="share-subtitle">
      Share this property with your contacts
    </p>

    <textarea
      className="share-message"
      value={shareData.message}
      readOnly
    />

    <div className="quick-share">
  <h4>Quick Share</h4>

  <div className="share-icons">

    <div
      className="share-icon"
      onClick={() =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            shareData.message
          )}`
        )
      }
    >
      <div className="share-circle">🟢</div>
      <span>WhatsApp</span>
    </div>

    <div
      className="share-icon"
      onClick={async () => {
        await navigator.clipboard.writeText(
          shareData.message
        );
      }}
    >
      <div className="share-circle">🔗</div>
      <span>Copy Link</span>
    </div>

  </div>
</div>

    <div className="share-footer">

      <button
        className="copy-btn"
        onClick={async () => {
          await navigator.clipboard.writeText(
            shareData.message
          );
          alert("Copied");
        }}
      >
        Copy Link
      </button>

      <button
        className="share-now-btn"
        onClick={() =>
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              shareData.message
            )}`
          )
        }
      >
        Share Now
      </button>

    </div>

  </div>

</div>
)}

{showViewer && (

  
  <div
    className="image-viewer"
    onClick={() => setShowViewer(false)}
  >
    <span className="close-viewer">
      ✕
    </span>

    <img
      src={getMediaUrl(selectedImage)}
      alt=""
      className="viewer-image"
    />
  </div>
)}

</div>
</div>
);
};

export default PropertyDetails;