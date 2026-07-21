import "./Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  return (
    <div className="home">

      {/* HEADER */}

      <header className="home-header">

        <div className="logo-box">
          <img
  src="/logo.png"
  alt="PropNex"
  className="site-logo"
/>
        </div>

        <nav
          className={`home-nav ${
            menuOpen ? "show-menu" : ""
          }`}
        >
          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#pricing">
            Pricing
          </a>
        </nav>

        <div className="header-right">

          {userInfo?.token ? (
  <>
    <span className="welcome-user desktop-only">
      Welcome, {userInfo.name}
    </span>

    <Link to="/dashboard">
      <button className="dashboard-btn desktop-only">
        Dashboard
      </button>
    </Link>

    <button
      className="logout-btn mobile-logout"
      onClick={()=>{
        localStorage.removeItem("userInfo");
        window.location.href="/login";
      }}
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login">
      <button className="signin-btn">
        Sign In
      </button>
    </Link>

    <Link to="/register">
      <button className="start-btn">
        Sign Up
      </button>
    </Link>
  </>
)}

          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            ☰
          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            ⚡ AI-POWERED PROPERTY PAGES
          </span>

          <h1>
            The smartest way for
            brokers to share
            property on
            <span> WhatsApp.</span>
          </h1>

          <p>
            Turn any property into a beautiful,
            shareable page in 60 seconds.
            No apps. No training.
            Just share a link on WhatsApp.
          </p>

          <div className="hero-buttons">

            <Link
              to={
                userInfo?.token
                  ? "/add-listing"
                  : "/register"
              }
            >
              <button className="primary-btn">
                Create Free Listing →
              </button>
            </Link>

            <Link
              to={
                userInfo?.token
                  ? "/dashboard"
                  : "/login"
              }
            >
              <button className="secondary-btn">
                View Dashboard
              </button>
            </Link>

          </div>

          <small>
            No signup required ·
            Free forever for 1 listing
          </small>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="how-section"
      >

        <span className="section-tag">
          HOW IT WORKS
        </span>

        <h2>
          Three steps.
          <span>
            {" "}
            Less than a minute.
          </span>
        </h2>

        <div className="steps-grid">

          <div className="step-card">
            <div className="step-icon">
              📸
            </div>

            <h3>
              Add photos & describe
            </h3>

            <p>
              In any language.
              Hindi, English or local.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              ✨
            </div>

            <h3>
              AI creates your listing
            </h3>

            <p>
              Generates title,
              description and page.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              🔗
            </div>

            <h3>
              Share the link
            </h3>

            <p>
              One link.
              Unlimited sharing.
            </p>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="features-section"
      >

        <span className="section-tag">
          FEATURES
        </span>

        <h2>
          Built for
          <span>
            {" "}
            Indian brokers.
          </span>
        </h2>

        <p className="section-subtitle">
          Every feature designed for
          how brokers actually work.
        </p>

        <div className="features-grid">

          <div className="feature-card">
            <div>✦</div>
            <h3>AI Content</h3>
            <p>
              Auto-written listings.
            </p>
          </div>

          <div className="feature-card">
            <div>📱</div>
            <h3>Mobile First</h3>
            <p>
              Optimized for WhatsApp.
            </p>
          </div>

          <div className="feature-card">
            <div>📊</div>
            <h3>Analytics</h3>
            <p>
              Track views and leads.
            </p>
          </div>

          <div className="feature-card">
            <div>🖼️</div>
            <h3>Photo Gallery</h3>
            <p>
              Full screen photos.
            </p>
          </div>

          <div className="feature-card">
            <div>📂</div>
            <h3>Collections</h3>
            <p>
              Bundle listings together.
            </p>
          </div>

          <div className="feature-card">
            <div>⚡</div>
            <h3>60 Seconds</h3>
            <p>
              From photos to live page.
            </p>
          </div>

        </div>

      </section>
            {/* PRICING */}

      <section
        id="pricing"
        className="pricing-section"
      >

        <span className="section-tag">
          PRICING
        </span>

        <h2>
          Simple pricing.
          <span> Pay as you grow.</span>
        </h2>

        <p className="section-subtitle">
          Start free. Upgrade when you're ready.
          No subscriptions.
        </p>

        <div className="pricing-grid">

          <div className="pricing-card">

            <div className="pricing-icon">
              🎁
            </div>

            <h3>Free</h3>

            <h1>₹0</h1>

            <p>
              1 free listing to try it out.
              No card required.
            </p>

          </div>

          <div className="pricing-card">

            <div className="pricing-icon">
              ⚡
            </div>

            <h3>Starter Pack</h3>

            <h1>₹299</h1>

            <p>
              15 listings · ₹20 per listing
            </p>

          </div>

          <div className="pricing-card">

            <div className="pricing-icon">
              🚀
            </div>

            <h3>Pro Pack</h3>

            <h1>₹499</h1>

            <p>
              30 listings · Best value
            </p>

          </div>

        </div>

        <div className="pricing-note">
          Running an agency?
          Shared pool of listings for your team.
        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-content">

          <h2>
            Your next deal starts
            with <span>a link.</span>
          </h2>

          <p>
            Join Indian brokers already using
            PropNex.
          </p>

          <Link
            to={
              userInfo?.token
                ? "/add-listing"
                : "/register"
            }
          >
            <button className="cta-btn">
              Create Your First Listing —
              It's Free →
            </button>
          </Link>

          <small>
            No signup. No app. No friction.
          </small>

        </div>

      </section>

      {/* FOOTER */}

     <footer className="footer">

  <div className="footer-container">

    <div className="footer-logo">
      <img
        src="/logo.png"
        alt="PropNex"
        className="footer-site-logo"
      />
    </div>

    <div className="footer-links">

      <a href="#">Privacy</a>

      <a href="#">Terms</a>

      <a href="#">Contact</a>

    </div>

  </div>

  <div className="footer-bottom">
    © 2026 PropNex. Made in India.
  </div>

</footer>

    </div>
  );
};

export default Home;