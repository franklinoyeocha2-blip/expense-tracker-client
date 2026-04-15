import { useState } from "react";
import api from "../../api/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
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
    console.log(formData);
    setSubmiting(true);
    try {
      const response = await api.post("/signup", formData);
      console.log("Response", response);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      if (response?.status === 201) {
        alert("Account created successfully. Please login to continue.");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong");
    } finally {
      setSubmiting(false);
    }
  }
  return (
    <>
      <div className="w-screen h-screen bg-gray-200 flex place-items-center place-content-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("Submission Data: ", formData);
            await submit();
          }}
          className="bg-white w-96  flex flex-col justify-center items-center gap-4 p-8"
        >
          <h4 className="text-lg font-bold">Create your account</h4>
          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
          {/* Firstname field */}
          <div className="grid w-full">
            <label className="text-sm" htmlFor="">
              First Name
            </label>
            <input
              placeholder="Enter your first name"
              name="first_name"
              type="text"
              required
              className="w-full outline-0 border
               border-gray-200 focus-within:ring-2 text-sm
                focus-within:ring-blue-500 rounded p-2"
              onChange={handleChange}
            />
          </div>
          {/* Lastname field */}
          <div className="grid w-full">
            <label className="text-sm" htmlFor="">
              Last Name
            </label>
            <input
              placeholder="Enter your last name"
              name="last_name"
              type="text"
              className="w-full outline-0 border p-2
               border-gray-200 focus-within:ring-2
                focus-within:ring-blue-500 rounded text-sm"
              onChange={handleChange}
              required
            />
          </div>
          {/* Email field */}
          <div className="grid w-full">
            <label className="text-sm" htmlFor="">
              Email
            </label>
            <input
              placeholder="Enter your email"
              name="email"
              type="email"
              required
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
              required
              className="w-full outline-0 border p-2 text-sm
               border-gray-200 focus-within:ring-2
                focus-within:ring-blue-500 rounded"
              onChange={handleChange}
            />
          </div>
          <p className="text-sm">
            Already have an account? <a href="/">Sign In</a>
          </p>
          <button className="w-full text-white" type="submit">
            {submiting ? "Creating Acount.." : "Create Account"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
