// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-teal-200 p-6">
      {/* Footer links */}
      <div className="flex justify-between text-sm">
        <div>
          <h4 className="font-semibold">Explore</h4>
          <Link to="/" className="block hover:underline">
            Home
          </Link>
          <Link to="/find-question" className="block hover:underline">
            Questions
          </Link>
          <Link to="/post" className="block hover:underline">
            Articles
          </Link>
          <Link to="/post" className="block hover:underline">
            Tutorials
          </Link>
        </div>
        <div>
          <h4 className="font-semibold">Support</h4>
          <Link to="/faqs" className="block hover:underline">
            FAQs
          </Link>
          <Link to="/help" className="block hover:underline">
            Help
          </Link>
          <Link to="/contact" className="block hover:underline">
            Contact Us
          </Link>
        </div>
        <div>
          <h4 className="font-semibold">Stay connected</h4>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            📘 Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            🐦 Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            📸 Instagram
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-4 text-xs">
        <p>DEV@Deakin 2025</p>
        <p>Privacy Policy | Terms | Code of Conduct</p>
      </div>
    </footer>
  );
}
