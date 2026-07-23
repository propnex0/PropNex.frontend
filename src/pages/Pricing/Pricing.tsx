import "./Pricing.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

declare global {
  interface Window {
    Cashfree: any;
  }
}

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: "Basic",
      listings: 15,
      price: 299,
      description: "Perfect for individual property owners",
    },
    {
      id: 2,
      name: "Premium",
      listings: 30,
      price: 499,
      description: "Best value for brokers & builders",
      popular: true,
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    if (phoneNumber.trim().length !== 10) {
      setShowPhonePopup(true);
      return;
    }

    try {
      setLoading(true);

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );

      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          credits: selectedPlan.listings,
          packageName: selectedPlan.name,
          amount: selectedPlan.price,
        })
      );

      const response = await fetch(
        "https://prop-nex-backend.vercel.app/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({
            amount: selectedPlan.price,
            customerId: userInfo._id,
            customerName: userInfo.name,
            customerEmail: userInfo.email,
            customerPhone: phoneNumber,
          }),
        }
      );

      const order = await response.json();

      if (!order.payment_session_id) {
        alert(order.message || "Payment session not found");
        return;
      }

      const cashfree = window.Cashfree({
        mode: "production",
      });

      await cashfree.checkout({
        paymentSessionId: order.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };



    return (
    <>
      <Sidebar />
      <Header />

      <div className="pricing-page">
        <div className="pricing-container">

          <div className="pricing-header">

            <img
              src="/logo.png"
              alt="PropNex"
              className="site1-logo"
            />

            <h1>
              Choose Your Listing Package
            </h1>

            <p>
              Post more properties, get genuine buyers
              and grow your business with PropNex.
            </p>

          </div>

          <div className="plans-grid">

            {plans.map((plan) => (

              <div
                key={plan.id}
                className={`plan-card ${
                  selectedPlan.id === plan.id
                    ? "active-plan"
                    : ""
                }`}
                onClick={() =>
                  setSelectedPlan(plan)
                }
              >

                {plan.popular && (
                  <span className="popular-badge">
                    ⭐ MOST POPULAR
                  </span>
                )}

                <h2>
                  {plan.name}
                </h2>

                <div className="plan-price">

                  ₹{plan.price}

                </div>

                <h4>

                  {plan.listings} Listings

                </h4>

                <p className="plan-desc">

                  {plan.description}

                </p>

                <ul className="plan-list">

                  <li>
                    ✅ Instant Activation
                  </li>

                  <li>
                    ✅ WhatsApp Sharing
                  </li>

                  <li>
                    ✅ Unlimited Buyer Leads
                  </li>

                  <li>
                    ✅ Dashboard Access
                  </li>

                  <li>
                    ✅ Premium Support
                  </li>

                </ul>

              </div>

            ))}

          </div>

          <div className="selected-plan-box">

            <h3>

              Selected Package

            </h3>

            <div className="selected-plan">

              <span>

                {selectedPlan.name}

              </span>

              <strong>

                ₹{selectedPlan.price}

              </strong>

            </div>

          </div>

          <div className="pricing-alert">

            <h3>

              🎉 Your Free Listing Has Been Used

            </h3>

            <p>

              Upgrade now to continue posting
              more properties and receive
              verified buyer enquiries.

            </p>

          </div>

          <div className="features-grid">

            <div className="feature-box">

              📈 More Property Visibility

            </div>

            <div className="feature-box">

              💬 WhatsApp Sharing

            </div>

            <div className="feature-box">

              ⚡ Instant Activation

            </div>

            <div className="feature-box">

              🛡 Secure Dashboard

            </div>

          </div>








                    <button
            className="pay-btn"
            onClick={payNow}
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : `Proceed To Pay ₹${selectedPlan.price}`}
          </button>

          <p className="secure-text">
            🔒 Secure Payment Powered by Cashfree
          </p>

        </div>

        {showPhonePopup && (
          <div className="phone-popup">

            <div className="phone-card">

              <h2>📱 Enter Mobile Number</h2>

              <p>
                Cashfree requires your mobile number
                before continuing the payment.
              </p>

              <input
                type="text"
                placeholder="Enter 10 digit mobile number"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

              <button
                className="continue-btn"
                onClick={() => {

                  if (phoneNumber.length !== 10) {
                    alert("Please enter a valid mobile number");
                    return;
                  }

                  setShowPhonePopup(false);

                  setTimeout(() => {
                    payNow();
                  }, 150);

                }}
              >
                Continue To Payment
              </button>

            </div>

          </div>
        )}

      </div>

    </>
  );
};

export default Pricing;