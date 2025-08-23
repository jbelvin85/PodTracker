import React, { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { usePods } from '../hooks/usePods'; // To select a pod for the game

const GamesPage = () => {
  const { games, isLoading, isError, createGame, updateGame, deleteGame, loading } = useGames();
  const { pods } = usePods(); // Fetch pods to allow selection

  const [newGameData, setNewGameData] = useState({
    podId: '',
    playerIds: [],
    startTime: new Date().toISOString().slice(0, 16),
  });
  const [editingGame, setEditingGame] = useState<any>(null);

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewGameData({ ...newGameData, [e.target.name]: e.target.value });
  };

  const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setNewGameData({ ...newGameData, playerIds: selectedOptions });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGame(newGameData);
    setNewGameData({
      podId: '',
      playerIds: [],
      startTime: new Date().toISOString().slice(0, 16),
    }); // Clear form
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditingGame({ ...editingGame, [e.target.name]: e.target.value });
  };

  const handleEditPlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setEditingGame({ ...editingGame, playerIds: selectedOptions });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      await updateGame(editingGame.id, editingGame);
      setEditingGame(null); // Exit edit mode
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await deleteGame(id);
    }
  };

  if (isLoading) return <p>Loading games...</p>;
  if (isError) return <p>Error loading games.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Games</h1>

      {/* Create New Game Form */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-2">Create New Game</h2>
        <form onSubmit={handleCreateSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Pod</label>
            <select
              name="podId"
              value={newGameData.podId}
              onChange={handleCreateChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a Pod</option>
              {pods && pods.map((pod) => (
                <option key={pod.id} value={pod.id}>
                  {pod.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Players</label>
            <select
              name="playerIds"
              multiple
              value={newGameData.playerIds}
              onChange={handlePlayerSelect}
              className="w-full p-2 border rounded"
              required
            >
              {/* You would typically fetch players associated with the selected pod */}
              {/* For now, let's assume some dummy players or fetch all users */}
              {pods && newGameData.podId && pods.find(p => p.id === newGameData.podId)?.members.map((member: any) => (
                <option key={member.id} value={member.id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={newGameData.startTime}
              onChange={handleCreateChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Creating Game...' : 'Create Game'}
          </button>
        </form>
      </div>

      {/* Game List */}
      <h2 className="text-xl font-semibold mb-2">Your Games</h2>
      {games && games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 border rounded shadow-sm bg-white">
              {editingGame && editingGame.id === game.id ? (
                // Edit Form
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-2">
                    <label className="block text-gray-700">Pod</label>
                    <select
                      name="podId"
                      value={editingGame.podId}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select a Pod</option>
                      {pods && pods.map((pod) => (
                        <option key={pod.id} value={pod.id}>
                          {pod.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700">Players</label>
                    <select
                      name="playerIds"
                      multiple
                      value={editingGame.playerIds}
                      onChange={handleEditPlayerSelect}
                      className="w-full p-2 border rounded"
                      required
                    >
                      {pods && editingGame.podId && pods.find(p => p.id === editingGame.podId)?.members.map((member: any) => (
                        <option key={member.id} value={member.id}>
                          {member.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700">Start Time</label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      value={editingGame.startTime}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700">End Time</label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      value={editingGame.endTime || ''}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Winner</label>
                    <select
                      name="winnerId"
                      value={editingGame.winnerId || ''}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Winner</option>
                      {game.players.map((player: any) => (
                        <option key={player.id} value={player.id}>
                          {player.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2" disabled={loading}>
                    {loading ? 'Updating Game...' : 'Update Game'}
                  </button>
                  <button type="button" onClick={() => setEditingGame(null)} className="bg-gray-500 text-white p-2 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                // Display Game
                <>
                  <h3 className="text-lg font-bold">Game in Pod: {game.pod?.name}</h3>
                  <p className="text-gray-600">Players: {game.players.map((p: any) => p.username).join(', ')}</p>
                  <p className="text-gray-600">Start: {new Date(game.startTime).toLocaleString()}</p>
                  {game.endTime && <p className="text-gray-600">End: {new Date(game.endTime).toLocaleString()}</p>}
                  {game.winnerId && <p className="text-gray-600">Winner: {game.players.find((p: any) => p.id === game.winnerId)?.username}</p>}
                  <div className="mt-4">
                    <button
                      onClick={() => setEditingGame(game)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
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
        <p>No games found. Create one above!</p>
      )}
    </div>
  );
};

export default GamesPage;
