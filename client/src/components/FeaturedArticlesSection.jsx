import ArticleCard from './ArticleCard';

// This section displays three article cards and a "See all" button.
export default function FeaturedArticlesSection() {
  const articles = [
    { title: 'React or Vue', description: 'e.g., React OR Vue', author: 'Author A', rating: 5 },
    { title: 'NodeJS Basics', description: 'e.g., NodeJS', author: 'Author B', rating: 5 },
    { title: 'React Hooks', description: 'e.g., React Hooks', author: 'Author C', rating: 5 }
  ];

  return (
    <section className="my-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
      <div className="flex gap-6">
        {articles.map((item, i) => (
          <ArticleCard key={i} {...item} />
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-gray-300 rounded">See all articles</button>
    </section>
  );
}
