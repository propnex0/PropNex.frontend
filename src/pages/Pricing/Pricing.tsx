import "./Pricing.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pricing = () => {
  const plans = [
    {
      listings: 15,
      price: 299,
      packageName: "Basic",
    },
    {
      listings: 30,
      price: 499,
      packageName: "Premium",
    },
  ];

  const [selectedPlan, setSelectedPlan] =
    useState(15);

  const [amount, setAmount] =
    useState(299);

  const payNow = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );

      const credits =
        selectedPlan === 15 ? 15 : 30;

      const packageName =
        selectedPlan === 15
          ? "15 Listings"
          : "30 Listings";

          localStorage.setItem(
  "selectedPlan",
  JSON.stringify({
    credits,
    packageName,
    amount
  })
);

      const orderRes = await fetch(
        "https://prop-nex-backend.vercel.app/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({
            amount,
          }),
        }
      );

      const order =
        await orderRes.json();

      const options = {
        key: "rzp_test_TFdVvXb2EinFGs",

        amount: order.amount,

        currency: "INR",

        name: "PropNex",

        description: packageName,

        order_id: order.id,

       handler: function () {

  window.location.href =
  "/payment-success";

},

        prefill: {
          name:
            userInfo.name || "",
          email:
            userInfo.email || "",
        },

        theme: {
          color: "#17875d",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <Header />

      <div className="pricing-page">
        <div className="payment-card">

          <div className="logo-box">
            <img
  src="/logo.png"
  alt="PropNex"
  className="site-logo"
/>
          </div>

          <h1>
            Top up your listings
          </h1>

          <p className="subtitle">
            One-time payment.
            Instant activation.
          </p>

          <div className="plans">
            {plans.map(
              (plan, index) => (
                <div
                  key={index}
                  className={`plan ${
                    selectedPlan ===
                    plan.listings
                      ? "active-plan"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedPlan(
                      plan.listings
                    );
                    setAmount(
                      plan.price
                    );
                  }}
                >
                  {plan.listings ===
                    30 && (
                    <span className="best-value">
                      BEST VALUE
                    </span>
                  )}

                  <h2>
                    {plan.listings}
                  </h2>

                  <span className="listing-text">
                    Listings
                  </span>

                  <h3>
                    ₹{plan.price}
                  </h3>

                  <p>
                    ₹
                    {Math.round(
                      plan.price /
                        plan.listings
                    )}
                    /listing
                  </p>
                </div>
              )
            )}
          </div>
<div className="pricing-alert">
  <h3>
    🎉 Free Listing Used Successfully
  </h3>

  <p>
    To publish more properties and get more leads,
    choose a listing package below.
  </p>
</div>
          <ul className="feature-list">
            <li>
              ✓ Post via WhatsApp
              instantly
            </li>
            <li>
              ✓ No subscription —
              pay once
            </li>
            <li>
              ✓ Dashboard,
              sharing,
              analytics
            </li>
          </ul>

          <button
            className="pay-btn"
            onClick={payNow}
          >
            Proceed to Pay ₹
            {amount}
          </button>

          <small className="secure-text">
            🔒 Secured by Razorpay
          </small>

        </div>
      </div>
    </>
  );
};

export default Pricing;