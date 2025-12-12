'use client';

import { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AlertsCard from '../cards/AlertsCard';
import WeatherCard from '../cards/WeatherCard';
import EnergyUsageCard from '../cards/EnergyUsageCard';
import ThermostatCard from '../cards/ThermostatCard';
import WaterCard from '../cards/WaterCard';
import WidgetSettings from '../WidgetSettings';
import { getCurrentTime, getGreeting } from '@/lib/mock';
import { CheckCircle2, Bell, GripVertical, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetItem {
  id: string;
  name: string;
  component: React.ReactNode;
  size: 'normal' | 'tall' | 'wide';
}

function SortableWidget({ 
  id, 
  children, 
  size, 
  name,
  onSettingsOpen 
}: { 
  id: string; 
  children: React.ReactNode; 
  size: 'normal' | 'tall' | 'wide';
  name: string;
  onSettingsOpen: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'h-full min-h-0 relative group',
        size === 'tall' ? 'md:row-span-2' : '',
        size === 'wide' ? 'md:col-span-2 lg:col-span-2' : '',
        isDragging && 'z-50'
      )}
    >
      <div className="absolute top-3 right-3 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSettingsOpen();
          }}
          className="p-2 rounded-lg bg-card/90 border border-border/40 backdrop-blur-md shadow-xl hover:bg-card hover:border-border/60 transition-all"
        >
          <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
        <div
          {...attributes}
          {...listeners}
          className="p-2 rounded-lg bg-card/90 border border-border/40 backdrop-blur-md shadow-xl hover:bg-card hover:border-border/60 transition-all cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </div>
      </div>
      {children}
    </div>
  );
}

function OverviewSection({ currentTime, greeting }: { currentTime: string; greeting: string }) {
  return (
    <div className="h-full space-y-6 overflow-hidden flex flex-col bg-card border border-border/20 rounded-2xl p-6 dashboard-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold text-foreground tracking-tighter text-smooth leading-none">
            {currentTime}
          </div>
          <div className="relative cursor-pointer group">
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold z-10 shadow-xl shadow-red-500/60 ring-2 ring-red-500/30 animate-pulse">
              6
            </div>
            <div className="h-10 w-10 rounded-full bg-muted/40 border border-border/40 flex items-center justify-center group-hover:bg-muted/60 group-hover:border-border/60 transition-all duration-300 group-hover:scale-110">
              <Bell className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-300" strokeWidth={2} />
            </div>
          </div>
        </div>
        <div className="text-xl text-muted-foreground/90 font-light tracking-wide">
          {greeting}, Emerson
        </div>
      </div>

      <div className="space-y-3 pt-2 flex-1 overflow-hidden">
        <div className="opacity-35 transition-opacity hover:opacity-60 cursor-default">
          <div className="text-sm text-muted-foreground/70 mb-1.5 font-semibold tracking-wide">Geräte</div>
        </div>
        <div className="transition-all hover:translate-x-1">
          <div className="text-sm text-muted-foreground/80 mb-1.5 font-semibold tracking-wide">KI</div>
          <div className="text-xs text-foreground/70 font-medium">Aktive Routinen</div>
        </div>
        <div className="transition-all hover:translate-x-1">
          <div className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
            Übersicht
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/60 ring-2 ring-green-500/30 animate-pulse"></div>
          </div>
          <div className="text-xs text-muted-foreground/80 font-medium">Alles sicher</div>
        </div>
        <div className="transition-all hover:translate-x-1">
          <div className="text-sm text-muted-foreground/80 mb-1.5 font-semibold tracking-wide">Beleuchtung</div>
          <div className="text-xs text-foreground/70 font-medium">Lichter an</div>
        </div>
        <div className="opacity-35 transition-opacity hover:opacity-60 cursor-default">
          <div className="text-sm text-muted-foreground/70 mb-1.5 font-semibold tracking-wide">Energie</div>
        </div>
        <div className="opacity-35 transition-opacity hover:opacity-60 cursor-default">
          <div className="text-sm text-muted-foreground/70 mb-1.5 font-semibold tracking-wide">Sprechanlage</div>
        </div>
      </div>
    </div>
  );
}

export default function HomeView() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const greeting = getGreeting();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: 'overview', name: 'Übersicht', component: <OverviewSection currentTime={currentTime} greeting={greeting} />, size: 'normal' },
    { id: 'alerts', name: 'Warnungen', component: <AlertsCard />, size: 'tall' },
    { id: 'weather', name: 'Wetter', component: <WeatherCard />, size: 'normal' },
    { id: 'energy', name: 'Energie', component: <EnergyUsageCard />, size: 'normal' },
    { id: 'thermostat', name: 'Thermostat', component: <ThermostatCard />, size: 'normal' },
    { id: 'water', name: 'Wasser', component: <WaterCard />, size: 'normal' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update overview component when time changes
  useEffect(() => {
    setWidgets((prev) => {
      const overviewIndex = prev.findIndex((w) => w.id === 'overview');
      if (overviewIndex !== -1) {
        const updated = [...prev];
        updated[overviewIndex] = {
          ...updated[overviewIndex],
          component: <OverviewSection currentTime={currentTime} greeting={greeting} />,
        };
        return updated;
      }
      return prev;
    });
  }, [currentTime, greeting]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        return newItems;
      });
    }
  }

  function handleSettingsOpen(widgetId: string) {
    setSelectedWidget(widgetId);
    setSettingsOpen(true);
  }

  function handleSizeChange(size: 'normal' | 'tall' | 'wide') {
    if (selectedWidget) {
      setWidgets((items) =>
        items.map((item) =>
          item.id === selectedWidget ? { ...item, size } : item
        )
      );
    }
  }

  const selectedWidgetData = widgets.find((w) => w.id === selectedWidget);

  return (
    <>
      <div className="h-full overflow-hidden p-6 lg:p-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgets.filter((w) => w.id !== 'overview').map((w) => w.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full overflow-hidden">
              {/* Overview Section - Links, nicht dragable */}
              <div className="lg:col-span-1 h-full min-h-0">
                <OverviewSection currentTime={currentTime} greeting={greeting} />
              </div>
              
              {/* Widget Grid - Rechts, dragable */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 h-full overflow-hidden auto-rows-fr">
                {widgets
                  .filter((w) => w.id !== 'overview')
                  .map((widget) => (
                    <SortableWidget
                      key={widget.id}
                      id={widget.id}
                      size={widget.size}
                      name={widget.name}
                      onSettingsOpen={() => handleSettingsOpen(widget.id)}
                    >
                      {widget.component}
                    </SortableWidget>
                  ))}
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {selectedWidgetData && (
        <WidgetSettings
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          widgetId={selectedWidgetData.id}
          widgetName={selectedWidgetData.name}
          size={selectedWidgetData.size}
          onSizeChange={handleSizeChange}
        />
      )}
    </>
  );
}

