import React, { useState } from "react";
import api from "../api";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";
import Window from '../assets/window.jpg'

interface LoginProps {
  onLogin: (token: string, user: { email: string; name: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const requestOtp = async () => {
    setError("");
    if (!email) {
      setError("Please enter email");
      return;
    }
    try {
      await api.post("/auth/signup", { email, name: "User " });
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      onLogin(res.data.token, res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - form */}
      <div className="flex flex-1 items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-600 mb-6">Welcome back! Login to continue.</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Always show Email + Send OTP */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={step === 2} // lock email once OTP is requested
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
          />
          <button
            onClick={requestOtp}
            disabled={step === 2}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg mb-4 transition"
          >
            {step === 2 ? "OTP Sent" : "Send OTP"}
          </button>

          {/* Show OTP field only after Send OTP */}
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg mb-4 transition"
              >
                Verify OTP
              </button>
            </>
          )}

          <p className="text-sm text-gray-600 text-center mb-2">
            Or login with Google
          </p>
          <GoogleLoginButton onLogin={onLogin} />

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - image */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
        <img
          src={Window}
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
