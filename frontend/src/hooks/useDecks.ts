import useSWR from 'swr';
import { useState } from 'react';

interface Deck {
  id: string;
  name: string;
  commander: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

const fetcher = async (url: string) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let errorBody = {};
      try {
        errorBody = await res.json();
      } catch (jsonError) {
        console.error('Failed to parse error response JSON:', jsonError);
        errorBody = { message: res.statusText || 'Unknown error' };
      }
      console.error('API Error (Status:', res.status, '):', errorBody);
      throw new Error(errorBody.message || 'Failed to fetch decks');
    }

    return res.json();
  } catch (err) {
    console.error('Network or Fetch Error:', err);
    throw err; // Re-throw to allow useSWR to catch it
  }
};

export const useDecks = () => {
  console.log('useDecks: Initializing hook');

  const { data, error, mutate, isValidating } = useSWR<Deck[]>('/api/decks', fetcher);
  console.log('useDecks: data:', data, 'error:', error, 'isValidating:', isValidating);
  const [loading, setLoading] = useState(false);

  const createDeck = async (deckData: Omit<Deck, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(deckData),
      });
      if (!res.ok) {
        throw new Error('Failed to create deck');
      }
      mutate(); // Revalidate data after creation
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateDeck = async (id: string, deckData: Partial<Omit<Deck, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/decks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(deckData),
      });
      if (!res.ok) {
        throw new Error('Failed to update deck');
      }
      mutate(); // Revalidate data after update
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDeck = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/decks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete deck');
      }
      mutate(); // Revalidate data after deletion
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    decks: data,
    isLoading: !data && !error,
    isError: error,
    createDeck,
    updateDeck,
    deleteDeck,
    loading,
  };
};
