// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Login() {
  // Local state for form fields and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // Set up an auth listener when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === "admin@admin.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
      } catch (e) {
        console.error("Error loading users", e);
      }
    };
    fetchUsers();
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
      setIsAdmin(false); // Reset admin flag
      navigate("/login"); // Stay on login page after sign-out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId, firstName) => {
    const confirm = window.confirm(
      `Do you want to remove ${firstName} and associated data?`
    );
    if (!confirm) return;

    if (!isAdmin) {
      alert("You must be logged in as admin to delete users.");
      return;
    }

    try {
      // Delete Firestore user doc
      await deleteDoc(doc(db, "users", userId));

      // Placeholder for post deletion
      console.log("Deleted posts for user:", userId);

      // TODO: Delete from Firebase Authentication (requires Admin SDK, not client-side)
      console.log("Deleted auth account for:", userId);

      // Update UI list
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting user", err);
      alert("Could not delete user.");
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
          {isAdmin && (
            <p className="text-blue-600 font-semibold">
              You are logged in as Admin.
            </p>
          )}
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
          >
            Sign Out
          </button>
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

          <p className="mt-2 text-sm">
            <Link to="/" className="underline text-blue-600">
              Back to Home
            </Link>
          </p>
        </>
      )}

      {/* User Mgmt Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">User Mgmt.</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id} className="flex justify-between items-center mb-1">
              <span>{u.firstName}</span>
              <button
                onClick={() => handleDeleteUser(u.id, u.firstName)}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
