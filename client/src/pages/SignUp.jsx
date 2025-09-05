// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [err,       setErr]       = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setErr("");

  if (password !== confirm) {
    setErr("Passwords do not match.");
    return;
  }

  try {
    // 1) Create the account (this signs the user in)
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // 2) Try to save profile; if this fails, don't block redirect
    try {
      await setDoc(doc(db, "users", cred.user.uid), {
        firstName,
        lastName,
        email,
      });
    } catch (firestoreErr) {
      console.error("Firestore write failed:", firestoreErr?.code, firestoreErr?.message);
    }

    // 3) If the brief demands the Login page after signup, sign out first
    //    (otherwise skip these two lines and navigate("/") directly)
    await signOut(auth);
    navigate("/login"); // OR navigate("/");

  } catch (authErr) {
    console.error("Auth error:", authErr?.code, authErr?.message);
    const map = {
      "auth/email-already-in-use": "Email already in use.",
      "auth/invalid-email": "Invalid email address.",
      "auth/weak-password": "Password must be at least 6 characters.",
    };
    setErr(map[authErr?.code] || "Registration failed. Please try again.");
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
            Create a <span className="text-blue-600">DEV@Deakin</span> Account
        </h1>

      {err && <p className="text-red-600 mb-4">{err}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

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
            autoComplete="new-password"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already registered?{" "}
        <Link to="/login" className="underline text-blue-600">
          Login here
        </Link>
      </p>
    </div>
  );
}
