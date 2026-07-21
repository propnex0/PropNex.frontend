import "./Collections.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Collections = () => {

  const [listings, setListings] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );


  console.log("USER INFO =", userInfo);
  console.log("USER ID =", userInfo.id);


  // Load User Collections
  useEffect(() => {

    if(!userInfo.id) return;

    const savedCollections = JSON.parse(
      localStorage.getItem(
        `collections_${userInfo.id}`
      ) || "[]"
    );

    setCollections(savedCollections);


  }, [userInfo.id]);




  // Fetch User Listings
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
          "MY LISTINGS =",
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






  const createCollection = () => {


    const name = prompt(
      "Collection Name"
    );


    if(!name) return;



    const newCollection = {

      id: Date.now(),

      name:name,

      properties:[]

    };



    const updatedCollections = [

      ...collections,

      newCollection

    ];



    localStorage.setItem(

      `collections_${userInfo.id}`,

      JSON.stringify(
        updatedCollections
      )

    );


    setCollections(
      updatedCollections
    );


  };






  const deleteCollection = (id:number)=>{


    const updatedCollections =
      collections.filter(
        (c)=>c.id !== id
      );



    localStorage.setItem(

      `collections_${userInfo.id}`,

      JSON.stringify(
        updatedCollections
      )

    );


    setCollections(
      updatedCollections
    );


  };






  const apartmentCount =
    listings.filter(
      item =>
      item.propertyType === "Apartment"
    ).length;



  const villaCount =
    listings.filter(
      item =>
      item.propertyType === "Villa"
    ).length;



  const plotCount =
    listings.filter(
      item =>
      item.propertyType === "Plot"
    ).length;



  const commercialCount =
    listings.filter(
      item =>
      item.propertyType === "Commercial"
    ).length;



  return (

    <>

      <Sidebar />

      <Header />


      <div className="collections">


        <div className="collection-header">

          <h1>
            Collections
          </h1>


          <button
          className="create-set-btn"
          onClick={createCollection}
          >

          + Create Set

          </button>


        </div>




        <div className="collection-grid">



          <Link
          to="/collection/apartment"
          className="collection-card"
          >

            <div className="collection-cover">
              🏢
            </div>

            <h3>
              Apartment
            </h3>

            <p>
              {apartmentCount} Properties
            </p>

          </Link>





          <Link
          to="/collection/villa"
          className="collection-card"
          >

            <div className="collection-cover">
              🏠
            </div>

            <h3>
              Villa
            </h3>

            <p>
              {villaCount} Properties
            </p>

          </Link>





          <Link
          to="/collection/plot"
          className="collection-card"
          >

            <div className="collection-cover">
              🌳
            </div>

            <h3>
              Plot
            </h3>

            <p>
              {plotCount} Properties
            </p>

          </Link>





          <Link
          to="/collection/commercial"
          className="collection-card"
          >

            <div className="collection-cover">
              🏬
            </div>

            <h3>
              Commercial
            </h3>

            <p>
              {commercialCount} Properties
            </p>

          </Link>





          {
          collections.map(
            (collection)=>(

            <div
            key={collection.id}
            className="collection-card"
            >

              <div className="collection-cover">
                📁
              </div>


              <h3>
                {collection.name}
              </h3>


              <p>
                {
                collection.properties?.length || 0
                }
                {" "}
                Properties
              </p>


              <button

              className="delete-collection-btn"

              onClick={()=>deleteCollection(collection.id)}

              >

              Delete

              </button>


            </div>

            )
          )
          }



        </div>


      </div>


    </>

  );

};


export default Collections;