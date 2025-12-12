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
    <aside className="w-20 bg-card/40 backdrop-blur-md border-r border-border/20 flex flex-col items-center py-8 space-y-3 h-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />
      {icons.map(({ Icon, id }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={cn(
            'p-3.5 rounded-xl transition-all duration-300 relative group w-14 h-14 flex items-center justify-center',
            activeView === id
              ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20/50'
              : 'text-muted-foreground/70 hover:text-foreground hover:bg-muted/40 hover:scale-105'
          )}
        >
          <Icon size={22} className="relative z-10 transition-transform duration-300" strokeWidth={activeView === id ? 2.5 : 2} />
          {activeView === id && (
            <>
              <div className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/30" />
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full opacity-60" />
            </>
          )}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      ))}
    </aside>
  );
}

