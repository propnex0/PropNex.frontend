import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./Listings.css";



const getMediaUrl = (url: string) => {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `https://prop-nex-backend.vercel.app${url}`;
};
const Listings = () => {
  const navigate = useNavigate();
const deleteHandler = async (id: string) => {
  try {

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo") || "{}"
    );

    await fetch(
      `https://prop-nex-backend.vercel.app/api/listings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setListings(
      listings.filter(
        (item: any) => item._id !== id
      )
    );

    const savedAgency = JSON.parse(
      localStorage.getItem("agency") || "null"
    );

    if (savedAgency) {
      savedAgency.listings =
        (savedAgency.listings || []).filter(
          (listing: any) =>
            listing._id !== id
        );

      localStorage.setItem(
        "agency",
        JSON.stringify(savedAgency)
      );
    }

    alert("Listing Deleted");

  } catch (error) {
    console.log(error);
  }
};
  const [listings, setListings] = useState<Array<any>>([]);
  const [deleteId, setDeleteId] =
  useState<string | null>(null);

const [shareData, setShareData] = useState({
  open: false,
  message: "",
});

const [search, setSearch] = useState("");

const [activeTab, setActiveTab] =
  useState("All");

useEffect(() => {
  const fetchListings = async () => {
    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );

      const response = await fetch(
        "https://prop-nex-backend.vercel.app/api/listings/my",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const data = await response.json();
console.log("MY LISTINGS =", data);
console.log("FIRST IMAGES =", data[0]?.images);

      console.log("MY LISTINGS =", data);

      setListings(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.log(error);
    }
  };

  fetchListings();
}, []);
  return (
      <>
      <Sidebar />
      <Header />
    <div className="listings-page">

     <div className="page-header">
  <h1>My Listings</h1>

  <button
    className="add-btn"
    onClick={() => navigate("/add-listing")}
  >
    +
  </button>
</div>

      <div className="search-box">
      <input
  type="text"
  placeholder="Search properties..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>
      </div>

      <div className="tabs">

  <button
    className={
      activeTab === "All"
        ? "active-tab"
        : ""
    }
    onClick={() =>
      setActiveTab("All")
    }
  >
    All
  </button>

  <button
    className={
      activeTab === "Live"
        ? "active-tab"
        : ""
    }
    onClick={() =>
      setActiveTab("Live")
    }
  >
    Live
  </button>

  <button
    className={
      activeTab === "Draft"
        ? "active-tab"
        : ""
    }
    onClick={() =>
      setActiveTab("Draft")
    }
  >
    Draft
  </button>

</div>

      {listings
  .filter((item:any)=>{

  const matchesSearch =
    item.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchesTab =
    activeTab === "All"
      ? true
      : item.status === activeTab;

  return (
    matchesSearch &&
    matchesTab
  );
})
  .map((item: any) => (
  <div
  className="listing-item"
  key={item._id}
  onClick={() =>
  navigate(`/property/${item._id}`, {
    state: {
      fromApp: true,
    },
  })
}
  style={{ cursor: "pointer" }}
>
    <div className="listing-top">

  <div className="listing-left">

    <img
  className="listing-thumb"
  src={
    item.images?.length
      ? getMediaUrl(item.images[0])
      : "https://placehold.co/300x300?text=No+Image"
  }
  alt={item.title}
  onError={(e) => {
    e.currentTarget.src =
      "https://placehold.co/300x300?text=No+Image";
  }}
/>

  </div>

  <div className="listing-center">

    <h2 className="listing-price">
      ₹ {item.price}
    </h2>

    <h3 className="listing-title">
      {item.title}
    </h3>

    <div className="listing-meta">

      <span>
        📍 {item.location}
      </span>

      

      <span>
        • {item.transactionType || "For Sale"}
      </span>

    </div>

  </div>

  <div className="listing-right">

    <span
      className={
        item.status === "Live"
          ? "live-badge"
          : "draft-badge"
      }
    >
      {item.status}
    </span>

    <div className="listing-views">
      👁 {item.views || 0}
    </div>

  </div>

</div>

    <div className="listing-actions">

  <button
    className="action-btn share-btn"
    onClick={(e) => {
      e.stopPropagation();

      const link =
        `${window.location.origin}/property/${item._id}`;

      const message = `🏠 ${item.title}

💰 ₹${item.price}

📍 ${item.location}

View Property:
${link}`;

      if (navigator.share) {
        navigator.share({
          title: item.title,
          text: message,
          url: link,
        });
      } else {
        setShareData({
          open: true,
          message,
        });
      }
    }}
  >
    🔗 Share
  </button>

  <button
    className="action-btn"
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/edit-listing/${item._id}`);
    }}
  >
    ✏ Edit
  </button>

  <button
    className="action-btn"
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/property/${item._id}`, {
        state: {
          fromApp: true,
        },
      });
    }}
  >
    👁 Review
  </button>

  <button
    className="action-btn delete-action"
    onClick={(e) => {
      e.stopPropagation();
      setDeleteId(item._id);
    }}
  >
    🗑
  </button>

</div>
  </div>
))}
{listings
  .filter((item: any) =>
    item.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  ).length === 0 && (
  <div className="empty-state">
    <h3>No Listings Found</h3>
    <p>Create your first property listing</p>
  </div>
)}
{deleteId && (
<div className="delete-overlay">

<div className="delete-modal">

<h2>
Delete Listing?
</h2>

<p>
Are you sure you want to delete this property?
</p>

<div className="delete-actions">

<button
onClick={() =>
setDeleteId(null)
}
>
Cancel
</button>


<button
onClick={() => {

deleteHandler(deleteId);

setDeleteId(null);

}}
>
Delete
</button>

</div>

</div>

</div>
)}
  {shareData.open && (
  <div className="share-popup">
    <div className="share-modal">

      <button
        className="close-btn"
        onClick={() =>
          setShareData({
            open: false,
            message: "",
          })
        }
      >
        ✕
      </button>

      <h2>Share Property</h2>

      <p>
        Share this property with your contacts
      </p>

      <textarea
        value={shareData.message}
        readOnly
      />

      <div className="quick-share">

        <button
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(
                shareData.message
              )}`
            )
          }
        >
          WhatsApp
        </button>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText(
              shareData.message
            );

            alert("Copied");
          }}
        >
          Copy Link
        </button>

      </div>

    </div>
  </div>
)}
     </div>
    </>
  );
};

export default Listings;