import { useState } from "react";
import bgImg from "../../assets/login-bg.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router";
import { handleLogin } from "../../services/Auth.service";
import { useAuth } from "../../hooks";
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: { email?: string; password?: string } = {};

    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const { accessToken, refreshToken } = await handleLogin({
          email,
          password,
        });
        login(accessToken, refreshToken);
        navigate("/");
      } catch (error) {
        alert(error?.response?.data?.message);
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
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
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
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
