import { FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import API from "../../api/api";


const Header = () => {


const navigate = useNavigate();


const userInfo = JSON.parse(
  localStorage.getItem("userInfo") || "{}"
);



const [notifications,setNotifications] =
useState<any[]>([]);


const [showNotifications,setShowNotifications] =
useState(false);


const [notificationRead,setNotificationRead] =
useState(false);





const loadNotifications = async()=>{


try{


const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);



const res = await fetch(

"https://prop-nex-backend.vercel.app/api/leads",

{
headers:{
Authorization:
`Bearer ${userInfo.token}`
}
}

);
const response = await API.get('/leads',{
  headers:{
    Authorization: `Bearer ${userInfo.token}`
  }
})
console.log(response.data)

const data = await res.json();



console.log(
"HEADER LEADS =",
data
);



const today =
new Date()
.toISOString()
.split("T")[0];



const notificationList = data.filter(

(lead:any)=>{


const followUpToday =

lead.followUp &&

!lead.followUpCompleted &&

new Date(lead.followUp)
.toISOString()
.split("T")[0] === today;



const newLead =
lead.status === "New" &&
!lead.followUpCompleted;



return (
followUpToday ||
newLead
);


}

);



const oldNotificationCount =

Number(
localStorage.getItem(
"notificationCount"
) || 0
);



if(
notificationList.length !== oldNotificationCount
){


setNotificationRead(false);


localStorage.setItem(

"notificationCount",

notificationList.length.toString()

);


}



setNotifications(
notificationList
);



}
catch(error){

console.log(error);

}


};






useEffect(()=>{


loadNotifications();



const interval = setInterval(()=>{

loadNotifications();

},30000);



return()=>clearInterval(interval);



},[]);







const clearAll = ()=>{


setNotifications([]);


setNotificationRead(true);



localStorage.setItem(
"notificationCount",
"0"
);



};






return(


<header className="app-header">





<div className="logo">

<img
  src="/logo.png"
  alt="PropNex"
  className="site-logo"
/>

</div>







<div className="header-right">







<div
className="avatar"

onClick={()=>navigate("/profile")}

style={{
cursor:"pointer"
}}

>


{

userInfo.photo ?


<img

src={
userInfo.photo.startsWith("http")
?
userInfo.photo
:
`https://prop-nex-backend.vercel.app${userInfo.photo}`
}

alt="Profile"

className="avatar-img"

/>


:

userInfo.name?.charAt(0)


}


</div>









<button

className="logout-btn"

onClick={()=>{


localStorage.removeItem(
"userInfo"
);


window.location.href="/login";


}}

>

Logout

</button>









<div

className="bell-box"

onClick={()=>{


setShowNotifications(
!showNotifications
);


setNotificationRead(true);


}}

>


<FiBell />



{

notifications.length > 0 &&

!notificationRead &&


<span className="bell-count">

{
notifications.length
}

</span>


}



</div>









{

showNotifications &&


<div className="notification-box">



<h3>
🔔 Notifications
</h3>





<button

className="clear-btn"

onClick={(e)=>{


e.stopPropagation();


clearAll();


}}

>

Clear All

</button>







{

notifications.length === 0 ?


<p>
No Notifications
</p>



:


notifications.map(

(lead:any)=>(


<div

key={lead._id}

className="notification-item"


onClick={()=>{


navigate(
`/lead/${lead._id}`
);


setShowNotifications(false);


}}


>



<h4>
{lead.name}
</h4>




<p>

{

lead.status === "New"

?

"🆕 New Lead Received"

:

"📅 Follow Up Today"

}

</p>




<p>
📞 {lead.phone}
</p>



<p>
🏠 {lead.property}
</p>




</div>


)

)

}



</div>



}









</div>






</header>


);


};


export default Header;
