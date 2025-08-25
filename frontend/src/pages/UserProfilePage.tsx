import React, { useState } from 'react';
import ProfileSettingsForm from '../components/ProfileSettingsForm';
import UserProfileSidebar from '../components/UserProfileSidebar';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <UserProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-grow">
            {activeTab === 'profile' && <ProfileSettingsForm />}
            {/* Other components can be rendered here based on activeTab */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
