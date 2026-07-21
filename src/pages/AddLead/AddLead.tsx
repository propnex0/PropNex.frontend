import "./AddLead.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";


const AddLead = () => {


const [searchParams] = useSearchParams();


const propertyId =
searchParams.get("propertyId");


const propertyTitle =
searchParams.get("title") || "";



const agency =
JSON.parse(
localStorage.getItem("agency") || "null"
);


const agencyCode =
agency?.code || "";



const [form,setForm]=useState({

name:"",
phone:"",
email:"",
property:propertyTitle,
propertyId:propertyId || "",
status:"New",
notes:"",
followUp:new Date()
.toISOString()
.split("T")[0],
assignedTo:"",
agencyCode

});




const saveLead = async()=>{


try{




const res = await fetch(
"https://prop-nex-backend.vercel.app/api/leads",
{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${
JSON.parse(
localStorage.getItem("userInfo") || "{}"
).token
}`
},

body:JSON.stringify(form)

}
);

const data = await res.json();

console.log(
"NEW LEAD CREATED =",
data
);



alert(
"Thank you! Your inquiry has been submitted."
);



setForm({

name:"",
phone:"",
email:"",
property:"",
propertyId:"",
status:"New",
notes:"",
followUp:new Date()
.toISOString()
.split("T")[0],
assignedTo:"",
agencyCode

});



}catch(error){

console.log(error);

alert("Something went wrong");

}


};





return(


<div className="add-lead-page">


<h1>
Send Property Inquiry
</h1>


<p className="lead-subtitle">
Fill your details and our property expert will contact you soon.
</p>




<input

placeholder="Your Full Name"

value={form.name}

onChange={
e=>setForm({

...form,

name:e.target.value

})
}

/>





<input

placeholder="Your Mobile Number"

value={form.phone}

onChange={
e=>setForm({

...form,

phone:e.target.value

})
}

/>





<input

placeholder="Your Email Address"

value={form.email}

onChange={
e=>setForm({

...form,

email:e.target.value

})
}

/>





<input

placeholder="Interested Property"

value={form.property}

onChange={
e=>setForm({

...form,

property:e.target.value

})
}

/>





<textarea

placeholder="Write your message or requirement"

value={form.notes}

onChange={
e=>setForm({

...form,

notes:e.target.value

})
}

/>





<button

onClick={saveLead}

>

Submit Inquiry

</button>



</div>


)

}


export default AddLead;