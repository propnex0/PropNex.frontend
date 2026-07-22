import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./Profile.css";
const getMediaUrl = (url: string) => {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `https://prop-nex-backend.vercel.app${url}`;
};


const Profile = () => {


const navigate = useNavigate();


const [user,setUser] = useState<any>({});
const [properties,setProperties] = useState<any[]>([]);



useEffect(()=>{

fetchProfile();
fetchProperties();

},[]);





const fetchProfile = async()=>{


try{


const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);



const res = await fetch(
"https://prop-nex-backend.vercel.app/api/auth/profile",
{
headers:{
Authorization:`Bearer ${userInfo.token}`
}
}
);



const data = await res.json();

console.log("PROFILE =", data);
console.log("PHOTO =", data.photo);

setUser(data);



}catch(error){

console.log(error);

}


};








const fetchProperties = async()=>{


try{


const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);



const res = await fetch(
"https://prop-nex-backend.vercel.app/api/listings/my",
{
headers:{
Authorization:`Bearer ${userInfo.token}`
}
}
);



const data = await res.json();



setProperties(
Array.isArray(data)
?
data
:
[]
);



}catch(error){

console.log(error);

}


};








const deleteProperty = async(id:string)=>{


try{


const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);



const res = await fetch(

`https://prop-nex-backend.vercel.app/api/listings/${id}`,

{

method:"DELETE",

headers:{
Authorization:`Bearer ${userInfo.token}`
}

}

);




if(res.ok){


setProperties(

prev =>
prev.filter(
(item)=>item._id !== id
)

);


}



}catch(error){

console.log(error);

}


};








return(
   <>
      <Sidebar />
      <Header />


<div className="profile-page">





<div className="profile-banner">


<div className="banner-buttons">


<button

onClick={()=>
navigate("/edit-profile")
}

>

Edit

</button>



<button>

Share

</button>


</div>


</div>








<div className="profile-card">





<div className="profile-avatar">


{

user.photo ?


<img

src={getMediaUrl(user.photo)}

alt="profile"

/>


:


user.name
?
user.name.charAt(0)
:
"K"


}


</div>







<h1>

{
user.name ||
"Khushiram Jat"

}

</h1>






<p>

{
user.agencyName ||
"Agency"

}

</p>








<div className="profile-stats">



<div>

<h2>

{
properties.length

}

</h2>

<span>

LISTINGS

</span>

</div>





<div>

<h2>

{
user.experience || 0

}

</h2>


<span>

YRS EXP

</span>


</div>



</div>









<div className="profile-buttons">



<a

href={
user.whatsapp
?
`https://wa.me/${user.whatsapp}`
:
`https://wa.me/${user.phone}`
}

className="whatsapp-btn"

target="_blank"

>

WhatsApp

</a>






<a

href={
`tel:${user.phone}`
}

className="call-btn"

>

Call

</a>




</div>





</div>









<div className="properties-section">





<div className="properties-head">


<h2>

Properties

</h2>



<div className="count">

{
properties.length

}

</div>



</div>







<p className="hide-text">

Tap × on any card to hide it from your mini-site.

</p>









<div className="property-grid">





{

properties.map(

(property:any)=>(



<div


className="property-card"


key={property._id}



onClick={()=>


navigate(`/property/${property._id}`)


}


>







<button


className="close-btn"



onClick={(e)=>{


e.stopPropagation();


deleteProperty(property._id);


}}


>


×

</button>










<div className="property-image">


{

property.images &&
property.images.length > 0


?


<img


src={getMediaUrl(property.images[0])}


alt="property"


/>



:


"🏠"


}



</div>










<div className="property-info">



<h3>

{
property.title ||
"Property"

}

</h3>





<h3>

{
property.price ||
"Price on Request"

}

</h3>






<p>

{
property.propertyType ||
"Apartment"

}

</p>



</div>






</div>


)


)


}









<div


className="add-card"



onClick={()=>


navigate("/add-listing")


}


>


<span>

+

</span>



<p>

Add listing

</p>



</div>






</div>






</div>









<div className="powered">

Powered by PropNex

</div>






</div>

</>
);


};



export default Profile;