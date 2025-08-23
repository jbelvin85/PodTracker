import React, { useState } from 'react';
import { useDecks } from '../hooks/useDecks';

const DecksPage = () => {
  const { decks, isLoading, isError, createDeck, updateDeck, deleteDeck, loading } = useDecks();
  const [newDeckData, setNewDeckData] = useState({ name: '', commander: '', description: '' });
  const [editingDeck, setEditingDeck] = useState<any>(null);

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewDeckData({ ...newDeckData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDeck(newDeckData);
    setNewDeckData({ name: '', commander: '', description: '' }); // Clear form
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingDeck({ ...editingDeck, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeck) {
      await updateDeck(editingDeck.id, editingDeck);
      setEditingDeck(null); // Exit edit mode
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      await deleteDeck(id);
    }
  };

  if (isLoading) return <p>Loading decks...</p>;
  if (isError) return <p>Error loading decks.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Decks</h1>

      {/* Create New Deck Form */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-2">Create New Deck</h2>
        <form onSubmit={handleCreateSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newDeckData.name}
              onChange={handleCreateChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Commander</label>
            <input
              type="text"
              name="commander"
              value={newDeckData.commander}
              onChange={handleCreateChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Description (Optional)</label>
            <textarea
              name="description"
              value={newDeckData.description}
              onChange={handleCreateChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Creating...' : 'Create Deck'}
          </button>
        </form>
      </div>

      {/* Deck List */}
      <h2 className="text-xl font-semibold mb-2">Your Decks</h2>
      {decks && decks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <div key={deck.id} className="p-4 border rounded shadow-sm bg-white">
              {editingDeck && editingDeck.id === deck.id ? (
                // Edit Form
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-2">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editingDeck.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700">Commander</label>
                    <input
                      type="text"
                      name="commander"
                      value={editingDeck.commander}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700">Description (Optional)</label>
                    <textarea
                      name="description"
                      value={editingDeck.description}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Deck'}
                  </button>
                  <button type="button" onClick={() => setEditingDeck(null)} className="bg-gray-500 text-white p-2 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                // Display Deck
                <>
                  <h3 className="text-lg font-bold">{deck.name}</h3>
                  <p className="text-gray-600">Commander: {deck.commander}</p>
                  {deck.description && <p className="text-gray-600">Description: {deck.description}</p>}
                  <div className="mt-4">
                    <button
                      onClick={() => setEditingDeck(deck)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(deck.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No decks found. Create one above!</p>
      )}
    </div>
  );
};

export default DecksPage;
