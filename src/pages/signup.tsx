import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const FRONTEND_URL = "";
  const BACKEND_URL = "https://fra-sih-server-2.onrender.com/user";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast("This is a warning!", {
        icon: "⚠️",
        style: {
          background: "#facc15",
          color: "#000",
        },
      });
      return;
    }

    try {
      const response = await axios.post(BACKEND_URL + "/signup", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate(`${FRONTEND_URL}/`);
      }, 800);
      toast.success("You have successfully signed in");
    } catch (error) {
      console.error("Signin failed:", error);
      toast.error("Enter right credentials");
    }
  }
  return (
    <div className="">
      <div
        className="bg-white
        flex   justify-center items-center"
      >
        {/* Left section with MockCanvas (hidden on small screens) */}

        {/* Signup Form */}
        <div className=" flex justify-center items-center">
          <div className="bg-white w-96  m-20 rounded-xl p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 text-center">
              <h2 className="text-black text-2xl font-bold">
                Create new account
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Enter your details below to get started
              </p>
              <button
                className="text-blue-400 hover:underline mt-2 text-sm"
                onClick={() => navigate(`/signin`)}
              >
                Already have an account? Log In
              </button>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label className="text-black text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  ref={emailRef}
                  className="text-black bg-white border border-gray-700 rounded-lg p-2"
                  id="email"
                  type="email"
                  placeholder="john_doe@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-black text-sm" htmlFor="password">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  className="text-black bg-white
                   border border-gray-700 rounded-lg p-2"
                  id="password"
                  type="password"
                  placeholder="*******"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                onClick={signup}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
