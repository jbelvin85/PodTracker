import React, { useState } from 'react';

const ProfileSettingsForm: React.FC = () => {
  // Mock user data, replace with actual data fetching later
  const [displayName, setDisplayName] = useState('MockUser');
  const [email, setEmail] = useState('user@example.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., API call
    console.log('Form submitted:', { displayName, email });
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full">
      <h2 className="text-3xl font-bold text-white mb-2">Profile Settings</h2>
      <p className="text-gray-400 mb-8">Update your display name, email, and other personal settings.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="displayName" className="block text-gray-300 text-sm font-bold mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            placeholder="Enter your display name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            placeholder="Enter your email address"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsForm;
