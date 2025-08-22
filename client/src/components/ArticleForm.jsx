import { useState } from 'react';

// Collects info, will be saved in later versions.
export default function ArticleForm() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, abstract, body, tags });
    alert('Your article has been submitted (not saved yet).');
    // Clear form fields after submission
    setTitle('');
    setAbstract('');
    setBody('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Abstract</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          rows={3}
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold mb-1">Article Text</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter the full article text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold mb-1">Tags</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-gray-300 rounded">Post</button>
    </form>
  );
}
