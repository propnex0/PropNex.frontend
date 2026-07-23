import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

const [showOtpBox, setShowOtpBox] = useState(false);

const [message, setMessage] = useState("");

const [otp, setOtp] = useState(["", "", "", "", "", ""]);

const [timer, setTimer] = useState(30);

const [canResend, setCanResend] = useState(false);

const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

  if (!showOtpBox) return;

  if (timer === 0) {
    setCanResend(true);
    return;
  }

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);

}, [timer, showOtpBox]);
const handleOtpChange = (value: string, index: number) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

const handlePaste = (
  e: React.ClipboardEvent<HTMLInputElement>
) => {
  e.preventDefault();

  const pasted = e.clipboardData.getData("text").trim();

  if (!/^\d{6}$/.test(pasted)) return;

  const values = pasted.split("");

  setOtp(values);

  values.forEach((value, index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]!.value = value;
    }
  });

  inputRefs.current[5]?.focus();
};

const resendOtp = async () => {
  try {
    const response = await fetch(
      "https://prop-nex-backend.vercel.app/api/auth/resend-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setTimer(30);
      setCanResend(false);
    } else {
      alert(data.message);
    }
  } catch {
    alert("Failed to resend OTP");
  }
};
const verifyOtp = async () => {
 

  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 6) {
    alert("Please enter 6 digit OTP");
    return;
  }

  try {

    const response = await fetch(
      "https://prop-nex-backend.vercel.app/api/auth/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {

      setMessage("✅ Email verified successfully.");

setTimeout(() => {
  navigate("/login");
}, 1500);

     

    } else {

      alert(data.message);

    }

  } catch (error) {

    alert("Verification Failed");

  }

};
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

if (response.ok) {

  setMessage(
    "OTP sent successfully! Please check your Inbox. If you don't see the email, check your Spam/Junk folder."
  );

  setShowOtpBox(true);

  setTimer(30);

  setCanResend(false);

  setName("");

  setPassword("");

}else {
  alert(data.message);
}

    
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
{!showOtpBox && (
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

)}
        {
showOtpBox && (

<div className="otp-section">

<div className="success-box">
  {message}
</div>

<div className="form-group">

<label>Email</label>

<input
type="email"
value={email}
readOnly
/>

</div>

<label>OTP</label>

<div className="otp-boxes">

{
otp.map((digit,index)=>(

<input

key={index}

ref={(el)=>{

inputRefs.current[index]=el;

}}

value={digit}

maxLength={1}

inputMode="numeric"

autoComplete="one-time-code"

onPaste={handlePaste}

onKeyDown={(e)=>
handleKeyDown(e,index)
}

onChange={(e)=>
handleOtpChange(
e.target.value,
index
)
}

/>

))
}

</div>

<button

type="button"

className="register-btn"

onClick={verifyOtp}

>

Verify OTP

</button>

{
canResend ? (

<p
  className="resend"
  onClick={resendOtp}
>
  Resend OTP
</p>

):(

<p className="timer">

Resend OTP in {timer}s

</p>

)

}

</div>

)
}

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>

      </div>

    </div>
  );
};

export default Register;