// This component renders the top navigation bar for the app.
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-gray-100 px-6 py-4 shadow">
      {/* App title on the left */}
      <span className="text-xl font-bold text-gray-800">DEV@Deakin</span>

      {/* Centered search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 mx-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Buttons on the right */}
      <div className="space-x-4">
        {/* Use a Link for navigating to the new post page */}
        <Link
          to="/find-question"
          className="px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-600 hover:text-white"
        >
          Find Question
        </Link>
        <Link
          to="/post"
          className="px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-600 hover:text-white"
        >
          Post
        </Link>
        
          <Link
          to="/login"
          className="px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-600 hover:text-white"
        >
          Login
        </Link>
        
      </div>
    </nav>
  );
}
