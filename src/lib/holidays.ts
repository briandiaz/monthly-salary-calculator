import axios from "axios";

export interface Holiday {
  date: string; // Date in ISO format (e.g., "2025-01-01")
  localName: string; // Local name of the holiday (e.g., "Día de Año Nuevo")
  name: string; // English name of the holiday (e.g., "New Year's Day")
  countryCode: string; // Country code (e.g., "DO")
  fixed: boolean; // Indicates if the holiday is fixed (always on the same date)
  global: boolean; // Indicates if the holiday is global
  counties: string[] | null; // List of counties where the holiday applies or null
  launchYear: number | null; // Year when the holiday was first launched or null
  types: string[]; // List of types associated with the holiday (e.g., ["Public"])
}

export const fetchHolidays = async (countryCode: string, year: number): Promise<string[]> => {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
  try {
    const response = await axios.get<Holiday[]>(url);
    const holidays = response.data;
    return holidays.map((holiday: { date: string }) => new Date(holiday.date).toDateString());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching holidays:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return [];
  }
};
