'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { mockWaterData } from '@/lib/mock';
import { TrendingDown } from 'lucide-react';

export default function WaterCard() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const data = mockWaterData[period];

  const maxValue = Math.max(...data.breakdown.map((d) => d.value));

  return (
    <Card className="dashboard-card h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0 relative z-10">
        <CardTitle className="text-base font-black tracking-tight">Wasser</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-8 bg-muted/30 border border-border/25 backdrop-blur-sm">
            <TabsTrigger value="day" className="text-xs px-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 relative z-10 p-0">
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl font-black text-foreground tracking-tighter text-smooth leading-none">
              {data.current}
            </span>
            <span className="text-lg text-muted-foreground/75 font-bold">{data.unit}</span>
            <Badge
              variant="default"
              className="ml-auto bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/35 flex items-center gap-1 shadow-lg shadow-green-500/25 px-2.5 py-1 text-xs"
            >
              <TrendingDown className="h-3 w-3" />
              ↓{Math.abs(data.change)}%
            </Badge>
          </div>
        </div>
        <div className="space-y-2.5 flex-1 overflow-hidden px-6 pb-6 min-h-0 flex flex-col justify-center">
          {data.breakdown.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            return (
              <div key={item.category} className="space-y-1.5 group flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground/70 font-black tracking-wider uppercase">{item.category}</span>
                  <span className="text-foreground font-black">{item.value}</span>
                </div>
                <div className="relative h-2 bg-muted/25 rounded-full overflow-hidden border border-border/30 shadow-inner backdrop-blur-sm group-hover:border-border/40 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
                  <div
                    className="absolute top-0 left-0 h-full bg-primary/85 rounded-full transition-all duration-700 shadow-md shadow-primary/40 group-hover:bg-primary/95"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

