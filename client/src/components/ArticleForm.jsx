// src/components/ArticleForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const MAX_FILE_SIZE = 100 * 1024; // 100 KB

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("Image too large! Please select a file under 100KB.");
      e.target.value = null;
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result); // Base64 string
        console.log("Image converted to Base64");
      };
      reader.readAsDataURL(file);
    }
  };

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
        postType: "article",
        title,
        abstract,
        body,
        tags: tagsArray,
        imageData, // store Base64 string directly
        date: serverTimestamp(),
      });

      alert("Your article has been submitted and saved!");

      // Reset form
      setTitle("");
      setAbstract("");
      setBody("");
      setTags("");
      setImageData("");

      navigate("/");
    } catch (err) {
      console.error("Error saving article:", err);
      alert("Error saving article. Check console.");
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
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Abstract</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          rows={3}
          required
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold mb-1">Article Text</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter the full article text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
      <div>
        <label className="block font-semibold mb-1">Upload Image (≤100KB)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block"
        />
        {imageData && (
          <img
            src={imageData}
            alt="preview"
            className="mt-2 max-h-40 object-cover border rounded"
          />
        )}
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
