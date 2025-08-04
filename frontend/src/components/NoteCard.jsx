import { useState } from 'react';
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
const stripHtmlTags = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};
const NoteCard = ({ note, onDelete, onEdit, onView }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(note._id);
  };

  const truncateContent = (text, maxLength = 200) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/60 border border-zinc-700 rounded-xl shadow-xl p-5 group transition duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        {/* Title & Actions */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-semibold text-white lowercase leading-snug line-clamp-2">
            {note.title || 'untitled'}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(note)}
              className="text-blue-400 hover:text-blue-300 p-1 transition"
              title="View"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEdit(note)}
              className="text-purple-400 hover:text-purple-300 p-1 transition"
              title="Edit"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-400 hover:text-red-300 p-1 transition"
              title="Delete"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-200 leading-relaxed line-clamp-5 mb-4">
          {truncateContent(stripHtmlTags(note.content) || 'No content')}
        </div>

        {/* Date */}
        <div className="text-xs text-gray-400 mt-auto">{formatDate(note.createdAt)}</div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-xl border border-purple-500/30 max-w-sm w-full space-y-4">
            <h3 className="text-white text-lg font-semibold">Delete Note</h3>
            <p className="text-gray-300">
              Are you sure you want to delete{' '}
              <span className="text-purple-300 font-medium">"{note.title}"</span>? This action
              cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
