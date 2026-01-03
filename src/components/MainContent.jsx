import React from "react";

const MainContent = ({ currentSection }) => {
  const renderContent = () => {
    switch (currentSection) {
      case "Home":
        return <p>Welcome to the Home page!</p>;
      case "Profile":
        return <p>This is your Profile page.</p>;
      case "Settings":
        return <p>Here you can change your Settings.</p>;
      case "Logout":
        return <p>You clicked Logout. Redirecting...</p>;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <main className="flex-1 bg-gray-400 p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">{currentSection}</h2>
      {renderContent()}
    </main>
  );
};

export default MainContent;
