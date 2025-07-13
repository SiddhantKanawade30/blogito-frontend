// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const {
    _id,
    title,
    content,
    author,          // populated object: { _id, email }
    createdAt,
  } = blog;

  return (
    <article
      className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-5 shadow hover:shadow-lg transition"
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
        {title}
      </h2>

      {/* Meta info */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        by&nbsp;
        <Link
          to={`/profile/${author?._id}`}
          className="hover:underline text-primary-600 dark:text-primary-400"
        >
          {author?.email}
        </Link>
        &nbsp;•&nbsp;
        {dayjs(createdAt).fromNow()}
      </div>

      {/* Snippet */}
      <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
        {content}
      </p>

      {/* Read more */}
      <div className="mt-4">
        <Link
          to={`/blog/${_id}`}
          className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          Read full post →
        </Link>
      </div>
    </article>
  );
}
    