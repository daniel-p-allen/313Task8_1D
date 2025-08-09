// This component displays a single article preview.
export default function ArticleCard({ title, description, author, rating }) {
  return (
    <div className="border p-4 w-64 bg-white shadow rounded">
      {/* Placeholder for image */}
      <div className="h-32 bg-gray-200 mb-4 flex items-center justify-center">
        <span className="text-sm text-gray-500">Article image</span>
      </div>

      {/* Title and description */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 italic">{description}</p>

      {/* Rating and author */}
      <hr className="my-2" />
      <p className="text-sm">
        <span className="text-yellow-500">⭐</span> {rating} {author}
      </p>
    </div>
  );
}
