import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://prop-nex-backend.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {
        const userResponse = await fetch(
          "https://prop-nex-backend.vercel.app/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );

        const userData = await userResponse.json();

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userData,
            token: data.token,
          })
        );

        alert("Login Successful");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Sign in</h1>
        <p>Welcome back to PropSite</p>

        <form onSubmit={submitHandler}>

          <div className="form-group">
            <label>EMAIL OR PHONE NUMBER</label>

            <input
              type="email"
              placeholder="you@agency.com or 9876543210"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">

            <label>PASSWORD</label>

            <div className="password-box">

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <FiEye className="eye-icon" />

            </div>

          </div>

          <Link to="/forgot-password">
  Forgot password?
</Link>

          <button className="login-btn">
            Sign In
          </button>

        </form>

        <div className="signup-text">
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </div>

      </div>

    </div>
  );
};

export default Login;