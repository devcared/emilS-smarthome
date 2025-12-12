// Mock-Daten für das Smarthome Dashboard

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'suggestion';
}

export interface WeatherData {
  location: string;
  temperature: number;
  high: number;
  low: number;
  humidity: number;
  condition: string;
  forecast: string;
}

export interface EnergyData {
  current: number;
  unit: string;
  change: number;
  solarPercent: number;
  dailyData: { day: string; value: number }[];
}

export interface ThermostatData {
  currentTemp: number;
  targetTemp: number;
  nextChangeTemp: number;
  nextChangeTime: string;
  mode: 'HEAT' | 'COOL' | 'AUTO';
  fan: 'ON' | 'AUTO' | 'OFF';
  schedule: { time: string; temp: number }[];
}

export interface WaterData {
  current: number;
  unit: string;
  change: number;
  breakdown: { category: string; value: number }[];
}

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Thermostat offline',
    message: 'Kellerthermostat offline.',
    type: 'error',
  },
  {
    id: '2',
    title: 'Hoher Energieverbrauch',
    message: 'Klimaanlage verbraucht 3,5 kWh/Std.',
    type: 'warning',
  },
  {
    id: '3',
    title: 'Firmware-Update',
    message: 'Update verfügbar für Küchen-Hub.',
    type: 'info',
  },
  {
    id: '4',
    title: 'Effizienz-Vorschlag',
    message: 'Heizung um 2°F reduzieren, um 5€/Monat zu sparen.',
    type: 'suggestion',
  },
  {
    id: '5',
    title: 'Tür entriegelt',
    message: 'Haustür ist seit 15 Minuten entriegelt.',
    type: 'warning',
  },
  {
    id: '6',
    title: 'Niedriger Batteriestand',
    message: 'Bewegungssensor-Batterie bei 15%.',
    type: 'info',
  },
];

export const mockWeather: WeatherData = {
  location: 'München',
  temperature: 18,
  high: 20,
  low: 15,
  humidity: 72,
  condition: 'partly-cloudy-night',
  forecast: 'Morgen wärmer mit einem Höchstwert von 23°',
};

export const mockEnergyData: Record<'day' | 'week' | 'month', EnergyData> = {
  day: {
    current: 42,
    unit: 'KWH',
    change: 5,
    solarPercent: 30,
    dailyData: [
      { day: '0:00', value: 2 },
      { day: '4:00', value: 1 },
      { day: '8:00', value: 3 },
      { day: '12:00', value: 5 },
      { day: '16:00', value: 8 },
      { day: '20:00', value: 6 },
      { day: '24:00', value: 4 },
    ],
  },
  week: {
    current: 840,
    unit: 'KWH',
    change: 8,
    solarPercent: 30,
    dailyData: [
      { day: 'Mo', value: 115 },
      { day: 'Di', value: 120 },
      { day: 'Mi', value: 125 },
      { day: 'Do', value: 38 },
      { day: 'Fr', value: 130 },
      { day: 'Sa', value: 135 },
      { day: 'So', value: 140 },
    ],
  },
  month: {
    current: 3200,
    unit: 'KWH',
    change: -3,
    solarPercent: 35,
    dailyData: [
      { day: 'W1', value: 800 },
      { day: 'W2', value: 820 },
      { day: 'W3', value: 780 },
      { day: 'W4', value: 800 },
    ],
  },
};

export const mockThermostat: ThermostatData = {
  currentTemp: 22,
  targetTemp: 22,
  nextChangeTemp: 20,
  nextChangeTime: '22:00',
  mode: 'HEAT',
  fan: 'ON',
  schedule: [
    { time: '6:00', temp: 21 },
    { time: '8:00', temp: 22 },
    { time: '10:00', temp: 22 },
    { time: '12:00', temp: 22 },
    { time: '14:00', temp: 22 },
    { time: '16:00', temp: 22 },
    { time: '18:00', temp: 22 },
    { time: '20:00', temp: 22 },
    { time: '22:00', temp: 20 },
    { time: '0:00', temp: 20 },
  ],
};

export const mockWaterData: Record<'day' | 'week' | 'month', WaterData> = {
  day: {
    current: 170,
    unit: 'L',
    change: -2,
    breakdown: [
      { category: 'Duschen', value: 75 },
      { category: 'Wasserhähne', value: 38 },
      { category: 'Toiletten', value: 30 },
      { category: 'Geschirrspüler', value: 19 },
      { category: 'Waschmaschine', value: 8 },
    ],
  },
  week: {
    current: 1360,
    unit: 'L',
    change: -4,
    breakdown: [
      { category: 'Duschen', value: 570 },
      { category: 'Wasserhähne', value: 300 },
      { category: 'Toiletten', value: 230 },
      { category: 'Geschirrspüler', value: 150 },
      { category: 'Waschmaschine', value: 110 },
    ],
  },
  month: {
    current: 5300,
    unit: 'L',
    change: -8,
    breakdown: [
      { category: 'Duschen', value: 2270 },
      { category: 'Wasserhähne', value: 1210 },
      { category: 'Toiletten', value: 910 },
      { category: 'Geschirrspüler', value: 600 },
      { category: 'Waschmaschine', value: 310 },
    ],
  },
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} Uhr`;
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Guten Morgen';
  if (hour < 18) return 'Guten Tag';
  return 'Guten Abend';
};

