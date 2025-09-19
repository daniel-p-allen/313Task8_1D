// Import BrowserRouter to set up page navigation.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import page components for routing.
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import Login from "./pages/Login";   
import SignUp from "./pages/SignUp"; 
import FindQuestion from "./pages/FindQuestion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page renders the existing landing layout */}
        <Route path="/" element={<HomePage />} />

        {/* New Post page (protected) */}
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <NewPostPage />
            </ProtectedRoute>
          }
        />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Signup page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Find Questions page (protected) */}
        <Route
          path="/find-question"
          element={
            <ProtectedRoute>
              <FindQuestion />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
