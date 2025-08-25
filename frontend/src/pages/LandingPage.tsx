import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const showPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  );

  return (
    <div className="font-sans bg-[#0d0d0d] text-gray-200">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LogoIcon />
            <h1 className="text-2xl font-bold text-[#32CD32]">PodTracker</h1>
          </div>
          <Link to="/login" className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full hover:bg-gray-700 transition-colors duration-200">
            Log In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-4">
          Your Ultimate Magic: The Gathering
          <span className="text-[#32CD32] block">Pod Companion</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Effortlessly manage your games, track detailed stats, and connect with your playgroup. PodTracker is the definitive tool for Commander players.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/register" className="inline-block px-8 py-3 bg-green-800 text-gray-200 font-bold rounded-full hover:bg-green-700 transition-colors duration-200 shadow-lg">
            Sign Up Now
          </Link>
          <a href="#" onClick={showPopup} className="inline-block px-8 py-3 bg-gray-800 text-gray-200 font-bold rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-lg">
            Learn More
          </a>
        </div>
      </main>

      {/* Social Features Section */}
      <section id="social-features" className="py-16 md:py-24 bg-[#1a1a1a] rounded-xl mx-4 md:mx-8 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">The Social Hub for Your Pod</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            PodTracker is more than a life counter—it's a command center for your playgroup. Keep your crew connected and your game history organized in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Persistent Pods */}
            <div className="bg-gray-800 p-8 rounded-xl border-t-2 border-[#32CD32]">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Create Permanent Pods</h4>
              <p className="text-gray-400">Set up a fixed pod for your friends, track your shared history, and effortlessly start new games whenever you meet up.</p>
            </div>

            {/* Feature 2: Game History */}
            <div className="bg-gray-800 p-8 rounded-xl border-t-2 border-[#32CD32]">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Living Game History</h4>
              <p className="text-gray-400">Automatically save every match to your pod's history, preserving the epic moments and data for every game you play.</p>
            </div>

            {/* Feature 3: Stay Connected */}
            <div className="bg-gray-800 p-8 rounded-xl border-t-2 border-[#32CD32]">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Stay Connected</h4>
              <p className="text-gray-400">Easily communicate with your pod to schedule games, share decklists, and keep the conversation going between play sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data-Driven Mastery Section */}
      <section id="data-mastery" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">From Casual Play to Data-Driven Mastery</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            PodTracker transforms your games into actionable insights. Analyze your performance to become a better player.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 4: Deck Performance */}
            <div className="bg-gray-800 p-8 rounded-xl border-t-2 border-[#32CD32]">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Understand Deck Performance</h4>
              <p className="text-gray-400">Track which of your decks has the highest win rate and how they perform against different opponents and archetypes.</p>
            </div>

            {/* Feature 5: Skill Improvement */}
            <div className="bg-gray-800 p-8 rounded-xl border-t-2 border-[#32CD32]">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Quantify Your Improvement</h4>
              <p className="text-gray-400">Analyze your win rates, track your progress over time, and identify your strengths and weaknesses to become a master strategist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Sections... */}
      {/* (Content from old/index.html can be added here following the same JSX/Tailwind pattern) */}

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center">
        <h4 className="text-2xl font-bold text-white mb-4">Ready to elevate your game?</h4>
        <p className="text-gray-400 mb-6">Join PodTracker and start tracking your path to victory today.</p>
        <Link to="/register" className="inline-block px-8 py-3 bg-green-800 text-gray-200 font-bold rounded-full hover:bg-green-700 transition-colors duration-200 shadow-lg">
          Create Your First Pod
        </Link>
      </footer>

      {/* Popup Section */}
      {isPopupVisible && (
        <div onClick={hidePopup} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#1a1a1a] text-gray-200 rounded-xl p-8 max-w-md w-full mx-auto shadow-2xl relative max-h-full overflow-y-auto">
            <button onClick={hidePopup} className="absolute top-4 right-4 text-gray-500 hover:text-gray-200">
              {/* Close Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="text-3xl font-bold text-[#32CD32] mb-4">A Deeper Look into PodTracker</h3>
            <p className="text-lg text-gray-400 mb-6">
              We believe in getting you in the game as quickly as possible. All you need is an email address to either create a new account or seamlessly claim games you played as a guest.
            </p>
            <h4 className="text-xl font-bold text-white mb-4">PodTracker offers a comprehensive set of tools, including:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-left">
              <li>Effortless **Decklist Management** with quick import and editing.</li>
              <li>An intuitive and customizable **Live Life Counter**.</li>
              <li>Detailed **Game History & Statistics** to review past matches.</li>
              <li>Persistent **Pod Creation** for your playgroup.</li>
              <li>Dedicated counters for **Commander Damage Tracking**.</li>
              <li>A powerful **Card Search** for quick rulings and details.</li>
              <li>In-depth **Deck Performance Analytics** to fine-tune strategy.</li>
              <li>A **Shared Pod History** for games with friends.</li>
              <li>Seamless **Social Integration** to share decks and connect.</li>
              <li>A **Customizable Game State** to track poison, energy, and more.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
