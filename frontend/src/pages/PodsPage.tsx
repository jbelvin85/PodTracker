import React, { useState } from 'react';
import { usePods } from '../hooks/usePods';

const PodsPage = () => {
  const { pods, isLoading, isError, createPod, updatePod, deletePod, loading } = usePods();
  const [newPodData, setNewPodData] = useState({ name: '' });
  const [editingPod, setEditingPod] = useState<any>(null);

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPodData({ ...newPodData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPod(newPodData);
    setNewPodData({ name: '' }); // Clear form
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingPod({ ...editingPod, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPod) {
      await updatePod(editingPod.id, editingPod);
      setEditingPod(null); // Exit edit mode
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this pod?')) {
      await deletePod(id);
    }
  };

  if (isLoading) return <p>Loading pods...</p>;
  if (isError) return <p>Error loading pods.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Pods</h1>

      {/* Create New Pod Form */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-2">Create New Pod</h2>
        <form onSubmit={handleCreateSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newPodData.name}
              onChange={handleCreateChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Creating...' : 'Create Pod'}
          </button>
        </form>
      </div>

      {/* Pod List */}
      <h2 className="text-xl font-semibold mb-2">Your Pods</h2>
      {pods && pods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pods.map((pod) => (
            <div key={pod.id} className="p-4 border rounded shadow-sm bg-white">
              {editingPod && editingPod.id === pod.id ? (
                // Edit Form
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-2">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editingPod.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Pod'}
                  </button>
                  <button type="button" onClick={() => setEditingPod(null)} className="bg-gray-500 text-white p-2 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                // Display Pod
                <>
                  <h3 className="text-lg font-bold">{pod.name}</h3>
                  <p className="text-gray-600">Owner: {pod.ownerId}</p> {/* Display owner ID for now */}
                  <div className="mt-4">
                    <button
                      onClick={() => setEditingPod(pod)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pod.id)}
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
        <p>No pods found. Create one above!</p>
      )}
    </div>
  );
};

export default PodsPage;