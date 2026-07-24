import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./EditProfile.css";

const EditProfile = () => {

const navigate = useNavigate();

const [name,setName]=useState("");
const [agencyName,setAgencyName]=useState("");
const [phone,setPhone]=useState("");
const [bio,setBio]=useState("");
const [whatsapp,setWhatsapp]=useState("");
const [city,setCity]=useState("");
const [reraNumber,setReraNumber]=useState("");
const [experience, setExperience] = useState<string>("");
const [dealsClosed, setDealsClosed] = useState<string>("");

const [facebook,setFacebook]=useState("");
const [instagram,setInstagram]=useState("");
const [linkedin,setLinkedin]=useState("");

const [preview,setPreview]=useState("");
const [photo,setPhoto]=useState<File|null>(null);



useEffect(()=>{

fetchProfile();

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


if(!res.ok){
throw new Error(data.message);
}


setName(data.name || "");
setAgencyName(data.agencyName || "");
setPhone(data.phone || "");
setBio(data.bio || "");

setWhatsapp(data.whatsapp || "");
setCity(data.city || "");
setReraNumber(data.reraNumber || "");

setExperience(
data.experience ?? ""
);

setDealsClosed(
data.dealsClosed ?? ""
);


setFacebook(data.facebook || "");
setInstagram(data.instagram || "");
setLinkedin(data.linkedin || "");



if(data.photo){

setPreview(
`https://prop-nex-backend.vercel.app${data.photo}`
);

}



}catch(error){

console.log(error);

}

};






const saveProfile = async()=>{


try{


const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);



const formData = new FormData();


formData.append("name",name);
formData.append("agencyName",agencyName);
formData.append("phone",phone);
formData.append("bio",bio);

formData.append("whatsapp",whatsapp);
formData.append("city",city);
formData.append("reraNumber",reraNumber);

formData.append(
"experience",
experience
);

formData.append(
"dealsClosed",
dealsClosed
);


formData.append(
"facebook",
facebook
);

formData.append(
"instagram",
instagram
);

formData.append(
"linkedin",
linkedin
);



if(photo){

formData.append(
"photo",
photo
);

}





const res = await fetch(

"https://prop-nex-backend.vercel.app/api/auth/profile",

{

method:"PUT",

headers:{
Authorization:`Bearer ${userInfo.token}`
},

body:formData

}

);



const data = await res.json();


if(!res.ok){

throw new Error(data.message);

}




localStorage.setItem(

"userInfo",

JSON.stringify({

...data,

token:userInfo.token

})

);




alert(
"Profile Updated Successfully"
);


navigate("/profile");



}catch(error){

console.log(error);

alert(
"Update Failed"
);

}


};





return(
     <>
      <Sidebar />
      <Header />

<div className="edit-profile">


<h1>Edit Profile</h1>



<div className="profile-header">


<div className="photo-section">


<img

src={
preview || "/default-avatar.png"
}

className="profile-preview"

/>



<input

type="file"

accept="image/*"

onChange={(e)=>{


const file =
e.target.files?.[0];


if(file){

setPhoto(file);

setPreview(
URL.createObjectURL(file)
);

}


}}

/>



</div>





<div className="profile-card">


<h2>
{name || "Broker Name"}
</h2>


<p>
{agencyName}
</p>


<span>
{city}
</span>


</div>


</div>





<div className="stats-row">


<div className="stat-box">

<h3>
{experience || 0}
</h3>

<p>
Years Exp.
</p>


</div>



<div className="stat-box">

<h3>
{dealsClosed || 0}
</h3>

<p>
Deals Closed
</p>

</div>


</div>






<input
placeholder="Broker Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>



<input
placeholder="Agency Name"
value={agencyName}
onChange={(e)=>setAgencyName(e.target.value)}
/>



<input
placeholder="Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>



<input
placeholder="WhatsApp"
value={whatsapp}
onChange={(e)=>setWhatsapp(e.target.value)}
/>



<input
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
/>




<input
placeholder="RERA Number"
value={reraNumber}
onChange={(e)=>setReraNumber(e.target.value)}
/>




<input
type="number"
placeholder="Experience"
value={experience}
onChange={(e) => setExperience(e.target.value)}
min="0"
/>



<input
type="number"
placeholder="Deals Closed"
value={dealsClosed}
onChange={(e) => setDealsClosed(e.target.value)}
min="0"
/>





<textarea

placeholder="About Broker"

value={bio}

onChange={(e)=>setBio(e.target.value)}

/>





<h3>
Social Links
</h3>




<input
placeholder="Facebook URL"
value={facebook}
onChange={(e)=>setFacebook(e.target.value)}
/>



<input
placeholder="Instagram URL"
value={instagram}
onChange={(e)=>setInstagram(e.target.value)}
/>



<input
placeholder="LinkedIn URL"
value={linkedin}
onChange={(e)=>setLinkedin(e.target.value)}
/>





<button

className="save-btn"

onClick={saveProfile}

>

Save Profile

</button>




</div>
</>
);

};


export default EditProfile;