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
