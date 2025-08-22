import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import ArticleForm from '../components/ArticleForm';

// Conditional rendering.
export default function NewPostPage() {
  // State to track whether the user is creating a question or an article.
  const [postType, setPostType] = useState('question');

  return (
    <div className="p-6 bg-white text-black font-sans">
      <h2 className="text-2xl font-bold mb-4">New Post</h2>
      {/* Post type selection */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="font-semibold">Select Post Type:</label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="postType"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
            className="mr-2"
          />
          Question
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="postType"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
            className="mr-2"
          />
          Article
        </label>
      </div>
      {/* Conditionally render either the question form or article form */}
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
}
