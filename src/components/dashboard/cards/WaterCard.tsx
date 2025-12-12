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
    <Card className="dashboard-card h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 flex-shrink-0">
        <CardTitle className="text-lg font-semibold tracking-tight">Wasser</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-8 bg-muted/40 border border-border/20">
            <TabsTrigger value="day" className="text-xs px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="mb-5 flex-shrink-0">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-6xl font-bold text-foreground tracking-tighter text-smooth">
              {data.current}
            </span>
            <span className="text-xl text-muted-foreground/80 font-semibold">{data.unit}</span>
            <Badge
              variant="default"
              className="ml-auto bg-green-500/25 text-green-400 border-green-500/40 hover:bg-green-500/30 flex items-center gap-1.5 shadow-sm shadow-green-500/20"
            >
              <TrendingDown className="h-3.5 w-3.5" />
              ↓{Math.abs(data.change)}%
            </Badge>
          </div>
        </div>
        <div className="space-y-4 flex-1 overflow-hidden">
          {data.breakdown.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            return (
              <div key={item.category} className="space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground/80 font-semibold tracking-wide">{item.category}</span>
                  <span className="text-foreground font-bold">{item.value}</span>
                </div>
                <div className="relative h-3.5 bg-muted/30 rounded-full overflow-hidden border border-border/25 shadow-inner">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary/80 rounded-full transition-all duration-700 shadow-md shadow-primary/30"
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

