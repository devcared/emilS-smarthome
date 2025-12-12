'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { mockAlerts } from '@/lib/mock';
import { cn } from '@/lib/utils';

export default function AlertsCard() {
  return (
    <Card className="dashboard-card h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <div className="relative">
            <AlertCircle className="h-5 w-5 text-destructive" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-md" />
          </div>
          <span>Warnungen {mockAlerts.length}</span>
        </CardTitle>
        <button className="text-xs font-semibold text-muted-foreground/70 hover:text-foreground transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-muted/40 hover:scale-105 tracking-wide">
          ALLE
        </button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full pr-4 pl-6">
          <div className="space-y-0">
            {mockAlerts.map((alert, index) => (
              <div key={alert.id}>
                <div className="py-4 pr-2 group cursor-pointer hover:bg-muted/25 rounded-xl transition-all duration-300 px-2 hover:translate-x-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground mb-2 leading-tight tracking-tight">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/85 line-clamp-2 leading-relaxed font-medium">
                        {alert.message}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  </div>
                </div>
                {index < mockAlerts.length - 1 && (
                  <Separator className="my-2 opacity-20" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

