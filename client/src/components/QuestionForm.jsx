// src/components/QuestionForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

export default function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState({ firstName: "", lastName: "" });

  const navigate = useNavigate();

  // Fetch the current user's name from Firestore when logged in
  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        try {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data();
            setAuthor({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
            });
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      await addDoc(collection(db, "articles"), {
        uid: auth.currentUser ? auth.currentUser.uid : null,
        postType: "question",
        title,
        description,
        tags: tagsArray,
        date: serverTimestamp(),
        authorFirstName: author.firstName,
        authorLastName: author.lastName,
      });

      alert("Your question has been submitted and saved!");

      // Reset form
      setTitle("");
      setDescription("");
      setTags("");

      // Redirect to home
      navigate("/");
    } catch (err) {
      console.error("Error saving question:", err);
      alert("Error saving question. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Describe your problem</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold mb-1">Tags</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Add up to 3 tags (comma separated) e.g., Java, React"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded flex items-center justify-center ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
}
