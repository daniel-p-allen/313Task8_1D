export default function Footer() {
  return (
    <footer className="bg-teal-200 p-6">
      {/* Footer links */}
      <div className="flex justify-between text-sm">
        <div>
          <h4 className="font-semibold">Explore</h4>
          <p>Home</p>
          <p>Questions</p>
          <p>Articles</p>
          <p>Tutorials</p>
        </div>
        <div>
          <h4 className="font-semibold">Support</h4>
          <p>FAQs</p>
          <p>Help</p>
          <p>Contact Us</p>
        </div>
        <div>
          <h4 className="font-semibold">Stay connected</h4>
          <p>📘 Facebook</p>
          <p>🐦 Twitter</p>
          <p>📸 Instagram</p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-4 text-xs">
        <p>DEV@Deakin 2022</p>
        <p>Privacy Policy | Terms | Code of Conduct</p>
      </div>
    </footer>
  );
}
