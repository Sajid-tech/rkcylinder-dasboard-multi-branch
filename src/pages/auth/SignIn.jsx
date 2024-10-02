import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp, setUserInfo } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);

    //create a formData object and append state values
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/web-login`, formData);

      if (res.status === 200) {
        const { token, user } = res.data.UserInfo;
        if (token) {
          // if (user.branch_id === 1) {
          //   // Block user with branchId === 1
          //   toast.error("You cannot log in. Please contact the admin.");
          //   setLoading(false);
          //   return;
          // }
          // Store the token in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("branchId", user.branch_id);
          localStorage.setItem("userTypeId", user.user_type_id);
          localStorage.setItem("mobile", user.mobile);
          // Update context
          setUserInfo({
            branchId: user.branch_id,
            userTypeId: user.user_type_id,
          });

          if (
            (user.branch_id === 1 || user.branch_id === 2) &&
            user.user_type_id === 2
          ) {
            navigate("/cylinder");
          } else if (
            (user.branch_id === 1 || user.branch_id === 2) &&
            user.user_type_id === 1
          ) {
            navigate("/user-view-cylinder");
          } else {
            toast.error("Access not permitted.");
          }
        } else {
          toast.error("Login Failed, Token not received.");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error("signin errr", error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <section className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center animate-bgShift">
        {/* Login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* Form */}
          <div className="md:w-1/2 px-8 md:px-16">
            {/* Logo Image */}
            <div className="flex justify-center mb-4">
              <img
                src="/rkcyllogo.png"
                alt="RK Cylinder Logo"
                className="h-14 w-auto rounded-lg  "
              />
            </div>
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>

            <form
              onSubmit={handleSumbit}
              method="POST"
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="username"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Mobile No"
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <button
                type="sumbit"
                disabled={loading}
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                {loading ? "Checking..." : "Sign In"}
              </button>
            </form>

            <div className="mt-5 text-xs  py-4 text-[#002D74]">
              <Link to="/forget-password">Forgot your password?</Link>
            </div>
          </div>

          {/* Image */}
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="/logo3.png"
              alt="Login illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
