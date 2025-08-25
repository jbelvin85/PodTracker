import useSWR from 'swr';
import { useState } from 'react';

interface Game {
  id: string;
  podId: string;
  startTime: string;
  endTime?: string;
  winnerId?: string;
  players: any[]; // Simplified for now
  createdAt: string;
  updatedAt: string;
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
    throw new Error('Failed to fetch games');
  }
  return res.json();
};

export const useGames = () => {
  const { data, error, mutate } = useSWR<Game[]>('/api/games', fetcher);
  const [loading, setLoading] = useState(false);

  const createGame = async (gameData: Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'players'> & { playerIds: string[] }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(gameData),
      });
      if (!res.ok) {
        throw new Error('Failed to create game');
      }
      mutate(); // Revalidate data after creation
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateGame = async (id: string, gameData: Partial<Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'players'>> & { playerIds?: string[] }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(gameData),
      });
      if (!res.ok) {
        throw new Error('Failed to update game');
      }
      mutate(); // Revalidate data after update
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteGame = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete game');
      }
      mutate(); // Revalidate data after deletion
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return {
    games: data,
    isLoading: !data && !error,
    isError: error,
    createGame,
    updateGame,
    deleteGame,
    loading,
  };
};