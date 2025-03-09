import { useState } from "react";
import bgImg from "../../assets/login-bg.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router";
import { ILoginErrors } from "../../interfaces";
import { handleSignUp } from "../../services/Auth.service";
export default function Signup() {

//hooks setup and declarations
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [errors, setErrors] = useState<ILoginErrors>({});
  const navigate = useNavigate();

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: ILoginErrors = {};

    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";
    if (!conPassword) formErrors.conPassword = "Please re enter the Password";
    if (password && conPassword && password !== conPassword)
      formErrors.conPassword = "Password does't match";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await handleSignUp({email,password})
        navigate("/login");
      }catch (err) {
        alert(err?.response?.data?.message)
        console.error("Error during signup:", err);
      }

    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-blue-300">
        <div
          className="w-full h-1/3 md:h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
        <div className="md:w-1/2 w-full flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowConPassword(!showConPassword)}
                  >
                    {showConPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.conPassword && (
                  <p className="text-red-500 text-sm">{errors.conPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
