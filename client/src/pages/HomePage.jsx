import NavBar from '../components/NavBar';
import FeaturedArticlesSection from '../components/FeaturedArticlesSection';
import FeaturedTutorialsSection from '../components/FeaturedTutorialsSection';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';


// HomePage renders the landing page for the app so App.js can now focus solely on routing.

export default function HomePage() {
  return (
    <div className="bg-white text-black font-sans">
      <NavBar />
      {/* Hero banner */}
      <div className="h-64 bg-gray-300 flex items-center justify-center">
        <span className="text-xl text-gray-700">Image</span>
      </div>
      <FeaturedArticlesSection />
      <FeaturedTutorialsSection />
      <SignUp />
      <Footer />
    </div>
  );
}
