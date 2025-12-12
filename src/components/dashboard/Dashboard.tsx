'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import HomeView from './views/HomeView';
import WifiView from './views/WifiView';
import MusicView from './views/MusicView';
import NotificationsView from './views/NotificationsView';
import CameraView from './views/CameraView';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'wifi':
        return <WifiView />;
      case 'music':
        return <MusicView />;
      case 'bell':
        return <NotificationsView />;
      case 'camera':
        return <CameraView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-6 lg:p-8 overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
}

