import { useState } from 'react';

/**
 * QuestionForm collects information for a question post. It exposes
 * controlled inputs for the title, a description of the problem and up
 * to three tags. Currently the form simply logs the data and shows an
 * alert when submitted – database integration will be added later.
 */
export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data. Real persistence will be added later.
    console.log({ title, description, tags });
    alert('Your question has been submitted (not saved yet).');
    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Describe your problem</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold mb-1">Tags</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-gray-300 rounded">Post</button>
    </form>
  );
}
