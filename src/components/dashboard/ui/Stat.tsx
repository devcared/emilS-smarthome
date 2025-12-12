interface StatProps {
  value: string;
  label?: string;
  className?: string;
}

export default function Stat({ value, label, className = '' }: StatProps) {
  return (
    <div className={className}>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {label && (
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      )}
    </div>
  );
}

