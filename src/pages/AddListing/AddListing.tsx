import { useState } from "react";
import "./AddListing.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const AddListing = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Live");
const [price, setPrice] = useState("");
const [location, setLocation] = useState("");
const [propertyType, setPropertyType] = useState("Apartment");
const [description, setDescription] = useState("");
const [phone, setPhone] = useState("");
const [whatsapp, setWhatsapp] = useState("");
const [images, setImages] = useState<FileList | null>(null);

const [transactionType, setTransactionType] =
  useState("Sale");

const [bhk, setBhk] = useState("");

const [carpetArea, setCarpetArea] =
  useState("");

const [builtUpArea, setBuiltUpArea] =
  useState("");

const [superBuiltUpArea, setSuperBuiltUpArea] =
  useState("");

const [bathrooms, setBathrooms] =
  useState("");

const [balconies, setBalconies] =
  useState("");

const [floor, setFloor] =
  useState("");

const [totalFloors, setTotalFloors] =
  useState("");

const [propertyAge, setPropertyAge] =
  useState("");

const [facing, setFacing] =
  useState("");

const [furnishing, setFurnishing] =
  useState("");

const [carParking, setCarParking] =
  useState("");

const [bikeParking, setBikeParking] =
  useState("");

const [city, setCity] =
  useState("");

const [pinCode, setPinCode] =
  useState("");

const [googleMapUrl, setGoogleMapUrl] =
  useState("");

const [brokerName, setBrokerName] =
  useState("");

const [agencyName, setAgencyName] =
  useState("");


  const [swimmingPool, setSwimmingPool] =
  useState("No");

const [lift, setLift] =
  useState("No");

const [gym, setGym] =
  useState("No");

  const [video, setVideo] =
  useState<File | null>(null);

  const [agentPhoto, setAgentPhoto] =
  useState<File | null>(null);



const submitHandler = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append(
  "status",
  status
);
    formData.append("price", price);
    formData.append("location", location);
    formData.append(
      "propertyType",
      propertyType
    );
    formData.append(
  "description",
  description
);

formData.append("phone", phone);
formData.append("whatsapp", whatsapp);
formData.append(
  "transactionType",
  transactionType
);

formData.append("bhk", bhk);

formData.append(
  "carpetArea",
  carpetArea
);

formData.append(
  "builtUpArea",
  builtUpArea
);

formData.append(
  "superBuiltUpArea",
  superBuiltUpArea
);

formData.append(
  "bathrooms",
  bathrooms
);

formData.append(
  "balconies",
  balconies
);

formData.append(
  "floor",
  floor
);

formData.append(
  "totalFloors",
  totalFloors
);

formData.append(
  "propertyAge",
  propertyAge
);

formData.append(
  "facing",
  facing
);

formData.append(
  "furnishing",
  furnishing
);

formData.append(
  "carParking",
  carParking
);

formData.append(
  "bikeParking",
  bikeParking
);

formData.append(
  "city",
  city
);

formData.append(
  "pinCode",
  pinCode
);

formData.append(
  "googleMapUrl",
  googleMapUrl
);

formData.append(
  "brokerName",
  brokerName
);

formData.append(
  "agencyName",
  agencyName
);

if (agentPhoto) {
  formData.append(
    "agentPhoto",
    agentPhoto
  );
}




formData.append(
  "swimmingPool",
  swimmingPool
);

formData.append(
  "lift",
  lift
);

formData.append(
  "gym",
  gym
);

if (images) {
  for (let i = 0; i < images.length; i++) {
    formData.append(
      "images",
      images[i]
    );
  }
}


if (video) {
  formData.append("video", video);
}

   
const userInfo = JSON.parse(
  localStorage.getItem("userInfo") || "{}"
);
   const response = await fetch(
"https://prop-nex-frontend.vercel.app/api/listings",
{
  method:"POST",

  headers:{
    Authorization:`Bearer ${userInfo.token}`
  },

  body:formData
}
);

    const data = await response.json();

    console.log(data);
    console.log("LISTING DATA =", data);
    console.log("SELECTED STATUS =", status);

const savedAgency = JSON.parse(
  localStorage.getItem("agency") || "null"
);

if (savedAgency) {

  savedAgency.listings = Array.isArray(
    savedAgency.listings
  )
    ? savedAgency.listings
    : [];

  const listingId =
    data._id ||
    data.listing?._id;

  if (listingId) {

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

    console.log(
      "Agency Updated",
      savedAgency
    );
  }
}

    alert(
      "Property Created Successfully"
    );

    setTitle("");
    setPrice("");
    setLocation("");
    setPropertyType("Apartment");
    setDescription("");
  } catch (error) {
    console.log(error);
    alert("Failed To Create Property");
  }
};
  return (
      <>
      <Sidebar />
      <Header />
    <div className="add-listing">

     <h1>🏠 Create Listing</h1>

<form
  className="listing-form"
  onSubmit={submitHandler}
>
  <div className="form-group">
        <div className="form-group">
          <label>Property Title</label>
        <input
  type="text"
  placeholder="Luxury Apartment"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
<div className="form-group">

<label>Status</label>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="Live">
Publish Live
</option>

<option value="Draft">
Save Draft
</option>

</select>

</div>
        </div>

        <div className="form-group">
          <label>Price</label>
         <input
  type="text"
  placeholder="₹ 45,00,000"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>
        </div>

        <div className="form-group">
          <label>Location</label>
         <input
  type="text"
  placeholder="Jaipur, Rajasthan"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>
        </div>

        <div className="form-group">
          <label>Property Type</label>

          <select
  value={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
>
  <option value="">Select property type</option>
  <option>Apartment</option>
  <option>Villa</option>
  <option>Plot</option>
  <option>Commercial</option>
</select>

<select
  value={transactionType}
  onChange={(e) => setTransactionType(e.target.value)}
>
  <option value="">Select transaction type</option>
  <option>Sale</option>
  <option>Rent</option>
  <option>Lease</option>
</select>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
  rows={5}
  placeholder="Property description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
        </div>
        </div>

        <div className="form-group">
        <div className="form-group">
  <label>Phone Number</label>

  <input
    type="text"
    placeholder="91+"
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
    placeholder="91+"
    value={whatsapp}
    onChange={(e) =>
      setWhatsapp(e.target.value)
    }
  />
  </div>
  </div>

<div className="form-group">

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

<div className="form-group">
  <label>Bathrooms</label>

  <input
    type="text"
    placeholder="2"
    value={bathrooms}
    onChange={(e) =>
      setBathrooms(e.target.value)
    }
  />
</div>


<div className="form-group">
  <label>Carpet Area (sq ft)</label>
  <input
    type="text"
    placeholder="Enter carpet area in sq ft"
    value={carpetArea}
    onChange={(e) =>
      setCarpetArea(e.target.value)
    }
  />
</div>



<div className="form-group">
  <label>Built Up Area</label>
  <input
    type="text"
    placeholder="Enter built up area in sq ft"
    value={builtUpArea}
    onChange={(e) => setBuiltUpArea(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Super Built Up Area</label>
  <input
    type="text"
    placeholder="Enter super built up area in sq ft"
    value={superBuiltUpArea}
    onChange={(e) => setSuperBuiltUpArea(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Balconies</label>
  <input
    type="text"
    placeholder="Enter number of balconies"
    value={balconies}
    onChange={(e) => setBalconies(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Floor</label>
  <input
    type="text"
    placeholder="Enter floor number"
    value={floor}
    onChange={(e) => setFloor(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Total Floors</label>
  <input
    type="text"
    placeholder="Enter total floors in building"
    value={totalFloors}
    onChange={(e) => setTotalFloors(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Property Age</label>
  <input
    type="text"
    placeholder="Enter property age"
    value={propertyAge}
    onChange={(e) => setPropertyAge(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Facing</label>
  <select
    value={facing}
    onChange={(e) => setFacing(e.target.value)}
  >
    <option value="">Select property facing</option>
    <option>North</option>
    <option>South</option>
    <option>East</option>
    <option>West</option>
  </select>
</div>

<div className="form-group">
  <label>Furnishing</label>
  <select
    value={furnishing}
    onChange={(e) => setFurnishing(e.target.value)}
  >
    <option value="">Select furnishing type</option>
    <option>Furnished</option>
    <option>Semi Furnished</option>
    <option>Unfurnished</option>
  </select>
</div>

<div className="form-group">
  <label>Car Parking</label>
  <input
    type="text"
    placeholder="Enter car parking count"
    value={carParking}
    onChange={(e) => setCarParking(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Bike Parking</label>
  <input
    type="text"
    placeholder="Enter bike parking count"
    value={bikeParking}
    onChange={(e) => setBikeParking(e.target.value)}
  />
</div>
</div>

<div className="form-group">
<div className="form-group">
  <label>City</label>
  <input
    type="text"
    placeholder="Enter city name"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Pin Code</label>
  <input
    type="text"
    placeholder="Enter pin code"
    value={pinCode}
    onChange={(e) => setPinCode(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Google Map URL</label>
  <input
    type="text"
    placeholder="Paste Google Maps link"
    value={googleMapUrl}
    onChange={(e) => setGoogleMapUrl(e.target.value)}
  />  
</div>
</div>


<div className="form-group">

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

<div className="form-group">

<div className="form-group">
  <label>Broker Name</label>

  <input
    type="text"
    placeholder="Enter broker name"
    value={brokerName}
    onChange={(e) =>
      setBrokerName(e.target.value)
    }
  />
</div>

<div className="form-group">
  <label>Agency Name</label>

  <input
    type="text"
    placeholder="Enter agency name"
    value={agencyName}
    onChange={(e) =>
      setAgencyName(e.target.value)
    }
  />
</div>
<div className="form-group">
  <label>Agent Photo</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setAgentPhoto(e.target.files?.[0] || null)
    }
  />
</div>
</div>

<div className="form-group">

        <div className="upload-box">
          <p>📸 Upload Property Images</p>
<input
  type="file"
  multiple
  onChange={(e) =>
    setImages(e.target.files)
  }
/> 

       </div>
       <div className="upload-box">
  <label><p>🎥 Property Video (Max 1 Video)</p></label>

  <input
    type="file"
    accept="video/*"
    onChange={(e) =>
      setVideo(
        e.target.files?.[0] || null
      )
    }
  />
</div>
</div>



        <button
          type="submit"
          className="submit-btn"
        >
          Create Listing
        </button>

      </form>

    </div>
    </>
  );
};

export default AddListing;