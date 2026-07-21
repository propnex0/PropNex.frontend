import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../AddListing/AddListing.css";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Live");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] =
    useState("Apartment");
  const [description, setDescription] =
    useState("");
    const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `https://prop-nex-backend.vercel.app/api/listings/${id}`
        );

        const data = await response.json();

        setTitle(data.title || "");
        setPrice(data.price || "");
        setLocation(data.location || "");
        setStatus(data.status || "Live");
        setPropertyType(
          data.propertyType || "Apartment"
        );
        setDescription(data.description || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, [id]);

  const updateHandler = async (
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
    formData.append("propertyType", propertyType);
    formData.append("description", description);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const response = await fetch(
      `https://prop-nex-backend.vercel.app/api/listings/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Listing Updated Successfully");

    navigate("/listings");
  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

  return (
    <div className="add-listing">
      <h1>Edit Listing</h1>

      <form
        className="listing-form"
        onSubmit={updateHandler}
      >
        <div className="form-group">
          <label>Property Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Property Title"
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
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Price"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Location"
          />
        </div>

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
            <option>Plot</option>
            <option>Commercial</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Description"
          />
        </div>
<div className="upload-box">
  <label><p>📸 Upload Property Images</p></label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) =>
      setImages(e.target.files)
    }
  />
  
</div>

        <button
          type="submit"
          className="submit-btn"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListing;