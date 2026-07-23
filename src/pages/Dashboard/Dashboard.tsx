import "./Dashboard.css";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );



  const [listings, setListings] = useState<any[]>([]);
  const [credits, setCredits] = useState(
  userInfo.listingCredits || 0
);
  const [leadCount, setLeadCount] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [followUps, setFollowUps] = useState(0);
  const [closedLeads, setClosedLeads] = useState(0);
const [conversionRate, setConversionRate] = useState(0);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [todayLeads, setTodayLeads] = useState<any[]>([]);
  const [activities, setActivities] =
  useState<any[]>([]);
  const [statusSummary, setStatusSummary] =
  useState({
    new: 0,
    contacted: 0,
    closed: 0,
    lost: 0
  });
  

 const totalListings = listings.length;

const totalViews = listings.reduce(
  (sum, item) => sum + (item.views || 0),
  0
);

const topListing =
  listings.length > 0
    ? [...listings].sort(
        (a, b) =>
          (b.views || 0) - (a.views || 0)
      )[0]
    : null;
const updateLeadStatus = async (
  id:string,
  status:string
) => {

  try{

 await fetch(
  `https://prop-nex-backend.vercel.app/api/leads/${id}`,
  {
    method:"PUT",
   headers:{
 "Content-Type":"application/json",
 Authorization:`Bearer ${userInfo.token}`
},
    body:JSON.stringify({
      status
    })
  }
);



    

    await fetchLeads();

  }catch(err){

    console.log(err);

  }

};
  const brokerLink =
`https://prop-nex-frontend.vercel.app/broker/${userInfo._id}`;

 const getProfile = async () => {

try{

const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);


const res = await fetch(
"https://prop-nex-backend.vercel.app/api/auth/profile",
{
headers:{
Authorization:
`Bearer ${userInfo.token}`
}
}
);


const data = await res.json();


setCredits(
data.listingCredits || 0
);


localStorage.setItem(
"userInfo",
JSON.stringify({
...userInfo,
listingCredits:data.listingCredits,
packageName:data.packageName
})
);


}
catch(error){

console.log(error);

}

};


const fetchMyListings = async () => {

try {

const userInfo = JSON.parse(
localStorage.getItem("userInfo") || "{}"
);


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
"DASHBOARD MY LISTINGS =",
data
);


setListings(
Array.isArray(data)
?
data
:
[]
);


}
catch(error){

console.log(error);

}

};
  


   const fetchLeads = async () => {

  try {

    const userInfo = JSON.parse(
  localStorage.getItem("userInfo") || "{}"
);

const res = await fetch(
  "https://prop-nex-backend.vercel.app/api/leads",
  {
    headers:{
      Authorization:`Bearer ${userInfo.token}`
    }
  }
);

const data = await res.json();

console.log("DASHBOARD LEADS =", data);

   

    setLeadCount(data.length);

    setNewLeads(
      data.filter(
        (lead:any) =>
          lead.status === "New"
      ).length
    );
const today =
new Date()
.toISOString()
.split("T")[0];


setFollowUps(

data.filter(
(lead:any)=>

lead.followUp &&

!lead.followUpCompleted &&

new Date(lead.followUp)
.toISOString()
.split("T")[0] === today

).length

);





setTodayLeads(

data.filter(

(lead:any)=>

lead.followUp &&

!lead.followUpCompleted &&

new Date(lead.followUp)
.toISOString()
.split("T")[0] === today

)

);
console.log("ALL LEADS", data);

console.log(
  "TODAY LEADS",
  data.filter(
    (lead:any)=>lead.followUp
  )
);
    setRecentLeads(
      data.slice().reverse().slice(0, 5)
    );

    const sortedActivities =
data
.slice()
.sort(
(a:any,b:any)=>
new Date(b.updatedAt).getTime()
-
new Date(a.updatedAt).getTime()
)
.slice(0,5);
  setActivities(

sortedActivities.map((lead:any)=>({

text:

lead.followUpCompleted

?

`${lead.name} Follow Up Completed ✅`

:

`${lead.name} Lead Added`

,

date:

lead.updatedAt || lead.createdAt


}))

);

    const closed =
      data.filter(
        (lead:any) =>
          lead.status === "Closed"
      ).length;
      const newCount =
  data.filter(
    (lead:any) =>
      lead.status === "New"
  ).length;


const contactedCount =
  data.filter(
    (lead:any) =>
      lead.status === "Contacted"
  ).length;


const lostCount =
  data.filter(
    (lead:any) =>
      lead.status === "Lost"
  ).length;


setStatusSummary({
  new: newCount,
  contacted: contactedCount,
  closed: closed,
  lost: lostCount
});

    setClosedLeads(closed);

    setConversionRate(
      data.length > 0
        ? Math.round(
            (closed / data.length) * 100
          )
        : 0
    );

  } catch(error) {

    console.log(error);

  }

};

useEffect(() => {

  getProfile();

  fetchMyListings();

  fetchLeads();

}, []);
  return (
    <>
      <Sidebar />
      <Header />

      <div className="dashboard">

        <div className="welcome-section">
          
          <h1>
            Welcome, {userInfo.name}
          </h1>

          <p>
            Ready to close some deals?
          </p>
        </div>

        <Link
          to="/edit-profile"
          className="edit-profile-btn"
        >
          Edit Profile
        </Link>

    <div className="listing-warning">

  {totalListings === 0 ? (

    <>
      <span>
        🎉 You have 1 FREE listing available.
      </span>

      <Link to="/add-listing">
        <button>
          Create First Listing
        </button>
      </Link>
    </>

  ) : credits > 0 ? (

    <>
      <span>
        ⚡ {credits} Listings Available
      </span>

      <Link to="/pricing">
        <button>
          Buy More Listings
        </button>
      </Link>
    </>

  ) : (

    <>
      <span>
        🎉 Your free listing has been used.
        Buy a package to add more properties.
      </span>

      <Link to="/pricing">
        <button>
          Buy Package
        </button>
      </Link>
    </>

  )}

</div>

     <Link
  to={
    totalListings === 0 || credits > 0
      ? "/add-listing"
      : "/pricing"
  }
  className="create-listing-btn"
>
  {
  totalListings === 0
    ? "+ Create First Free Listing"
    : credits > 0
    ? "+ Create New Listing"
    : "🚀 Buy Package To Add More Listings"
}
</Link>

        <div className="live-card">

          <h2>
            ⚡ Your Mini Website is Live!
          </h2>

          <p>
            Share your customized profile
            to build trust and capture leads.
          </p>

          <div className="site-url">
            {brokerLink}
          </div>

          <div className="live-actions">

            <button
              onClick={() =>
                window.open(
                  brokerLink,
                  "_blank"
                )
              }
            >
              Open Site
            </button>

            <button
              onClick={() => {

                navigator.clipboard.writeText(
                  brokerLink
                );

                alert("Link Copied");

              }}
            >
              Copy Link
            </button>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>{totalListings}</h2>
            <p>Total Listings</p>
          </div>

          <div className="stat-card">
            <h2>{totalViews}</h2>
            <p>Total Views</p>
          </div>

          <div className="stat-card">
            <h2>{totalListings}</h2>
            <p>Active Listings</p>
          </div>

          <div className="stat-card">
            <h2>{leadCount}</h2>
            <p>Total Leads</p>
          </div>

          <div className="stat-card">
            <h2>{newLeads}</h2>
            <p>New Leads</p>
          </div>

          <div className="stat-card">
            <h2>{followUps}</h2>
            <p>Today's Follow Up</p>
          </div>
<div className="stat-card">
  <h2>{closedLeads}</h2>
  <p>Closed Leads</p>
</div>

<div className="stat-card">
  <h2>{conversionRate}%</h2>
  <p>Conversion Rate</p>
</div>
        </div>
<div className="today-followups">

 {
followUps > 0 && (

<div className="followup-alert">

📅 You have
<b> {followUps} </b>
follow-up(s) today

</div>

)
}

<h2>
📅 Today's Follow Ups
</h2>

  {todayLeads.length === 0 ? (

    <p>
      No Follow Ups Today
    </p>

  ) : (

    todayLeads.map((lead:any) => (

      <div
        key={lead._id}
        className="followup-card"
      >

        <h3>
          {lead.name}
        </h3>

        <p>
          📞 {lead.phone}
        </p>

        <p>
          🏠 {lead.property}
        </p>
        <div className="followup-actions">

  <a
    href={`tel:${lead.phone}`}
    className="call-btn"
  >
    📞 Call
  </a>

  <a
    href={`https://wa.me/${lead.phone}`}
    target="_blank"
    rel="noreferrer"
    className="whatsapp-btn"
  >
    💬 WhatsApp
  </a>

  <a
    href={`mailto:${lead.email}`}
    className="email-btn"
  >
    📧 Email
  </a>
<button

className="complete-followup-dashboard-btn"

onClick={async()=>{

try{


const res = await fetch(
  `https://prop-nex-backend.vercel.app/api/leads/${lead._id}`,
  {
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${userInfo.token}`
    },
   body:JSON.stringify({
  followUpCompleted:true,
  followUpCompletedAt:new Date(),
  status:"Contacted"
})
  }
);

const data = await res.json();

console.log("UPDATED LEAD =", data);





// remove from today's list

setTodayLeads(

todayLeads.filter(
(item:any)=>
item._id !== lead._id
)

);


// count minus

setFollowUps(
prev=>prev-1
);



alert(
"Follow Up Completed ✅"
);
await fetchLeads();


}
catch(error){

console.log(error);

}


}}

>

✅ Complete

</button>
</div>

      </div>

    ))

  )}

</div>
<div className="analytics-section">

  <h2>
    📈 Monthly Analytics
  </h2>

  <div className="analytics-grid">

    <div className="analytics-card">
      <span>{leadCount}</span>
      <p>Total Leads</p>
    </div>

    <div className="analytics-card">
      <span>{closedLeads}</span>
      <p>Closed Deals</p>
    </div>

    <div className="analytics-card">
      <span>{conversionRate}%</span>
      <p>Conversion Rate</p>
    </div>

  </div>

</div>
<div className="pipeline-section">

  <h2>
    🚀 Lead Pipeline
  </h2>

  <div className="pipeline-grid">

    <div className="pipeline-card new">
      <span>
        {statusSummary.new || 0}
      </span>
      <p>New</p>
    </div>

    <div className="pipeline-card contacted">
      <span>
        {statusSummary.contacted || 0}
      </span>
      <p>Contacted</p>
    </div>

    <div className="pipeline-card closed">
      <span>
        {statusSummary.closed || 0}
      </span>
      <p>Closed</p>
    </div>

    <div className="pipeline-card lost">
      <span>
        {statusSummary.lost || 0}
      </span>
      <p>Lost</p>
    </div>

  </div>

</div>
<div className="activity-section">

  <h2>
    📋 Recent Activity
  </h2>

  {
    activities.length === 0
    ?
    <p>No Activity Yet</p>
    :
    activities.map(
      (item:any,index:number) => (

      <div
        key={index}
        className="activity-item"
      >

        <div className="activity-dot" />

        <div>

          <h4>
            {item.text}
          </h4>

          <span>
            {new Date(
              item.date
            ).toLocaleDateString()}
          </span>

        </div>

      </div>

    ))
  }

</div>
<div className="recent-leads">

  <div className="recent-leads-header">

  <h2>
    🔥 Recent Leads
  </h2>

  <Link
    to="/leads"
    className="all-leads-btn"
  >
    View All Leads
  </Link>

</div>

  {
    recentLeads.length === 0
    ?
    <p>No Leads Yet</p>
    :
    
    recentLeads.map((lead:any) => (

      <div
        key={lead._id}
        className="recent-lead-card"
      >

        <div>

          <h3>
            {lead.name}
          </h3>

          <p>
            📞 {lead.phone}
          </p>

          <span
className={`status-badge ${lead.status.toLowerCase()}`}
>
{lead.status}
</span>
<select
  className="status-select"
  value={lead.status}
  onChange={(e) =>
    updateLeadStatus(
      lead._id,
      e.target.value
    )
  }
>
  <option value="New">
    New
  </option>

  <option value="Contacted">
    Contacted
  </option>

  <option value="Closed">
    Closed
  </option>

  <option value="Lost">
    Lost
  </option>

</select>
        </div>

        <Link
          to={`/lead/${lead._id}`}
        >
          <button className="view-btn">
            View
          </button>
        </Link>

      </div>

    ))
  }

</div>
<div className="top-listing-card">


  <h2>
    🏆 Top Performing Listing
  </h2>

  {
    topListing ? (

     <div className="top-listing-content">

  <img
    src={
      topListing.images?.length
        ? `https://prop-nex-backend.vercel.app${topListing.images[0]}`
        : "/no-image.png"
    }
    alt=""
  />

  <div className="top-listing-info">

    <h3>{topListing.title}</h3>

    <p>📍 {topListing.city}</p>

    <p>👁 {topListing.views || 0} Views</p>

    <p>₹ {topListing.price}</p>

    <Link
      to={`/property/${topListing._id}`}
      className="top-listing-link"
    >
      <button className="view-btn">
        View Property
      </button>
    </Link>

  </div>

</div>

    ) : (

      <p>
        No Listings Available
      </p>

    )
  }

</div>
        <div className="recent-listings">

          <h2>
            Recent Listings
          </h2>

          {listings.slice(0, 5).map((item) => (

            <div
              className="listing-card"
              key={item._id}
            >

              <img
                className="listing-image"
                src={
                  item.images?.length
                    ? `https://prop-nex-backend.vercel.app${item.images[0]}`
                    : "/no-image.png"
                }
                alt=""
              />

              <div className="listing-content">

                <h3>
                  {item.title}
                </h3>

                <p>
                  ₹ {item.price} • {item.city}
                </p>

              </div>

              <Link
                to={`/property/${item._id}`}
              >
                <button className="view-btn">
                  View
                </button>
              </Link>

            </div>

          ))}

        </div>

      </div>

      <BottomNav />

    </>
  );

};

export default Dashboard; 