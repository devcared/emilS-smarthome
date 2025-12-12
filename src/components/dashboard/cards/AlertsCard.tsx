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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-2.5 text-lg font-semibold">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <span>Warnungen {mockAlerts.length}</span>
        </CardTitle>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/30">
          ALLE
        </button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full pr-4 pl-6">
          <div className="space-y-0">
            {mockAlerts.map((alert, index) => (
              <div key={alert.id}>
                <div className="py-3.5 pr-2 group cursor-pointer hover:bg-muted/20 rounded-lg transition-all duration-200 px-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground mb-1.5 leading-tight">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground flex-shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
                {index < mockAlerts.length - 1 && (
                  <Separator className="my-1.5 opacity-30" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

