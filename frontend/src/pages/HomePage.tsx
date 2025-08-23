import React from 'react';
import useSWR from 'swr';
import { useAuth } from '../hooks/useAuth';

interface User {
  id: string;
  email: string;
  username: string;
}

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  const fetcher = async (url: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    return res.json();
  };

  const { data: user, error, isLoading } = useSWR<User>(isLoggedIn ? '/api/users/current' : null, fetcher);

  if (error) return <div className="text-red-500">Failed to load user data.</div>;
  if (isLoading) return <div className="text-blue-500">Loading user data...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to PodTracker, {user?.username || 'Guest'}!</h1>
      <p className="text-gray-700">Track your Magic: The Gathering Commander games with ease.</p>
      {user && (
        <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
