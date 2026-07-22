import "./Agency.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Agency = () => {
  const [agency, setAgency] = useState<any>(null);
  const [leadCount, setLeadCount] = useState(0);
const [copied, setCopied] = useState(false);
const [search, setSearch] = useState("");
const navigate = useNavigate();

const getUserInfo = () => {
  return JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );
};

 useEffect(() => {

  const loadAgency = async () => {

    const userInfo = getUserInfo();

if(!userInfo._id){
  return;
}

const savedAgency = JSON.parse(
  localStorage.getItem(
    `agency_${userInfo._id}`
  ) || "null"
);

    if (!savedAgency) return;


    try {

      const response = await fetch(
        "https://prop-nex-backend.vercel.app/api/listings"
      );


      const allListings =
        await response.json();


      const updatedListings =
        (savedAgency.listings || [])
        .map((item:any)=>{

          return allListings.find(
            (listing:any)=>
              listing._id === item._id
          );

        })
        .filter(Boolean);



      const updatedAgency = {
        ...savedAgency,
        listings: updatedListings
      };


      const userInfo = getUserInfo();

localStorage.setItem(
  `agency_${userInfo._id}`,
  JSON.stringify(updatedAgency)
);


      setAgency({
        ...updatedAgency,
        members:
          updatedAgency.members || [],
        leads:
          updatedAgency.leads || []
      });


    } catch(error){

      console.log(error);

    }

  };


  loadAgency();

}, []);
useEffect(() => {

  if (!agency?.code) return;

  const fetchLeads = async () => {

    try {

      const res = await fetch(
        `https://prop-nex-backend.vercel.app/api/leads?agencyCode=${agency.code}`
      );

      const data = await res.json();

      setLeadCount(data.length);

    } catch (error) {

      console.log(error);

    }

  };

  fetchLeads();

}, [agency]);

  const createAgency = async () => {
    

  const agencyName = prompt("Agency Name");

  if (!agencyName) return;


  const ownerName = prompt("Owner Name");

  if (!ownerName) return;


  const agencyCode = Math.floor(
    1000000 + Math.random() * 9000000
  ).toString();


  try {

   

const userInfo = getUserInfo();

const response = await fetch(
"https://prop-nex-backend.vercel.app/api/agency/create",
{
  method:"POST",

  headers:{
    "Content-Type":"application/json",
  },

  body: JSON.stringify({
    name: agencyName,
    ownerName: ownerName,
    code: agencyCode,
    userId:userInfo._id
  }),
}
);


    const data = await response.json();


    if(response.ok){

   

const userInfo = getUserInfo();

localStorage.setItem(
  `agency_${userInfo._id}`,
  JSON.stringify(data.agency)
);


      setAgency(data.agency);


      alert(
        "Agency Created Successfully"
      );

    }else{

      alert(data.message);

    }


  } catch(error){

    console.log(error);

    alert(
      "Server Error"
    );

  }

};
const joinAgency = async () => {

  const code = prompt("Enter Agency Code");

  if (!code) return;

  const memberName = prompt(
    "Enter Your Name"
  );

  if (!memberName) return;

  try {

    const userInfo = getUserInfo();

const response = await fetch(
  "https://prop-nex-backend.vercel.app/api/agency/join",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      memberName,
      userId: userInfo._id
    }),
  }
);

    const data = await response.json();

    if (response.ok) {

    const userInfo = getUserInfo();

localStorage.setItem(
  `agency_${userInfo._id}`,
  JSON.stringify(data.agency)
);

      setAgency(data.agency);

      alert(data.message);

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

};
  return (
      <>
      <Sidebar />
      <Header />
    <div className="agency">

      {!agency ? (
        <div className="agency-welcome">

          <div className="agency-icon">
            👥
          </div>

          <h1>Agency Dashboard</h1>

          <p>
            Manage a team of sub-agents with a shared
            listing pool.
          </p>

          <div
            className="agency-option"
            onClick={createAgency}
          >
            <div>
              <h3>Create an Agency</h3>

              <span>
                You'll be the primary agent.
              </span>
            </div>

            ➜
          </div>

          <div
            className="agency-option"
            
            onClick={joinAgency}
            
          >
            <div>
              <h3>Join an Agency</h3>

              <span>
                Enter agency invite code.
              </span>
            </div>

            ➜
          </div>

        </div>
      ) : (
        <>
          <div className="agency-header">

            <h1>
  🏢 {agency.name}
</h1>

           <button
  className="invite-btn"
  onClick={() => {

    navigator.clipboard.writeText(
      agency.code
    );

    alert("Agency Code Copied");

  }}
>
  Invite Agent
</button>

          </div>


    <div className="agency-code">
      

  <span>
    Agency Code: {agency.code}
  </span>

  <button
    className="copy-code-btn"
    onClick={() => {

      navigator.clipboard.writeText(
        agency.code.toString()
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    }}
  >
    Copy Code
  </button>
<button
  className="share-code-btn"
  onClick={() => {

 const message =
`Join My Agency

Agency: ${agency.name}

Code: ${agency.code}`;

  if (navigator.share) {

  navigator.share({
    title: agency.name,
    text: message,
  });

} else {

  navigator.clipboard.writeText(
    message
  );

  alert("Invite Copied");
}
  }}
>
  Share Invite
</button>
  {copied && (
    <p className="copied-msg">
      Code Copied ✓
    </p>
  )}

</div>



          <div className="agency-stats">

            <div className="agency-stat-card">
  <h2>
   {(agency.members?.length || 0) + 1}
  </h2>

  <p>Total Agents</p>
</div>

            <div className="agency-stat-card">
  <h2>
{agency.listings?.length || 0}
  </h2>

  <p>Listings Pool</p>

</div>

            <div className="agency-stat-card">
             <h2>
  {leadCount}
</h2>

              <p>Leads</p>
            </div>

          </div>

          <div className="agents-list">

           <h2>Agency Members</h2>

<input
  className="search-agent"
  type="text"
  placeholder="Search Agent..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

{(agency.members?.length || 0) === 0 && (
  <p className="empty-members">
    No agents found.
Share your agency code to invite members.
  </p>
)}

            <div className="agent-card">

  <div className="member-info">

    <div className="avatar">
      {agency.ownerName?.charAt(0)}
    </div>

    <h3>{agency.ownerName}</h3>

    <p>
👑 Founder & Owner
</p>

  </div>

  <span className="active-status">
    Active
  </span>

</div>

           {(agency.members || [])
 .filter((member: any) =>
  member.name
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )
)
  .map(
    (member: any, index: number) => (

      <div
        key={index}
        className="agent-card"
      >

        <div className="member-info">

          <div className="avatar">
            {member.name.charAt(0)}
          </div>

          <h3>{member.name}</h3>
<p>{member.role}</p>

        </div>

        <div className="member-actions">

          <span className="active-status">
            Active
          </span>

          <button
            className="remove-member-btn"
            onClick={() => {

              const updatedAgency = {
                ...agency,
                members:
                  (agency.members || []).filter(
                    (m: any) =>
                      m.name !== member.name
                  ),
              };

              const userInfo = getUserInfo();

localStorage.setItem(
  `agency_${userInfo._id}`,
  JSON.stringify(updatedAgency)
);

              setAgency(
                updatedAgency
              );

            }}
          >
            Remove
          </button>

        </div>

      </div>

    )
  )}
<div className="agency-properties">
  

  <h2>Agency Properties</h2>

  {(agency.listings?.length || 0) === 0 ? (
    <p>No Properties Added Yet</p>
  ) : (
    agency.listings.map(
      (listing: any, index: number) => (
   <div
  key={index}
  className="property-card"
>
  <div
    onClick={() =>
      navigate(`/property/${listing._id}`)
    }
  >
    <h3>🏠 {listing.title}</h3>

    <p>📍 {listing.location}</p>

    <p>💰 ₹ {listing.price}</p>

    <p>🏢 {listing.propertyType}</p>
  </div>


  <div className="property-actions">

    <button
      onClick={() =>
        navigate(
          `/edit-listing/${listing._id}`
        )
      }
    >
      ✏️ Edit
    </button>


    <button
      onClick={async () => {

        if(
          !window.confirm(
            "Delete this Property?"
          )
        )
        return;


        try {

          await fetch(
            `https://prop-nex-backend.vercel.app/api/listings/${listing._id}`,
            {
              method:"DELETE",
            }
          );


          const updatedAgency = {
            ...agency,

            listings:
            agency.listings.filter(
              (item:any)=>
                item._id !== listing._id
            )
          };


          const userInfo = getUserInfo();

localStorage.setItem(
  `agency_${userInfo._id}`,
  JSON.stringify(updatedAgency)
);


          setAgency(
            updatedAgency
          );


          alert(
            "Property Deleted"
          );


        } catch(error){

          console.log(error);

        }

      }}
    >
      🗑 Delete
    </button>

  </div>

</div>
      )
    )
  )}

</div>
          </div>

         <button
  className="delete-agency-btn"
  onClick={() => {

    if (
      !window.confirm(
        "Delete Agency?"
      )
    )
      return;
const userInfo = getUserInfo();

localStorage.removeItem(
  `agency_${userInfo._id}`
);

setAgency(null);

  }}
>
  Delete Agency
</button>

        </>
      )}

    </div>
    </>
  );
};

export default Agency;