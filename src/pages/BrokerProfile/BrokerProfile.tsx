import "./BrokerProfile.css";

const BrokerProfile = () => {
  return (
    <div className="broker-page">

      <div className="broker-card">

        <img
          src="https://via.placeholder.com/120"
          alt=""
          className="broker-photo"
        />

        <h1>Khushiram</h1>

        <p>Property Consultant</p>

        <div className="broker-actions">
          <button>Call</button>
          <button>WhatsApp</button>
        </div>

      </div>

    </div>
  );
};

export default BrokerProfile;