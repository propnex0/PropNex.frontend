import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://prop-nex-backend.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>
        <p>Welcome! Create your account</p>

        <form onSubmit={submitHandler}>

          <div className="form-group">
            <label>FULL NAME</label>

            <input
              type="text"
              placeholder="Rahul Mehta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>EMAIL</label>

            <input
              type="email"
              placeholder="you@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="register-btn"
            type="submit"
          >
            Get Started
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>

      </div>

    </div>
  );
};

export default Register;