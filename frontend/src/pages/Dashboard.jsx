import { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Squares2X2Icon, ListBulletIcon, EyeIcon } from '@heroicons/react/24/outline';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import toast from 'react-hot-toast';
import axios from '../api/axios';

const Dashboard = ({ user, setUser }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchNotes();
  }, []);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/notes');
      if (data.success) {
        setNotes(data.notes);
      } else {
        toast.error('Failed to fetch notes');
      }
    } catch (err) {
      console.error('Fetch notes error:', err);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const { data } = await axios.post('/api/notes', noteData);
      if (data.success) {
        setNotes([data.note, ...notes]);
        toast.success('Note created successfully!');
      } else {
        toast.error(data.message || 'Failed to create note');
      }
    } catch (err) {
      console.error('Create note error:', err);
      toast.error('Failed to create note');
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const { data } = await axios.put(`/api/notes/${editingNote._id}`, noteData);
      if (data.success) {
        setNotes(notes.map(note => note._id === editingNote._id ? data.note : note));
        toast.success('Note updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update note');
      }
    } catch (err) {
      console.error('Update note error:', err);
      toast.error('Failed to update note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const { data } = await axios.delete(`/api/notes/${noteId}`);
      if (data.success) {
        setNotes(notes.filter(note => note._id !== noteId));
        toast.success('Note deleted successfully!');
      } else {
        toast.error(data.message || 'Failed to delete note');
      }
    } catch (err) {
      console.error('Delete note error:', err);
      toast.error('Failed to delete note');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-white">Loading Dashboard</p>
            <p className="text-purple-300">Preparing your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md flex items-center justify-center  mx-auto">
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
              <span className="text-xl font-bold text-white hidden sm:block">NOTOSPACE</span>
            </div>



            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-7 h-7 rounded-full border border-purple-400"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <UserCircleIcon 
                  className="w-7 h-7 text-purple-400" 
                  style={{ display: user.picture ? 'none' : 'flex' }}
                />
                <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {/* Welcome and Right Side Controls */}
<div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
  <div>
    <h1 className="text-3xl font-bold text-white mb-2">
      Welcome back, {user.name?.split(' ')[0]}! 👋
    </h1>
    <p className="text-purple-300">
      Manage and organize your thoughts effortlessly
    </p>
  </div>

  {/* Right Side Controls */}
  <div className="flex flex-wrap gap-4 items-center">
    {/* Search Bar */}
    <div className="relative min-w-64">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
      />
    </div>

    {/* Notes Count Card */}
    <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-purple-300 font-medium">Total Notes</p>
          <p className="text-lg font-bold text-white">{notes.length}</p>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Action Bar with Search and Notes Count */}
        {/* Action Bar: New Note and View Toggle */}
<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
  <div className="flex items-center gap-4">
    {/* New Note Button */}
    <button
      onClick={() => {
        setEditingNote(null);
        setShowModal(true);
      }}
      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-sm font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
    >
      <PlusIcon className="w-4 h-4" />
      <span>New Note</span>
    </button>

    {/* View Toggle */}
    <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded transition-all ${
          viewMode === 'grid'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Grid View"
      >
        <Squares2X2Icon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded transition-all ${
          viewMode === 'list'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="List View"
      >
        <ListBulletIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
</div>

        {/* Notes Section */}
        <div className="space-y-6">
          {searchTerm && (
            <div className="flex items-center space-x-2 text-sm text-purple-300">
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span>
                {filteredNotes.length} {filteredNotes.length === 1 ? 'result' : 'results'} for "{searchTerm}"
              </span>
            </div>
          )}

          {filteredNotes.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredNotes.map((note, index) => (
                <div
                  key={note._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NoteCard
                    note={note}
                    onDelete={handleDeleteNote}
                    onEdit={(note) => {
                      setEditingNote(note);
                      setShowModal(true);
                    }}
                    onView={(note) => {
                      setViewingNote(note);
                      setShowViewModal(true);
                    }}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-purple-500/30">
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {searchTerm ? 'No matching notes found' : 'Your notebook is empty'}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {searchTerm 
                    ? `No notes match "${searchTerm}". Try adjusting your search terms or browse all notes.`
                    : 'Start your journey by creating your first note. Capture ideas, thoughts, and inspiration in one place.'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => {
                      setEditingNote(null);
                      setShowModal(true);
                    }}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>Create Your First Note</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Note Modal */}
      <NoteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingNote(null);
        }}
        onSave={editingNote ? handleUpdateNote : handleCreateNote}
        note={editingNote}
      />

      {/* View Note Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white">{viewingNote?.title}</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setEditingNote(viewingNote);
                    setShowModal(true);
                  }}
                  className="px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingNote(null);
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {viewingNote?.content}
                </div>
              </div>
              {viewingNote?.createdAt && (
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <p className="text-sm text-gray-400">
                    Created: {new Date(viewingNote.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;