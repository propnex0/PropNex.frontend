import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CollectionDetails.css";

const CollectionDetails = () => {

  const { id } = useParams();

  const [listings, setListings] =
    useState<any[]>([]);


  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );



  useEffect(() => {


    const fetchMyListings = async () => {


      try {


        const response = await fetch(
          "https://prop-nex-backend.vercel.app/api/listings/my",
          {
            headers:{
              Authorization:
              `Bearer ${userInfo.token}`
            }
          }
        );


        const data = await response.json();


        console.log(
          "MY COLLECTION LISTINGS =",
          data
        );


        setListings(
          Array.isArray(data)
          ? data
          : []
        );


      }
      catch(error){

        console.log(error);

      }


    };


    if(userInfo.token){
      fetchMyListings();
    }


  }, [userInfo.token]);




  const collectionProperties =
    listings.filter(
      (item) =>
        item.propertyType?.toLowerCase() ===
        id?.toLowerCase()
    );




  return (

    <div className="collection-details">


      <h1>
        {id?.toUpperCase()}
      </h1>



      <div className="property-grid">


        {
        collectionProperties.map(
          (item)=>(


          <div
          className="property-card"
          key={item._id}
          >


            <img

            src={
              item.images?.length
              ?
              `https://prop-nex-backend.vercel.app${item.images[0]}`
              :
              "/no-image.png"
            }

            alt=""

            />



            <div className="property-content">


              <h3>
                {item.title}
              </h3>



              <p className="property-price">
                ₹ {item.price}
              </p>



              <span className="property-city">
                📍 {item.city}
              </span>



              <Link
              to={`/property/${item._id}`}
              >

                <button
                className="view-details-btn"
                >

                  View Details

                </button>

              </Link>


            </div>


          </div>


          ))
        }



      </div>


    </div>

  );

};


export default CollectionDetails;