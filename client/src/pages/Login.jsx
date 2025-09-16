// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  // Local state for form fields and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Set up an auth listener when the component mounts.
  // onAuthStateChanged returns an unsubscribe function, which we call on unmount
  // to prevent memory leaks and avoid updating state after unmount.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home on success
    } catch {
      setErr("Invalid email or password.");
    }
  };

  // Handle sign-out when the user is already logged in
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state after sign-out
      navigate("/login"); // Stay on login page after sign-out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* If a user is logged in, show a sign-out option instead of the login form */}
      {user && (
        <div className="mb-4">
          <p className="mb-2 text-green-600">
            You are already logged in as <strong>{user.email}</strong>.
          </p>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
          {/* Allow user to go back to home */}
          <p className="mt-2 text-sm">
            <Link to="/" className="underline text-blue-600">
              Back to Home
            </Link>
          </p>
        </div>
      )}

      {/* If no user is logged in, show the login form */}
      {!user && (
        <>
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

          {/* Allow navigation back to home */}
          <p className="mt-2 text-sm">
            <Link to="/" className="underline text-blue-600">
              Back to Home
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
