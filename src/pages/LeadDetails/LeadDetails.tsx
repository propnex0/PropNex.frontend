import "./LeadDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const LeadDetails = () => {
    const userInfo = JSON.parse(
  localStorage.getItem("userInfo") || "{}"
);


const { id } = useParams();

const navigate = useNavigate();


const [lead,setLead] = useState<any>(null);

const [loading,setLoading] = useState(false);



// FETCH LEAD

const fetchLead = async()=>{

try{


const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);


const res = await fetch(
`https://prop-nex-backend.vercel.app/api/leads/${id}`,
{
headers:{
Authorization:
`Bearer ${userInfo.token}`
}
}
);


const data = await res.json();


setLead(data);


}
catch(error){

console.log(error);

}


};





useEffect(()=>{


fetchLead();


},[id]);






// COMPLETE FOLLOW UP

// COMPLETE FOLLOW UP

const completeFollowUp = async()=>{

try{

const res = await fetch(

`https://prop-nex-backend.vercel.app/api/leads/${id}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${userInfo.token}`
},

body:JSON.stringify({

followUpCompleted:true,

followUpCompletedAt:new Date()

})

}

);


const data = await res.json();


setLead(data);


alert(
"Follow Up Completed ✅"
);


}
catch(error){

console.log(error);

}

};






// STATUS UPDATE

const updateStatus = async(status:string)=>{


try{


const res = await fetch(

`https://prop-nex-backend.vercel.app/api/leads/${id}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${userInfo.token}`
},

body:JSON.stringify({

status

})

}

);



const data = await res.json();


setLead(data);



}
catch(error){

console.log(error);

}


};








// DELETE

const deleteLead = async()=>{


const confirmDelete =
window.confirm(
"Delete this Lead?"
);


if(!confirmDelete)
return;



try{


setLoading(true);



await fetch(

`https://prop-nex-backend.vercel.app/api/leads/${id}`,

{

method:"DELETE",

headers:{
Authorization:
`Bearer ${userInfo.token}`
}

}

);



alert(
"Lead Deleted"
);



navigate("/leads");



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};








if(!lead)

return(

<h2>
Loading...
</h2>

);








return(


<div className="lead-details">



<button

className="back-btn"

onClick={()=>navigate(-1)}

>

⬅ Back

</button>






<div className="lead-detail-card">





<h1>
{lead.name}
</h1>





<p>
📞 Phone
<br/>
{lead.phone}
</p>





<p>
📧 Email
<br/>
{lead.email}
</p>





<p>
🏠 Property
<br/>
{lead.property}
</p>







<p>
📌 Status
</p>



<select

value={lead.status}

onChange={(e)=>
updateStatus(
e.target.value
)
}

>


<option>
New
</option>

<option>
Contacted
</option>

<option>
Closed
</option>

<option>
Lost
</option>


</select>








<p>
📝 Notes

<br/>

{lead.notes || "No Notes"}

</p>








<p>

📅 Follow Up

<br/>

{lead.followUp}

</p>









{

lead.followUpCompleted ?


<button

className="complete-followup-btn completed"

disabled

>

✅ Follow Up Completed

</button>



:


<button

className="complete-followup-btn"

onClick={completeFollowUp}

>

✅ Complete Follow Up

</button>



}









{

lead.followUpCompletedAt &&


<div className="followup-history">


<h3>
📋 Follow Up History
</h3>


<div className="history-item">


<p>
✅ Completed
</p>


<span>

{
new Date(
lead.followUpCompletedAt
)
.toLocaleString()

}

</span>


</div>


</div>


}








<p>

👤 Assigned Agent

<br/>

{lead.assignedTo || "Not Assigned"}

</p>








<div className="lead-buttons">





<a

className="whatsapp-btn"

href={`https://wa.me/${lead.phone}`}

target="_blank"

rel="noreferrer"

>

💬 WhatsApp

</a>






<a

className="call-btn"

href={`tel:${lead.phone}`}

>

📞 Call

</a>








<button

className="delete-btn"

onClick={deleteLead}

disabled={loading}

>

{

loading

?

"Deleting..."

:

"🗑 Delete"

}


</button>





</div>







</div>





</div>


);


};



export default LeadDetails;