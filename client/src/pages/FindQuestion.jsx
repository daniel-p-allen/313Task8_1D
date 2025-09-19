// src/pages/FindQuestion.jsx
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function FindQuestion() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expanded, setExpanded] = useState({});
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch all questions without ordering
        const q = query(
          collection(db, "articles"),
          where("postType", "==", "question")
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setQuestions(list);

        // Collect unique tags
        const tags = Array.from(
          new Set(list.flatMap((q) => (q.tags ? q.tags : [])))
        );
        setAllTags(tags);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this question?");
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "articles", id));
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      console.log("Deleted posts for this question (placeholder).");
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Apply filters
  const now = new Date();
  const filtered = questions
    .filter((q) => {
      // free text search
      const matchesText = filterText
        ? q.title?.toLowerCase().includes(filterText.toLowerCase())
        : true;

      // tag filter
      const matchesTag = filterTag
        ? Array.isArray(q.tags) &&
          q.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase())
        : true;

      // date filter
      let matchesDate = true;
      if (filterDate && q.date?.toDate) {
        const posted = q.date.toDate();
        if (filterDate === "day") {
          matchesDate = (now - posted) / (1000 * 60 * 60 * 24) <= 1;
        } else if (filterDate === "week") {
          matchesDate = (now - posted) / (1000 * 60 * 60 * 24) <= 7;
        } else if (filterDate === "month") {
          matchesDate = (now - posted) / (1000 * 60 * 60 * 24) <= 30;
        }
      }

      return matchesText && matchesTag && matchesDate;
    })
    .sort((a, b) => {
      if (!a.date?.toDate || !b.date?.toDate) return 0;
      return sortOrder === "desc"
        ? b.date.toDate() - a.date.toDate()
        : a.date.toDate() - b.date.toDate();
    });

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Find Questions</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Free text search */}
          <input
            type="text"
            placeholder="Search title..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border p-2 rounded"
          />

          {/* Tag dropdown - dynamic */}
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="border p-2 rounded max-h-40 overflow-y-auto"
          >
            <option value="">All Tags</option>
            {allTags.map((tag, i) => (
              <option key={i} value={tag.toLowerCase()}>
                {tag}
              </option>
            ))}
          </select>

          {/* Date range dropdown */}
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Any time</option>
            <option value="day">Last Day</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>

          {/* Sort dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          {/* Clear filters */}
          <button
            onClick={() => {
              setFilterText("");
              setFilterTag("");
              setFilterDate("");
            }}
            className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>

        {loading && <p>Loading questions...</p>}

        {!loading && filtered.length === 0 && (
          <p className="text-gray-600">No questions found.</p>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition cursor-pointer"
              onClick={() => toggleExpand(q.id)}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{q.title}</h2>
                {auth.currentUser && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(q.id);
                    }}
                    className="text-red-600 font-bold"
                  >
                    X
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600">
                Asked by{" "}
                <span className="font-medium">
                  {q.authorFirstName} {q.authorLastName}
                </span>{" "}
                {q.date?.toDate
                  ? `on ${q.date.toDate().toLocaleString()}`
                  : ""}
              </p>

              {/* Expandable content */}
              {expanded[q.id] && (
                <div className="mt-2">
                  <p>{q.description}</p>
                  {q.tags && q.tags.length > 0 && (
                    <p className="mt-1 text-blue-600">
                      {q.tags.map((tag, i) => (
                        <span key={i} className="mr-2">
                          #{tag}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
