import React from 'react';

interface UserProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full md:w-64 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-8">User Profile</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Profile Settings
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveTab('decks')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'decks'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Deck Management
            </button>
          </li>
          {/* Add more navigation items here as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default UserProfileSidebar;
