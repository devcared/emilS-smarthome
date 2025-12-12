'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WidgetSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgetId: string;
  widgetName: string;
  size: 'normal' | 'tall' | 'wide';
  onSizeChange: (size: 'normal' | 'tall' | 'wide') => void;
}

export default function WidgetSettings({
  open,
  onOpenChange,
  widgetId,
  widgetName,
  size,
  onSizeChange,
}: WidgetSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Widget-Einstellungen</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Passe das Widget &quot;{widgetName}&quot; nach deinen Wünschen an.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="size" className="text-sm font-semibold">
              Größe
            </Label>
            <Select value={size} onValueChange={(value) => onSizeChange(value as 'normal' | 'tall' | 'wide')}>
              <SelectTrigger id="size" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="tall">Hoch (2 Zeilen)</SelectItem>
                <SelectItem value="wide">Breit (2 Spalten)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

