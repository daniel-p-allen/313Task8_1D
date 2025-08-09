import TutorialCard from './TutorialCard';

// This section displays three tutorial cards and a "See all" button.
export default function FeaturedTutorialsSection() {
  const tutorials = [
    { title: 'JS6', description: 'e.g., JS6 ______', author: 'username1', rating: 5 },
    { title: 'React Router', description: 'e.g., React Router', author: 'username2', rating: 5 },
    { title: 'Express', description: 'e.g., Express______', author: 'username3', rating: 4.9 }
  ];

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Featured Tutorials</h2>
      <div className="flex gap-6">
        {tutorials.map((item, i) => (
          <TutorialCard key={i} {...item} />
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-gray-300 rounded">See all tutorials</button>
    </section>
  );
}
