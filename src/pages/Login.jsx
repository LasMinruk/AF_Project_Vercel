import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    login(email);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gray-100"
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/minimal-world-map-isolated-white-background-with-shadow_1017-42608.jpg?t=st=1746195268~exp=1746198868~hmac=1a08efc4969cca22f324949f86fd30721a5897018ed03dc02e9b4780d67cb235&w=1800")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 sm:p-10 transition-all duration-300">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200"
        >
          ← Go Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">Log in to explore countries you love</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border ${
                error ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-400" : "focus:ring-blue-500"
              } transition duration-200 shadow-inner`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Country Explorer by <span className="text-blue-500 font-medium">Lasiru Minruk</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
