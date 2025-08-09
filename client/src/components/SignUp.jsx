export default function SignUp() {
  return (
    <section className="bg-gray-100 py-2 px-6 w-full overflow-hidden">
      <div className="flex items-center /* no mb here */">
        <label className="font-bold mr-2 whitespace-nowrap">
          SIGN UP FOR OUR DAILY INSIDER
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-2 py-1 border rounded flex-1"
        />
        <button className="ml-2 px-4 py-1 bg-gray-400 rounded">
          Subscribe
        </button>
      </div>
    </section>
  );
}
