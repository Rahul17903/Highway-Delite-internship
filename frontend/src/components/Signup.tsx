import React, { useState } from "react";
import api from "../api";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom"; 
import windows from '../assets/window.jpg'

interface SignupProps {
  onLogin: (token: string, user: { email: string; name: string }) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const requestOtp = async () => {
    setError("");
    if (!email || !name) {
      setError("Please enter name and email");
      return;
    }
    try {
      await api.post("/auth/signup", { email, name });
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
          <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-6">
            Sign up to enjoy the feature of HD
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={requestOtp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg mb-4 transition"
              >
                Send OTP
              </button>
              <GoogleLoginButton onLogin={onLogin} />

              {/* 👇 Login redirect */}
              <p className="text-sm text-gray-600 mt-4 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg mb-4 transition"
              >
                Verify OTP
              </button>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Signup
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right side - image */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
        <img
          src={windows}
          alt="Signup Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
