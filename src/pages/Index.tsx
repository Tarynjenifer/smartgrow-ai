import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import Dashboard from '@/components/Dashboard';
import Planner from '@/components/Planner';
import AISuggest from '@/components/AISuggest';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'planner':
        return <Planner />;
      case 'ai-suggest':
        return <AISuggest />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Index;
