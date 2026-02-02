

export interface CityData {
  state: string;
  district: string;
  basicWindSpeed: number; // m/s
  seismicZone: string;
  zoneFactor: number;
  maxTemperature: number; // °C
  minTemperature: number; // °C
}

export const locationData: CityData[] = [
  {
    state: "Maharashtra",
    district: "Mumbai",
    basicWindSpeed: 44,
    seismicZone: "III",
    zoneFactor: 0.16,
    maxTemperature: 40,
    minTemperature: 15,
  },
  {
    state: "Delhi",
    district: "New Delhi",
    basicWindSpeed: 47,
    seismicZone: "IV",
    zoneFactor: 0.24,
    maxTemperature: 47,
    minTemperature: 5,
  },
  {
    state: "Tamil Nadu",
    district: "Chennai",
    basicWindSpeed: 50,
    seismicZone: "III",
    zoneFactor: 0.16,
    maxTemperature: 45,
    minTemperature: 18,
  },
  {
    state: "Karnataka",
    district: "Bangalore",
    basicWindSpeed: 33,
    seismicZone: "II",
    zoneFactor: 0.10,
    maxTemperature: 38,
    minTemperature: 12,
  },
  {
    state: "West Bengal",
    district: "Kolkata",
    basicWindSpeed: 50,
    seismicZone: "III",
    zoneFactor: 0.16,
    maxTemperature: 43,
    minTemperature: 10,
  },
];

export const getUniqueStates = (): string[] => {
  return [...new Set(locationData.map((city) => city.state))];
};

export const getDistrictsByState = (state: string): string[] => {
  return locationData
    .filter((city) => city.state === state)
    .map((city) => city.district);
};

export const getCityData = (state: string, district: string): CityData | undefined => {
  return locationData.find(
    (city) => city.state === state && city.district === district
  );
};


export const girderGrades = ["E250", "E350", "E450"];
export const crossBracingGrades = ["E250", "E350", "E450"];
export const deckConcreteGrades = ["M25", "M30", "M35", "M40", "M45", "M50", "M55", "M60"];
export const structureTypes = ["Highway", "Other"];
export const footpathOptions = ["None", "Single-sided", "Both"];
