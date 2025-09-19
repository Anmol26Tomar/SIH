import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
  const BACKEND_URL = "https://fra-sih-server-2.onrender.com/user";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast("Please enter both email and password", {
        icon: "⚠️",
        style: { background: "#facc15", color: "#000" },
      });
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/signin`, { email, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Signed in successfully");
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      console.error("Signin failed:", error);
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        {/* Header */}
        <div className="mb-4 text-center">
          <h2 className="text-black text-2xl font-bold">Sign in</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and password to access your account
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <label className="text-black text-sm" htmlFor="email">Email</label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="john_doe@example.com"
              className="text-black bg-white border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-black text-sm" htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="*******"
              className="text-black bg-white border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <button
            type="button"
            onClick={signin}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
