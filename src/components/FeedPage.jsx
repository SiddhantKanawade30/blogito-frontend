import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FeedContent from './FeedContent';
import CreateBlog from './CreateBlog';
import Profile from './Profile';
import Settings from './Settings';

const FeedPage = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('feed');

  const renderContent = () => {
    switch (activeSection) {
      case 'feed':
        return <FeedContent />;
      case 'create':
        return <CreateBlog />;
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings user={user} onLogout={onLogout} />;
      default:
        return <FeedContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        user={user}
      />
      <main className="flex-1 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

export default FeedPage;