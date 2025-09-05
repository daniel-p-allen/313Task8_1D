// Import BrowserRouter to set up page navigation.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import page components for routing.
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import Login from "./pages/Login";   
import SignUp from "./pages/SignUp"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page renders the existing landing layout */}
        <Route path="/" element={<HomePage />} />

        {/* New Post page displays the post creation form */}
        <Route path="/post" element={<NewPostPage />} />

        {/* Login here */}
        <Route path="/login" element={<Login />} />

        {/* Signup page here */}
        <Route path="/signup" element={<SignUp />} />

        
      </Routes>
    </Router>
  );
}


//         {/* Sign Up page */}
//         <Route path="/signup" element={<SignUp />} />
export default App;