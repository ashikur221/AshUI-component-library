import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProvider';

const Login = () => {

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log(formData.email, formData.password);
    loginUser(formData.email, formData.password)
      .then(res => {
        navigate("/dashboard");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login has been successful",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(err => {
        console.log(err.message);
      })
  };


  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">


            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Input */}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/admin-registration" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
