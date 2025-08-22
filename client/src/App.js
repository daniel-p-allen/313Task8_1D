// Import BrowserRouter to set up page navigation.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import page components for routing. HomePage contains the existing
// landing page layout and NewPostPage contains the post creation form.
import HomePage from './pages/HomePage';
import NewPostPage from './pages/NewPostPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page renders the existing landing layout */}
        <Route path="/" element={<HomePage />} />
        {/* New Post page displays the post creation form */}
        <Route path="/post" element={<NewPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
