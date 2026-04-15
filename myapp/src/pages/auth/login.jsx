import { useState } from "react";
import api from "../../api/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function submit() {
    setSubmiting(true);
    try {
      const response = await api.post("/login", formData);
      console.log("Response", response);
      setFormData({ email: "", password: "" });
      // window.location.href = "/";
    } catch (error) {
      console.log("Error: ", error);
      setError(error?.response?.data?.errors[0]?.msg || "Something went wrong");
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <>
      <div className="w-screen h-screen bg-gray-200 flex place-items-center place-content-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="bg-white w-96  flex flex-col justify-center items-center gap-4 p-8"
        >
          <h4 className="text-lg font-bold">Sign in to your account</h4>

          {/* Email field */}
          <div className="grid w-full">
            <label className="text-sm" htmlFor="">
              Email
            </label>
            <input
              placeholder="Enter your email"
              name="email"
              type="email"
              value={formData.email}
              className="w-full outline-0 border p-2
               border-gray-200 focus-within:ring-2 
               focus-within:ring-blue-500 rounded text-sm"
              onChange={handleChange}
            />
          </div>
          {/* Password Field */}
          <div className="grid w-full">
            <label className="text-sm" htmlFor="">
              Password
            </label>
            <input
              placeholder="Enter your password"
              name="password"
              type="password"
              value={formData.password}
              className="w-full outline-0 border p-2 text-sm
               border-gray-200 focus-within:ring-2
                focus-within:ring-blue-500 rounded"
              onChange={handleChange}
            />
          </div>
          <p className="text-sm">
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </p>
          <button className="w-full text-white" type="submit">
            {submiting ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
