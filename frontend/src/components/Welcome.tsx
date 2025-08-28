import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../api";
import image from '../assets/image.png'

interface WelcomeProps {
  user: { email: string; name: string };
  onLogout: () => void;
}

interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

const Welcome: React.FC<WelcomeProps> = ({ user, onLogout }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch {
      setError("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <img src={image} className="w-8" alt="" />
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="text-blue-600 hover:text-blue-800 font-medium transition cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-blue-50 border border-blue-100 shadow-sm rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-lg text-gray-800">
            Welcome, {user.name} !
          </h2>
          <p className="text-gray-600 text-sm mt-1">Email: {user.email}</p>
        </div>

        {/* Create Note Button */}
        <Link
          to="/notes"
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg font-medium mb-6 transition"
        >
          Create Note
        </Link>

        {/* Notes Section */}
        <h3 className="font-semibold mb-3 text-gray-800">Your Notes</h3>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="space-y-3">
          {notes.length > 0 ? (
            notes.slice(0, 3).map((note) => ( // show latest 3 notes
              <div
                key={note._id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-3"
              >
                <div>
                  <p className="text-gray-800">{note.content}</p>
                  <small className="text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notes found</p>
          )}
        </div>

        {/* View All Link */}
        {notes.length > 3 && (
          <Link
            to="/notes"
            className="block text-center text-blue-600 hover:underline mt-4"
          >
            View all notes →
          </Link>
        )}
      </div>
    </div>
  );
};

export default Welcome;
