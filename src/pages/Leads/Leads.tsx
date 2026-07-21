import "./Leads.css";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Leads = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const propertyId = searchParams.get("propertyId");


    const agency =
        JSON.parse(
            localStorage.getItem("agency") || "null"
        );

    const agencyCode = agency?.code || "";
    const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
    );


    const API =
        "https://prop-nex-backend.vercel.app/api/leads";

    const [leads, setLeads] = useState<any[]>([]);


    const [showForm, setShowForm] =
        useState(false);

    const [editMode, setEditMode] =
        useState(false);

    const [editId, setEditId] =
        useState("");


    const [search, setSearch] =
        useState("");

    const [filterStatus, setFilterStatus] =
        useState("All");
    const [filterFollowUp, setFilterFollowUp] =
        useState("All");




    const [form, setForm] = useState({

        name: "",
        phone: "",
        email: "",
        property: "",
        propertyId: "",
        status: "New",
        notes: "",
        followUp: "",
        assignedTo: "",
        agencyCode: ""

    });



    // LOAD PROPERTY FROM DETAILS PAGE

    useEffect(() => {

        if (propertyId) {

            fetch(
                `https://prop-nex-backend.vercel.app/api/listings/${propertyId}`
            )
                .then(res => res.json())
                .then(data => {


                    setForm(prev => ({

                        ...prev,

                        property: data.title,

                        propertyId: data._id,

                        agencyCode,

                        followUp: new Date()
                            .toISOString()
                            .split("T")[0]

                    }));


                    setShowForm(true);


                });




        }

    }, [propertyId]);





    // LOAD LEADS

    // LOAD LEADS

    useEffect(() => {

        const loadLeads = async () => {

            try {

                const userInfo = JSON.parse(
                    localStorage.getItem("userInfo") || "{}"
                );


                const res = await fetch(
                    "https://prop-nex-backend.vercel.app/api/leads",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${userInfo.token}`
                        }
                    }
                );


                const data = await res.json();


                console.log(
                    "MY LOGIN USER LEADS =",
                    data
                );


                setLeads(
                    Array.isArray(data)
                        ?
                        data
                        :
                        []
                );


            }
            catch (error) {

                console.log(error);

            }

        };


        loadLeads();


    }, []);





    const saveLead = async () => {


        const url = editMode

            ?
            `https://prop-nex-backend.vercel.app/api/leads/${editId}`

            :
            API;


        const method = editMode
            ?
            "PUT"
            :
            "POST";



        const res = await fetch(
            url,
            {

                method,

                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        `Bearer ${userInfo.token}`
                },

                body: JSON.stringify({
                    ...form,
                    agencyCode,
                    followUp: form.followUp
                })

            }

        );


        const data = await res.json();



        if (editMode) {


            setLeads(

                leads.map(
                    (item: any) =>

                        item._id === data._id
                            ?
                            data
                            :
                            item

                )

            );


        } else {


            setLeads([
                ...leads,
                data
            ]);


        }



        setForm({

            name: "",
            phone: "",
            email: "",
            property: "",
            propertyId: "",
            status: "New",
            notes: "",
            followUp: new Date()
                .toISOString()
                .split("T")[0],
            assignedTo: "",
            agencyCode

        });


        setEditMode(false);

        setEditId("");

        setShowForm(false);


    };






    const editLead = (lead: any) => {


        setForm({

            name: lead.name,

            phone: lead.phone,

            email: lead.email,

            property: lead.property,

            propertyId: lead.propertyId,

            status: lead.status,

            notes: lead.notes,

            followUp: lead.followUp,

            assignedTo: lead.assignedTo,

            agencyCode: lead.agencyCode

        });


        setEditId(lead._id);

        setEditMode(true);

        setShowForm(true);


    };






    const deleteLead = async (id: string) => {


        await fetch(

            `https://prop-nex-backend.vercel.app/api/leads/${id}`,

            {
                method: "DELETE",
                headers: {
                    Authorization:
                        `Bearer ${userInfo.token}`
                }
            }
        );
        setLeads(
            leads.filter(
                (item: any) =>
                    item._id !== id
            )
        );
    };
    const filteredLeads = leads
        .filter(

            (lead: any) => {


                const searchMatch =

                    lead.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                    ||

                    lead.phone?.includes(search);



                const statusMatch =

                    filterStatus === "All"

                        ?

                        true

                        :

                        lead.status === filterStatus;



                const followMatch =

                    filterFollowUp === "All"

                        ?

                        true

                        :

                        filterFollowUp === "Pending"

                            ?

                            lead.followUp &&
                            !lead.followUpCompleted

                            :

                            lead.followUpCompleted;



                return (

                    searchMatch &&

                    statusMatch &&

                    followMatch

                );


            }

        )
        .sort(
            (a: any, b: any) =>
                new Date(b.createdAt).getTime()
                -
                new Date(a.createdAt).getTime()
        );
    return (
        <div className="leads-page">
            <div className="leads-header">
                <h1>Leads</h1>
                <button
                    onClick={() =>
                        navigate("/add-lead")
                    }
                >
                    + Add Lead
                </button>
            </div>
            <div className="lead-filter">
                <input
                    placeholder="Search Lead"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
                <select
                    value={filterStatus}
                    onChange={(e) =>
                        setFilterStatus(e.target.value)
                    }
                >
                    <option>All</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Closed</option>
                    <option>Lost</option>
                </select>
                <select
                    value={filterFollowUp}
                    onChange={(e) =>
                        setFilterFollowUp(
                            e.target.value
                        )
                    }
                >
                    <option value="All">
                        All Follow Ups
                    </option>
                    <option value="Pending">
                        Pending
                    </option>
                    <option value="Completed">
                        Completed
                    </option>
                </select>
            </div>
            <div className="lead-stats">
                <div>
                    <h2>{leads.length}</h2>
                    <p>Total Leads</p>
                </div>
                <div>
                    <h2>
                        {
                            leads.filter(
                                l => l.status === "New"
                            ).length
                        }
                    </h2>
                    <p>New</p>
                </div>
                <div>
                    <h2>
                        {
                            leads.filter(
                                l => l.status === "Closed"
                            ).length
                        }
                    </h2>
                    <p>Closed</p>
                </div>
            </div>
            {
                showForm &&
                <div className="lead-form">
                    <h2>
                        {
                            editMode
                                ?
                                "Edit Lead"
                                :
                                "Add Lead"
                        }
                    </h2>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={
                            e => setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />
                    <input
                        placeholder="Phone"
                        value={form.phone}
                        onChange={
                            e => setForm({
                                ...form,
                                phone: e.target.value
                            })
                        }
                    />
                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={
                            e => setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />
                    <input
                        placeholder="Interested Property"
                        value={form.property}
                        onChange={
                            e => setForm({
                                ...form,
                                property: e.target.value
                            })
                        }
                    />
                    <input
                        placeholder="Notes"
                        value={form.notes}
                        onChange={
                            e => setForm({
                                ...form,
                                notes: e.target.value
                            })
                        }
                    />
                    <input
                        type="date"
                        value={form.followUp}
                        onChange={
                            e => setForm({
                                ...form,
                                followUp: e.target.value
                            })
                        }
                    />
                    <select
                        value={form.status}
                        onChange={
                            e => setForm({
                                ...form,
                                status: e.target.value
                            })
                        }
                    >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                        <option>Lost</option>
                    </select>
                    <button onClick={saveLead}>
                        Save
                    </button>
                </div>
            }
            <div className="lead-list">
                {
                    filteredLeads.map(
                        (lead: any) => (
                            <div
                                className="lead-card"

                                key={lead._id}

                                onClick={() =>
                                    navigate(`/lead/${lead._id}`)
                                }
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
                                <span
                                    className={
                                        `status-badge ${lead.status.toLowerCase()}`
                                    }
                                >
                                    {lead.status}

                                </span>
                                {
                                    lead.followUp &&
                                    <p>
                                        📅 Follow Up:
                                        <br />
                                        {lead.followUp}
                                    </p>
                                }
                                {
                                    lead.followUpCompleted &&
                                    <span className="completed-badge">
                                        ✅ Completed
                                    </span>
                                }
                                <div>
                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            editLead(lead);

                                        }}
                                    >
                                        Edit
                                    </button>
                                    <a
                                        href={`tel:${lead.phone}`}

                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                    >
                                        📞 Call
                                    </a>
                                    <a
                                        href={`https://wa.me/${lead.phone}`}

                                        target="_blank"

                                        rel="noreferrer"

                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }

                                    >
                                        💬 WhatsApp
                                    </a>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteLead(lead._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};
export default Leads;