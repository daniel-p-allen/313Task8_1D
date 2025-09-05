import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect home on success
    } catch {
      setErr("Invalid email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {err && <p className="text-red-600 mb-4">{err}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Enter Email</label>
          <input
            type="email"
            placeholder="user@here.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Enter Password</label>
          <input
            type="password"
            placeholder="Enter at least 6 characters."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
        >
          Submit
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="underline text-blue-600">
          Create one here
        </Link>
      </p>
    </div>
  );
}
