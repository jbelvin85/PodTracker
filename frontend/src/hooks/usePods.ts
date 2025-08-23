import useSWR from 'swr';
import { useState } from 'react';

interface Pod {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  members: any[]; // Simplified for now
  decks: any[]; // Simplified for now
}

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch pods');
  }
  return res.json();
};

export const usePods = () => {
  const { data, error, mutate } = useSWR<Pod[]>('/api/pods', fetcher);
  const [loading, setLoading] = useState(false);

  const createPod = async (podData: Omit<Pod, 'id' | 'ownerId' | 'createdAt' | 'updatedAt' | 'members' | 'decks'> & { memberIds?: string[], deckIds?: string[] }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/pods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(podData),
      });
      if (!res.ok) {
        throw new Error('Failed to create pod');
      }
      mutate(); // Revalidate data after creation
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePod = async (id: string, podData: Partial<Omit<Pod, 'id' | 'ownerId' | 'createdAt' | 'updatedAt' | 'members' | 'decks'> & { memberIds?: string[], deckIds?: string[] }>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/pods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(podData),
      });
      if (!res.ok) {
        throw new Error('Failed to update pod');
      }
      mutate(); // Revalidate data after update
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePod = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/pods/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete pod');
      }
      mutate(); // Revalidate data after deletion
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    pods: data,
    isLoading: !data && !error,
    isError: error,
    createPod,
    updatePod,
    deletePod,
    loading,
  };
};
