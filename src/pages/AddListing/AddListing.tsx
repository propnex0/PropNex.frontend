import { useState, useEffect } from "react";
import "./AddListing.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const AddListing = () => {

  /* ==========================
      BASIC INFORMATION
  ========================== */

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Live");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [transactionType, setTransactionType] = useState("Sale");
  const [description, setDescription] = useState("");

  /* ==========================
      CONTACT
  ========================== */

  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  /* ==========================
      PROPERTY DETAILS
  ========================== */

  const [bhk, setBhk] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [balconies, setBalconies] = useState("");

  const [carpetArea, setCarpetArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState("");

  const [floor, setFloor] = useState("");
  const [totalFloors, setTotalFloors] = useState("");

  const [propertyAge, setPropertyAge] = useState("");

  const [facing, setFacing] = useState("");
  const [furnishing, setFurnishing] = useState("");

  const [carParking, setCarParking] = useState("");
  const [bikeParking, setBikeParking] = useState("");

  /* ==========================
      LOCATION
  ========================== */

  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");

  /* ==========================
      AMENITIES
  ========================== */

  const [swimmingPool, setSwimmingPool] = useState("No");
  const [lift, setLift] = useState("No");
  const [gym, setGym] = useState("No");

  /* ==========================
      BROKER DETAILS
  ========================== */

  const [brokerName, setBrokerName] = useState("");
  const [agencyName, setAgencyName] = useState("");

  /* ==========================
      FILES
  ========================== */

  const [images, setImages] =
    useState<FileList | null>(null);

  const [video, setVideo] =
    useState<File | null>(null);

  const [agentPhoto, setAgentPhoto] =
    useState<File | null>(null);

  /* ==========================
      PREVIEW
  ========================== */

  const [imagePreview, setImagePreview] =
    useState<string[]>([]);

  const [videoPreview, setVideoPreview] =
    useState("");

  /* ==========================
      LOADING
  ========================== */

  const [loading, setLoading] =
    useState(false);

  /* ==========================
      AUTO FILL BROKER
  ========================== */

  useEffect(() => {

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo") || "{}"
    );

    if (userInfo) {

      setBrokerName(userInfo.name || "");

      setAgencyName(
        userInfo.agencyName || ""
      );

      setPhone(userInfo.phone || "");

      setWhatsapp(
        userInfo.whatsapp || ""
      );

    }

  }, []);
  /* ==========================
      IMAGE PREVIEW
  ========================== */

  useEffect(() => {

    if (!images) {
      setImagePreview([]);
      return;
    }

    const urls = Array.from(images).map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreview(urls);

    return () => {
      urls.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };

  }, [images]);

  /* ==========================
      VIDEO PREVIEW
  ========================== */

  useEffect(() => {

    if (!video) {
      setVideoPreview("");
      return;
    }

    const url = URL.createObjectURL(video);

    setVideoPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };

  }, [video]);

  /* ==========================
      IMAGE CHANGE
  ========================== */

  const imageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    setImages(e.target.files);

  };

  /* ==========================
      VIDEO CHANGE
  ========================== */

  const videoChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    setVideo(e.target.files[0]);

  };

  /* ==========================
      AGENT PHOTO
  ========================== */

  const agentPhotoHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    setAgentPhoto(e.target.files[0]);

  };

  /* ==========================
      VALIDATION
  ========================== */

  const validateForm = () => {

    if (!title.trim()) {
      alert("Please enter property title.");
      return false;
    }

    if (!price.trim()) {
      alert("Please enter property price.");
      return false;
    }

    if (!location.trim()) {
      alert("Please enter property location.");
      return false;
    }

    if (!description.trim()) {
      alert("Please enter description.");
      return false;
    }

    if (!phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    if (!city.trim()) {
      alert("Please enter city.");
      return false;
    }

    if (!images || images.length === 0) {
      alert("Please upload at least one property image.");
      return false;
    }

    return true;

  };
    /* ==========================
      SUBMIT LISTING
  ========================== */

  const submitHandler = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      const formData = new FormData();

      /* -------------------------
          BASIC
      ------------------------- */

      formData.append("title", title);
      formData.append("status", status);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("propertyType", propertyType);
      formData.append("transactionType", transactionType);
      formData.append("description", description);

      /* -------------------------
          CONTACT
      ------------------------- */

      formData.append("phone", phone);
      formData.append("whatsapp", whatsapp);

      /* -------------------------
          PROPERTY
      ------------------------- */

      formData.append("bhk", bhk);
      formData.append("bathrooms", bathrooms);
      formData.append("balconies", balconies);

      formData.append("carpetArea", carpetArea);
      formData.append("builtUpArea", builtUpArea);
      formData.append("superBuiltUpArea", superBuiltUpArea);

      formData.append("floor", floor);
      formData.append("totalFloors", totalFloors);

      formData.append("propertyAge", propertyAge);

      formData.append("facing", facing);
      formData.append("furnishing", furnishing);

      formData.append("carParking", carParking);
      formData.append("bikeParking", bikeParking);

      /* -------------------------
          LOCATION
      ------------------------- */

      formData.append("city", city);
      formData.append("pinCode", pinCode);
      formData.append("googleMapUrl", googleMapUrl);

      /* -------------------------
          AMENITIES
      ------------------------- */

      formData.append("swimmingPool", swimmingPool);
      formData.append("lift", lift);
      formData.append("gym", gym);

      /* -------------------------
          BROKER
      ------------------------- */

      formData.append("brokerName", brokerName);
      formData.append("agencyName", agencyName);

      /* -------------------------
          AGENT PHOTO
      ------------------------- */

      if (agentPhoto) {

        formData.append(
          "agentPhoto",
          agentPhoto
        );

      }

      /* -------------------------
          PROPERTY IMAGES
      ------------------------- */

      if (images) {

        Array.from(images).forEach((image) => {

          formData.append(
            "images",
            image
          );

        });

      }

      /* -------------------------
          VIDEO UPLOAD
      ------------------------- */

      let videoUrl = "";

      if (video) {

        const videoData = new FormData();

        videoData.append(
          "file",
          video
        );

        videoData.append(
          "upload_preset",
          "propnex_upload"
        );

        const uploadResponse =
          await fetch(
            "https://api.cloudinary.com/v1_1/ui7whmwd/video/upload",
            {
              method: "POST",
              body: videoData,
            }
          );

        const uploadJson =
          await uploadResponse.json();

        videoUrl =
          uploadJson.secure_url;

      }

      formData.append(
        "video",
        videoUrl
      );

      /* -------------------------
          USER TOKEN
      ------------------------- */

      const userInfo = JSON.parse(

        localStorage.getItem(
          "userInfo"
        ) || "{}"

      );

      /* -------------------------
          API
      ------------------------- */

      const response =
        await fetch(

          "https://prop-nex-backend.vercel.app/api/listings",

          {

            method: "POST",

            headers: {

              Authorization:
                `Bearer ${userInfo.token}`

            },

            body: formData,

          }

        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(

          data.message ||
          "Upload Failed"

        );

      }

      alert(
        "Property Created Successfully 🎉"
      );

      console.log(data);
            /* -------------------------
          UPDATE AGENCY
      ------------------------- */

      const savedAgency = JSON.parse(
        localStorage.getItem("agency") || "null"
      );

      if (savedAgency) {

        savedAgency.listings = Array.isArray(
          savedAgency.listings
        )
          ? savedAgency.listings
          : [];

        savedAgency.listings.push({
          _id: data._id,
          title: data.title,
          price: data.price,
          location: data.location,
          propertyType: data.propertyType,
        });

        localStorage.setItem(
          "agency",
          JSON.stringify(savedAgency)
        );

      }

      /* -------------------------
          RESET FORM
      ------------------------- */

      setTitle("");
      setStatus("Live");
      setPrice("");
      setLocation("");
      setPropertyType("Apartment");
      setTransactionType("Sale");
      setDescription("");

      setPhone("");
      setWhatsapp("");

      setBhk("");
      setBathrooms("");
      setBalconies("");

      setCarpetArea("");
      setBuiltUpArea("");
      setSuperBuiltUpArea("");

      setFloor("");
      setTotalFloors("");

      setPropertyAge("");

      setFacing("");
      setFurnishing("");

      setCarParking("");
      setBikeParking("");

      setCity("");
      setPinCode("");
      setGoogleMapUrl("");

      setSwimmingPool("No");
      setLift("No");
      setGym("No");

      setBrokerName("");
      setAgencyName("");

      setImages(null);
      setVideo(null);
      setAgentPhoto(null);

      setImagePreview([]);
      setVideoPreview("");

    } catch (error: any) {

      console.error(error);

      alert(
        error.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

  /* ==========================
      JSX
  ========================== */

  return (

    <>

      <Sidebar />

      <Header />

      <div className="add-listing">

        <h1>🏠 Create Listing</h1>

        <form
          className="listing-form"
          onSubmit={submitHandler}
        >{/* ==========================
    BASIC INFORMATION
========================== */}

<div className="form-section">

  <h2 className="section-title">
    🏡 Basic Information
  </h2>

  <div className="form-grid">

    {/* Property Title */}

    <div className="form-group">

      <label>Property Title</label>

      <input
        type="text"
        placeholder="Luxury 3BHK Apartment"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

    </div>

    {/* Status */}

    <div className="form-group">

      <label>Status</label>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >

        <option value="Live">
          Publish Live
        </option>

        <option value="Draft">
          Save as Draft
        </option>

      </select>

    </div>

    {/* Price */}

    <div className="form-group">

      <label>Price</label>

      <input
        type="text"
        placeholder="₹ 45,00,000"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

    </div>

    {/* Location */}

    <div className="form-group">

      <label>Location</label>

      <input
        type="text"
        placeholder="Vaishali Nagar, Jaipur"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
      />

    </div>

    {/* Property Type */}

    <div className="form-group">

      <label>Property Type</label>

      <select
        value={propertyType}
        onChange={(e) =>
          setPropertyType(e.target.value)
        }
      >

        <option>Apartment</option>

        <option>Villa</option>

        <option>Independent House</option>

        <option>Plot</option>

        <option>Penthouse</option>

        <option>Commercial</option>

      </select>

    </div>

    {/* Transaction */}

    <div className="form-group">

      <label>Transaction Type</label>

      <select
        value={transactionType}
        onChange={(e) =>
          setTransactionType(
            e.target.value
          )
        }
      >

        <option>Sale</option>

        <option>Rent</option>

        <option>Lease</option>

      </select>

    </div>

  </div>

  {/* Description */}

  <div className="form-group">

    <label>Description</label>

    <textarea

      rows={6}

      placeholder="Write complete property description..."

      value={description}

      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }

    />

  </div>

</div>

{/* ==========================
    CONTACT INFORMATION
========================== */}

<div className="form-section">

  <h2 className="section-title">
    📞 Contact Information
  </h2>

  <div className="form-grid">

    <div className="form-group">

      <label>Phone Number</label>

      <input
        type="text"
        placeholder="+91 9876543210"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

    </div>

    <div className="form-group">

      <label>WhatsApp Number</label>

      <input
        type="text"
        placeholder="+91 9876543210"
        value={whatsapp}
        onChange={(e) =>
          setWhatsapp(e.target.value)
        }
      />

    </div>

  </div>

</div></form>
  
  {/* ==========================
    PROPERTY DETAILS
========================== */}

<div className="form-section">

  <h2 className="section-title">
    🏠 Property Details
  </h2>

  <div className="form-grid">

    {/* BHK */}

    <div className="form-group">
      <label>BHK</label>

      <input
        type="text"
        placeholder="3 BHK"
        value={bhk}
        onChange={(e) =>
          setBhk(e.target.value)
        }
      />
    </div>

    {/* Bathrooms */}

    <div className="form-group">
      <label>Bathrooms</label>

      <input
        type="number"
        placeholder="2"
        value={bathrooms}
        onChange={(e) =>
          setBathrooms(e.target.value)
        }
      />
    </div>

    {/* Balconies */}

    <div className="form-group">
      <label>Balconies</label>

      <input
        type="number"
        placeholder="2"
        value={balconies}
        onChange={(e) =>
          setBalconies(e.target.value)
        }
      />
    </div>

    {/* Carpet Area */}

    <div className="form-group">
      <label>Carpet Area (Sq.ft)</label>

      <input
        type="text"
        placeholder="1450"
        value={carpetArea}
        onChange={(e) =>
          setCarpetArea(e.target.value)
        }
      />
    </div>

    {/* Built Up */}

    <div className="form-group">
      <label>Built Up Area</label>

      <input
        type="text"
        placeholder="1600"
        value={builtUpArea}
        onChange={(e) =>
          setBuiltUpArea(e.target.value)
        }
      />
    </div>

    {/* Super Built Up */}

    <div className="form-group">
      <label>Super Built Up Area</label>

      <input
        type="text"
        placeholder="1800"
        value={superBuiltUpArea}
        onChange={(e) =>
          setSuperBuiltUpArea(
            e.target.value
          )
        }
      />
    </div>

    {/* Floor */}

    <div className="form-group">
      <label>Floor</label>

      <input
        type="number"
        placeholder="5"
        value={floor}
        onChange={(e) =>
          setFloor(e.target.value)
        }
      />
    </div>

    {/* Total Floors */}

    <div className="form-group">
      <label>Total Floors</label>

      <input
        type="number"
        placeholder="12"
        value={totalFloors}
        onChange={(e) =>
          setTotalFloors(
            e.target.value
          )
        }
      />
    </div>

    {/* Property Age */}

    <div className="form-group">
      <label>Property Age</label>

      <input
        type="text"
        placeholder="2 Years"
        value={propertyAge}
        onChange={(e) =>
          setPropertyAge(
            e.target.value
          )
        }
      />
    </div>

    {/* Facing */}

    <div className="form-group">
      <label>Facing</label>

      <select
        value={facing}
        onChange={(e) =>
          setFacing(e.target.value)
        }
      >
        <option value="">
          Select Facing
        </option>

        <option>North</option>
        <option>South</option>
        <option>East</option>
        <option>West</option>
        <option>North-East</option>
        <option>North-West</option>
        <option>South-East</option>
        <option>South-West</option>

      </select>
    </div>

    {/* Furnishing */}

    <div className="form-group">
      <label>Furnishing</label>

      <select
        value={furnishing}
        onChange={(e) =>
          setFurnishing(
            e.target.value
          )
        }
      >
        <option value="">
          Select Furnishing
        </option>

        <option>Fully Furnished</option>
        <option>Semi Furnished</option>
        <option>Unfurnished</option>

      </select>
    </div>

    {/* Car Parking */}

    <div className="form-group">
      <label>Car Parking</label>

      <input
        type="number"
        placeholder="2"
        value={carParking}
        onChange={(e) =>
          setCarParking(
            e.target.value
          )
        }
      />
    </div>

    {/* Bike Parking */}

    <div className="form-group">
      <label>Bike Parking</label>

      <input
        type="number"
        placeholder="4"
        value={bikeParking}
        onChange={(e) =>
          setBikeParking(
            e.target.value
          )
        }
      />
    </div>

  </div>

</div>{/* ==========================
    LOCATION DETAILS
========================== */}

<div className="form-section">

  <h2 className="section-title">
    📍 Location Details
  </h2>

  <div className="form-grid">

    {/* City */}

    <div className="form-group">

      <label>City</label>

      <input
        type="text"
        placeholder="Jaipur"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
      />

    </div>

    {/* Pin Code */}

    <div className="form-group">

      <label>Pin Code</label>

      <input
        type="text"
        placeholder="302021"
        value={pinCode}
        onChange={(e) =>
          setPinCode(e.target.value)
        }
      />

    </div>

  </div>

  <div className="form-group">

    <label>Google Map URL</label>

    <input
      type="text"
      placeholder="https://maps.google.com/..."
      value={googleMapUrl}
      onChange={(e) =>
        setGoogleMapUrl(e.target.value)
      }
    />

  </div>

</div>

{/* ==========================
    AMENITIES
========================== */}

<div className="form-section">

  <h2 className="section-title">
    🏊 Amenities
  </h2>

  <div className="form-grid">

    <div className="form-group">

      <label>Swimming Pool</label>

      <select
        value={swimmingPool}
        onChange={(e) =>
          setSwimmingPool(e.target.value)
        }
      >
        <option>No</option>
        <option>Yes</option>
      </select>

    </div>

    <div className="form-group">

      <label>Lift</label>

      <select
        value={lift}
        onChange={(e) =>
          setLift(e.target.value)
        }
      >
        <option>No</option>
        <option>Yes</option>
      </select>

    </div>

    <div className="form-group">

      <label>Gym</label>

      <select
        value={gym}
        onChange={(e) =>
          setGym(e.target.value)
        }
      >
        <option>No</option>
        <option>Yes</option>
      </select>

    </div>

  </div>

</div>

{/* ==========================
    BROKER DETAILS
========================== */}

<div className="form-section">

  <h2 className="section-title">
    👨‍💼 Broker Details
  </h2>

  <div className="form-grid">

    <div className="form-group">

      <label>Broker Name</label>

      <input
        type="text"
        value={brokerName}
        readOnly
      />

    </div>

    <div className="form-group">

      <label>Agency Name</label>

      <input
        type="text"
        value={agencyName}
        readOnly
      />

    </div>

  </div>

  <div className="form-group">

    <label>Agent Photo</label>

    <input
      type="file"
      accept="image/*"
      onChange={agentPhotoHandler}
    />

  </div>

</div>{/* ==========================
    PROPERTY MEDIA
========================== */}

<div className="form-section">

  <h2 className="section-title">
    📸 Property Media
  </h2>

  {/* Images Upload */}

  <div className="upload-box">

    <p>📷 Upload Property Images</p>

    <input
      type="file"
      multiple
      accept="image/*"
      onChange={imageChangeHandler}
    />

    <small className="upload-hint">
      Upload high-quality property images.
    </small>

  </div>

  {/* Image Preview */}

  {imagePreview.length > 0 && (

    <div className="preview-grid">

      {imagePreview.map((image, index) => (

        <div
          className="preview-card"
          key={index}
        >

          <img
            src={image}
            alt={`Preview ${index + 1}`}
          />

        </div>

      ))}

    </div>

  )}

  {/* Video Upload */}

  <div className="upload-box">

    <p>🎥 Property Video</p>

    <input
      type="file"
      accept="video/*"
      onChange={videoChangeHandler}
    />

    <small className="upload-hint">
      Upload one property walkthrough video.
    </small>

  </div>

  {/* Video Preview */}

  {videoPreview && (

    <div className="video-preview">

      <video
        controls
        src={videoPreview}
      />

    </div>

  )}

</div>

{/* ==========================
    SUBMIT BUTTON
========================== */}

<button
  type="submit"
  className="submit-btn"
  disabled={loading}
>

  {

    loading

      ? "Uploading Listing..."

      : "🏠 Create Listing"

  }

</button>

</form>

</div>

</>

);

};

export default AddListing;