'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { mockAlerts } from '@/lib/mock';
import { cn } from '@/lib/utils';

export default function AlertsCard() {
  return (
    <Card className="dashboard-card h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full blur-2xl pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 flex-shrink-0 relative z-10">
        <CardTitle className="flex items-center gap-3.5 text-lg font-bold tracking-tight">
          <div className="relative">
            <AlertCircle className="h-6 w-6 text-destructive" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-destructive/25 rounded-full blur-lg animate-pulse" />
          </div>
          <span>Warnungen {mockAlerts.length}</span>
        </CardTitle>
        <button className="text-xs font-black text-muted-foreground/60 hover:text-foreground transition-all duration-300 px-3.5 py-2 rounded-lg hover:bg-muted/50 hover:scale-105 tracking-widest border border-border/20 hover:border-border/40">
          ALLE
        </button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 relative z-10">
        <ScrollArea className="h-full pr-5 pl-7">
          <div className="space-y-0">
            {mockAlerts.map((alert, index) => (
              <div key={alert.id}>
                <div className="py-4.5 pr-3 group cursor-pointer hover:bg-muted/30 rounded-xl transition-all duration-300 px-3 hover:translate-x-1.5 hover:shadow-md border border-transparent hover:border-border/20">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-foreground mb-2.5 leading-tight tracking-tight">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed font-semibold">
                        {alert.message}
                      </p>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-muted-foreground/40 group-hover:text-foreground flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1.5" strokeWidth={2.5} />
                  </div>
                </div>
                {index < mockAlerts.length - 1 && (
                  <Separator className="my-2.5 opacity-15" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

