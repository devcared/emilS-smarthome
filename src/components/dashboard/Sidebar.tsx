'use client';

import { Home, Wifi, Music, Bell, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { Icon: Home, id: 'home' },
  { Icon: Wifi, id: 'wifi' },
  { Icon: Music, id: 'music' },
  { Icon: Bell, id: 'bell' },
  { Icon: Camera, id: 'camera' },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-20 bg-card/50 backdrop-blur-sm border-r border-border/30 flex flex-col items-center py-8 space-y-4 h-full">
      {icons.map(({ Icon, id }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={cn(
            'p-3 rounded-xl transition-all duration-300 relative group',
            activeView === id
              ? 'bg-primary/15 text-primary shadow-lg shadow-primary/10'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          )}
        >
          <Icon size={24} className="relative z-10" />
          {activeView === id && (
            <div className="absolute inset-0 rounded-xl bg-primary/5 border border-primary/20" />
          )}
        </button>
      ))}
    </aside>
  );
}

