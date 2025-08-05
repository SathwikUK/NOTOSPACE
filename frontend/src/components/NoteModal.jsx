import { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteModal = ({ isOpen, onClose, onSave, note = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [editorMode, setEditorMode] = useState('rich');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note, isOpen]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'blockquote', 'code-block'],
        ['clean']
      ]
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'align',
    'link', 'blockquote', 'code-block'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    await onSave({ title: title.trim(), content: content.trim() });
    setLoading(false);
    onClose();
  };

  const getPlainTextContent = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const contentLength = editorMode === 'rich'
    ? getPlainTextContent(content).length
    : content.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-5xl max-h-[95vh] bg-[#111827] text-white rounded-xl shadow-2xl overflow-hidden flex flex-col mx-2 sm:mx-4">
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-base sm:text-lg font-medium tracking-wide text-white">
            {note ? 'edit note' : 'create new note'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-white transition" />
          </button>
        </div>

        {/* Editor Mode Toggle */}
        <div className="flex gap-2 sm:gap-3 px-4 sm:px-6 pt-3 sm:pt-4 flex-shrink-0">
          <button
            onClick={() => setEditorMode('rich')}
            className={`px-3 sm:px-4 py-1.5 text-xs rounded-full transition ${
              editorMode === 'rich'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white border border-gray-600'
            }`}
          >
            rich text
          </button>
          <button
            onClick={() => setEditorMode('plain')}
            className={`px-3 sm:px-4 py-1.5 text-xs rounded-full transition ${
              editorMode === 'plain'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white border border-gray-600'
            }`}
          >
            plain text
          </button>
        </div>

        {/* Form - Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Title Input */}
            <div>
              <label className="block mb-1 sm:mb-2 text-sm text-gray-400 lowercase">title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="note title..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-800/60 border border-gray-600/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                maxLength={200}
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                {title.length}/200 characters
              </div>
            </div>

            {/* Content Input */}
            <div className="flex-1">
              <label className="block mb-1 sm:mb-2 text-sm text-gray-400 lowercase">content</label>
              {editorMode === 'rich' ? (
                <div className="space-y-2">
                  <div className="quill-container">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      placeholder="start writing your content..."
                      className="bg-gray-900 text-white rounded-lg"
                      style={{ height: '250px' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {contentLength}/10,000 characters
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="start writing your content..."
                    rows={10}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-800/60 border border-gray-600/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                    maxLength={10000}
                    required
                    style={{ minHeight: '250px' }}
                  />
                  <div className="text-xs text-gray-500">
                    {contentLength}/10,000 characters
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-700">
            <span className="text-xs text-gray-500 lowercase text-center sm:text-left">
              {note
                ? `last updated: ${new Date(
                    note.updatedAt || note.createdAt
                  ).toLocaleDateString()}`
                : 'new note'}
            </span>

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all text-sm"
              >
                cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!title.trim() || !content.trim() || loading}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>saving...</span>
                  </div>
                ) : (
                  note ? 'update note' : 'create note'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Custom Quill Styles */}
        <style>{`
          .quill-container {
            height: 250px;
            margin-bottom: 0px;
          }

          .ql-toolbar {
            background: #1f2937 !important;
            border: 1px solid #4b5563 !important;
            border-radius: 8px 8px 0 0 !important;
            padding: 8px 10px !important;
            height: 42px !important;
          }

          .ql-container {
            background: #111827 !important;
            border: 1px solid #4b5563 !important;
            border-top: none !important;
            border-radius: 0 0 8px 8px !important;
            height: calc(250px - 42px) !important;
          }

          .ql-editor {
            font-size: 14px !important;
            color: white !important;
            padding: 15px 20px !important;
            line-height: 1.6 !important;
            height: calc(250px - 42px - 30px) !important;
            overflow-y: auto !important;
          }

          .ql-editor.ql-blank::before {
            color: #9ca3af !important;
            font-style: normal;
            font-size: 14px !important;
          }

          .ql-editor h1, .ql-editor h2, .ql-editor h3 {
            color: #f3f4f6 !important;
          }

          .ql-editor blockquote {
            border-left: 4px solid #a855f7;
            padding-left: 16px;
            color: #e0e7ff;
            background-color: rgba(168, 85, 247, 0.1);
            margin: 16px 0;
          }

          .ql-editor code {
            background: rgba(107, 114, 128, 0.3);
            color: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
          }

          .ql-toolbar button:hover .ql-stroke,
          .ql-toolbar button.ql-active .ql-stroke {
            stroke: #a855f7 !important;
          }

          .ql-toolbar button:hover .ql-fill,
          .ql-toolbar button.ql-active .ql-fill {
            fill: #a855f7 !important;
          }

          .ql-picker-label,
          .ql-picker-item {
            color: #d1d5db !important;
          }

          .ql-picker-options {
            background: #1f2937 !important;
            border: 1px solid #4b5563 !important;
          }

          /* Mobile responsive adjustments */
          @media (max-width: 640px) {
            .ql-toolbar {
              padding: 6px 8px !important;
              height: 40px !important;
            }
            
            .ql-toolbar .ql-formats {
              margin-right: 8px !important;
            }
            
            .ql-container {
              height: calc(250px - 40px) !important;
            }
            
            .ql-editor {
              font-size: 16px !important;
              padding: 12px 15px !important;
              height: calc(250px - 40px - 24px) !important;
            }
            
            .quill-container {
              height: 250px;
              margin-bottom: 0px;
            }
          }

          /* Ensure proper scrolling on mobile */
          @media (max-height: 700px) {
            .quill-container {
              height: 200px;
              margin-bottom: 0px;
            }
            
            .ql-container {
              height: calc(200px - 42px) !important;
            }
            
            .ql-editor {
              height: calc(200px - 42px - 30px) !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default NoteModal;