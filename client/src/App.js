// This file renders the main layout by composing all major components.
import NavBar from './components/NavBar';
import FeaturedArticlesSection from './components/FeaturedArticlesSection';
import FeaturedTutorialsSection from './components/FeaturedTutorialsSection';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="bg-white text-black font-sans">
      {/* Top navigation */}
      <NavBar />

      {/* Hero banner */}
      <div className="h-64 bg-gray-300 flex items-center justify-center">
        <span className="text-xl text-gray-700">Image</span>
      </div>
      
      {/* Article section */}
      <FeaturedArticlesSection />

      {/* Tutorial section */}
      <FeaturedTutorialsSection />

      {/* Signup section */}
      <SignUp />

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default App;
