import React, { useEffect, useState } from "react";
import api from "../api";
import { Trash2 } from "lucide-react";

interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
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

  const addNote = async () => {
    if (!content.trim()) {
      setError("Note content cannot be empty");
      return;
    }
    setError("");
    try {
      const res = await api.post("/notes", { content });
      setNotes([res.data, ...notes]);
      setContent("");
    } catch {
      setError("Failed to add note");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Your Notes
        </h2>

        {/* Textarea */}
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a new note..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
        />

        {/* Add Button */}
        <button
          onClick={addNote}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition mb-4"
        >
          Add Note
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Notes List */}
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-3"
            >
              <p className="text-gray-800">{note.content}</p>
              <small className="text-gray-500 block mb-2">
                {new Date(note.createdAt).toLocaleString()}
              </small>
              <button
                onClick={() => deleteNote(note._id)}
                className="flex items-center text-gray-500 hover:text-red-500 text-sm transition"
              >
                <Trash2 size={16} className="mr-1" /> Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
