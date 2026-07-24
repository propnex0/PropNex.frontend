import { useEffect, useRef, useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const [showOtpBox, setShowOtpBox] = useState(false);

const [message, setMessage] = useState("");

const [otp, setOtp] = useState(["", "", "", "", "", ""]);

const [timer, setTimer] = useState(30);

const [canResend, setCanResend] = useState(false);

const [loading, setLoading] = useState(false);
const [showResetBox, setShowResetBox] = useState(false);

const [newPassword, setNewPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


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
const handleOtpChange = (
  value: string,
  index: number
) => {

  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];

  newOtp[index] = value;

  setOtp(newOtp);

  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }

  if (value && index === 5) {

    setTimeout(() => {

      verifyResetOtp(
        newOtp.join("")
      );

    }, 150);

  }

};
const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) => {

  if (
    e.key === "Backspace" &&
    !otp[index] &&
    index > 0
  ) {
    inputRefs.current[index - 1]?.focus();
  }

};
const handlePaste = (
  e: React.ClipboardEvent<HTMLInputElement>
) => {

  e.preventDefault();

  const pasted = e.clipboardData
    .getData("text")
    .trim();

  if (!/^\d{6}$/.test(pasted)) return;

  const values = pasted.split("");

  setOtp(values);

  verifyResetOtp(values.join(""));
};
const verifyResetOtp = async (
  otpValue?: string
) => {

  const enteredOtp =
    otpValue || otp.join("");

  if (enteredOtp.length !== 6) {
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
      "https://prop-nex-backend.vercel.app/api/auth/verify-reset-otp",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {

      setShowResetBox(true);

      setShowOtpBox(false);

    } else {

      alert(data.message);

    }

  } catch (error) {

    alert("OTP Verification Failed");

  } finally {

    setLoading(false);

  }

};
const resetPassword = async () => {

  if (!newPassword.trim()) {
    alert("Please enter new password");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
      "https://prop-nex-backend.vercel.app/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: newPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("Password Updated Successfully");

      window.location.href = "/login";

    } else {

      alert(data.message);

    }

  } catch (error) {

    alert("Password Update Failed");

  } finally {

    setLoading(false);

  }

};
const resendOtp = async () => {

  try {

    const response = await fetch(
      "https://prop-nex-backend.vercel.app/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {

      setMessage(data.message);

      setTimer(30);

      setCanResend(false);

      setOtp(["", "", "", "", "", ""]);

    } else {

      alert(data.message);

    }

  } catch {

    alert("Failed to resend OTP");

  }

};
  const submitHandler = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

  setLoading(true);

  const response = await fetch(
    "https://prop-nex-backend.vercel.app/api/auth/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  const data = await response.json();

  if (response.ok) {

    setMessage(data.message);

    setShowOtpBox(true);

    setTimer(30);

    setCanResend(false);

  } else {

    alert(data.message);

  }

} catch (error) {

  console.log(error);

  alert("Failed to send OTP");

} finally {

  setLoading(false);

}

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email to receive OTP.
        </p>
{!showOtpBox && !showResetBox && (
        <form onSubmit={submitHandler}>

          <div className="form-group">

            <label>EMAIL</label>

            <input
              type="email"
              placeholder="you@agency.com"
              value={email}
              onChange={(e)=>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <button
            className="register-btn"
            type="submit"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>
        )}
        {showOtpBox && (

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

    {otp.map((digit, index) => (

      <input
  key={index}
  ref={(el) => {
    inputRefs.current[index] = el;
  }}
  value={digit}
  maxLength={1}
  inputMode="numeric"
  autoComplete="one-time-code"
  onPaste={handlePaste}
  onKeyDown={(e) =>
    handleKeyDown(e, index)
  }
  onChange={(e) =>
    handleOtpChange(
      e.target.value,
      index
    )
  }
/>

    ))}

  </div>

  {canResend ? (

    <p
  className="resend"
  onClick={resendOtp}
>
      Resend OTP
    </p>

  ) : (

    <p className="timer">
      Resend OTP in {timer}s
    </p>

  )}

  {loading && (

    <div className="loading-box">

      <div className="spinner"></div>

      <span>
        Verifying OTP...
      </span>

    </div>

  )}

</div>

)}
{showResetBox && (

<div className="otp-section">

<h2>Reset Password</h2>

<div className="form-group">

<label>New Password</label>

<input
type="password"
value={newPassword}
onChange={(e)=>
setNewPassword(e.target.value)
}
/>

</div>

<div className="form-group">

<label>Confirm Password</label>

<input
type="password"
value={confirmPassword}
onChange={(e)=>
setConfirmPassword(e.target.value)
}
/>

</div>

<button
type="button"
className="register-btn"
onClick={resetPassword}
>

Update Password

</button>

</div>

)}
      </div>

    </div>

  );

};

export default ForgotPassword;